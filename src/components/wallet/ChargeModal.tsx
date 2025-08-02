// components/wallet/ChargeModal.tsx
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

interface BalanceResponse {
  code: number;
  message: string;
  data: {
    pointBalance: number;
    expireAmount: number;
    expireInDays: number;
  };
}

interface ChargeResponse {
  code: number;
  message: string;
  data: {
    userId: string;
    amount: number;
    pointBalance: number;
    chargedAt: string;
  };
}

export interface ChargeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ChargeModal({ open, onOpenChange }: ChargeModalProps) {
  //   const router = useRouter();

  const [balance, setBalance] = React.useState<number>(0);
  const [loadingBalance, setLoadingBalance] = React.useState<boolean>(true);

  const [chargeAmount, setChargeAmount] = React.useState<string>("");
  const [paymentMethod, setPaymentMethod] =
    React.useState<string>("CREDIT_CARD");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const paymentOptions = React.useMemo(
    () => [
      { id: "CREDIT_CARD", name: "신용카드", icon: <>💳</> },
      { id: "BANK_TRANSFER", name: "계좌이체", icon: <>🏦</> },
      { id: "PAYPAL", name: "PayPal", icon: <>🌐</> },
    ],
    []
  );

  // 모달 열릴 때마다 잔액 조회
  React.useEffect(() => {
    if (!open) return;
    setLoadingBalance(true);
    const token = localStorage.getItem("authToken");
    fetch(`${API_BASE}/api/points/balance`, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    })
      .then((res) => res.json())
      .then((json: BalanceResponse) => {
        if (json.code === 200) setBalance(json.data.pointBalance);
      })
      .catch(console.error)
      .finally(() => setLoadingBalance(false));
  }, [open]);

  const handleCharge = async () => {
    const amountNum = Number(chargeAmount);
    if (!amountNum || amountNum <= 0) {
      alert("충전할 금액을 입력해 주세요.");
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(`${API_BASE}/api/points/charge`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ amount: amountNum, paymentMethod }),
      });
      const json: ChargeResponse = await res.json();
      if (!res.ok || json.code !== 200) {
        throw new Error(json.message || res.statusText);
      }

      alert(
        `충전 완료!\n` +
          `충전액: ${json.data.amount.toLocaleString()}원\n` +
          `잔액: ${json.data.pointBalance.toLocaleString()}원`
      );
      window.location.href = "/wallet";
    } catch (err: any) {
      console.error(err);
      alert("충전에 실패했습니다: " + (err.message || "알 수 없는 오류"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            민생쿠폰 충전하기
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 mt-4">
          {/* 현재 잔액 */}
          <div className="bg-emerald-50 p-4 rounded-lg text-center">
            <div className="text-sm text-emerald-600 font-medium">
              {loadingBalance ? "불러오는 중…" : "현재 잔액"}
            </div>
            <div className="text-2xl font-bold text-emerald-700">
              {loadingBalance ? "--원" : `${balance.toLocaleString()}원`}
            </div>
          </div>
          {/* 이하 동일 */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">
              충전 금액
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[10000, 30000, 50000, 100000, 200000, 500000].map((amt) => {
                const str = amt.toString();
                return (
                  <Button
                    key={str}
                    variant={chargeAmount === str ? "default" : "ghost"}
                    className="h-12 border"
                    onClick={() => setChargeAmount(str)}
                  >
                    {amt.toLocaleString()}원
                  </Button>
                );
              })}
            </div>
            <Input
              placeholder="직접 입력"
              type="number"
              value={chargeAmount}
              onChange={(e) => setChargeAmount(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">
              결제 수단
            </label>
            <div className="space-y-2">
              {paymentOptions.map((opt) => (
                <Button
                  key={opt.id}
                  variant={paymentMethod === opt.id ? "default" : "ghost"}
                  className="w-full justify-start h-12"
                  onClick={() => setPaymentMethod(opt.id)}
                >
                  <span className="mr-3">{opt.icon}</span>
                  {opt.name}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex space-x-3">
            <Button
              variant="ghost"
              className="flex-1"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              취소
            </Button>
            <Button
              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              onClick={handleCharge}
              disabled={isLoading}
            >
              {isLoading ? "충전 중…" : "충전하기"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
