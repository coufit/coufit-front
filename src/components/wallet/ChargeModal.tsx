// components/wallet/ChargeModal.tsx
"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export interface ChargeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ChargeModal({ open, onOpenChange }: ChargeModalProps) {
  const [chargeAmount, setChargeAmount] = React.useState<string>("");
  const [paymentMethod, setPaymentMethod] =
    React.useState<string>("CREDIT_CARD");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const paymentOptions = React.useMemo(
    () => [
      { id: "CREDIT_CARD", name: "신용카드", icon: <>💳</> },
      { id: "BANK_TRANSFER", name: "계좌이체", icon: <>🏦</> },
      { id: "KAKAO_PAY", name: "카카오페이", icon: <>💛</> },
      { id: "NAVER_PAY", name: "네이버페이", icon: <>💚</> },
    ],
    []
  );

  const handleCharge = async () => {
    if (!chargeAmount || Number(chargeAmount) <= 0) {
      alert("충전할 금액을 입력해 주세요.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/charge`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Number(chargeAmount),
          paymentMethod,
        }),
      });
      const json = await res.json();
      if (!res.ok || json.code !== 200) {
        throw new Error(json.message ?? res.statusText);
      }

      const data = json.data as {
        userId: number;
        amount: number;
        pointBalance: number;
        chargedAt: string;
      };

      alert(
        `충전 완료!\n충전액: ${data.amount.toLocaleString()}원\n` +
          `잔액: ${data.pointBalance.toLocaleString()}원`
      );
      onOpenChange(false);
      // TODO: 필요하면 부모에 잔액 갱신 콜백 호출
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "알 수 없는 오류";
      alert("충전에 실패했습니다: " + msg);
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
          {/* 현재 잔액 (prop 혹은 상위 상태로 대체 가능) */}
          <div className="bg-emerald-50 p-4 rounded-lg text-center">
            <div className="text-sm text-emerald-600 font-medium">
              현재 잔액
            </div>
            <div className="text-2xl font-bold text-emerald-700">125,000원</div>
          </div>

          {/* 충전 금액 선택 */}
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
                    className="h-12 border border-gray-200"
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

          {/* 결제 수단 선택 */}
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

          {/* 액션 버튼 */}
          <div className="flex space-x-3">
            <Button
              variant="ghost"
              className="flex-1 bg-transparent"
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
              {isLoading
                ? "충전 중..."
                : `${
                    chargeAmount
                      ? `${Number(chargeAmount).toLocaleString()}원 `
                      : ""
                  }충전하기`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
