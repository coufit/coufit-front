// components/wallet/BalanceCard.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import ChargeModal from "@/components/wallet/ChargeModal";

interface PointsBalance {
  pointBalance: number;
  expireAmount: number;
  expireInDays: number;
}

const BalanceCard: React.FC = () => {
  const [data, setData] = useState<PointsBalance | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [chargeModalOpen, setChargeModalOpen] = useState(false);

  useEffect(() => {
    async function fetchBalance() {
      setLoading(true);
      setError("");

      try {
        const res = await fetch("http://localhost:8080/api/points/balance", {
          method: "GET",
        });
        console.log("HTTP status:", res.status, res.statusText);
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        const wrapper = (await res.json()) as {
          code: number;
          message: string;
          data: PointsBalance;
        };
        console.log("받아온 포인트 래퍼:", wrapper);

        // ⚠️ 여기만 고친다!
        setData(wrapper.data);
      } catch (e: any) {
        console.error("fetchBalance 에러:", e);
        setError("잔액 정보를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    }

    fetchBalance();
  }, []);

  // 1) 로딩 중
  if (loading) {
    return (
      <Card className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white">
        <CardContent className="p-6 flex items-center justify-between">
          <div className="animate-pulse flex-1 space-y-2">
            <div className="h-6 bg-white/30 rounded w-32" />
            <div className="h-10 bg-white/30 rounded w-48" />
            <div className="h-4 bg-white/30 rounded w-40" />
          </div>
          <Button disabled>
            <CreditCard className="w-4 h-4 mr-2" />
            충전하기
          </Button>
        </CardContent>
      </Card>
    );
  }

  // 2) 에러 혹은 데이터 없음
  if (error || !data) {
    return (
      <Card className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white">
        <CardContent className="p-6 flex items-center justify-between">
          <div className="text-red-100 flex-1">
            {error || "데이터가 없습니다."}
          </div>
          <Button onClick={() => setChargeModalOpen(true)}>
            <CreditCard className="w-4 h-4 mr-2" />
            충전하기
          </Button>
        </CardContent>
      </Card>
    );
  }

  // 3) 정상 데이터 있을 때만
  const { pointBalance, expireAmount, expireInDays } = data;
  const expireDate = new Date(Date.now() + expireInDays * 86400000);

  return (
    <>
      <Card className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white">
        <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between">
          {/* 잔액 정보 */}
          <div className="flex-1 mb-4 md:mb-0">
            <h2 className="text-lg font-bold mb-2">현재 잔액</h2>
            <div className="text-3xl font-bold mb-2">
              {pointBalance.toLocaleString()}원
            </div>
            <div className="text-emerald-100 text-sm">
              만료 예정 포인트: {expireAmount.toLocaleString()}점
              <br />
              만료일: {expireDate.toLocaleDateString("ko-KR")}
            </div>
          </div>

          {/* 충전 버튼 */}
          <Button
            className=" hover:bg-emerald-50 hover:text-white"
            onClick={() => setChargeModalOpen(true)}
          >
            <CreditCard className="w-4 h-4 mr-2" />
            충전하기
          </Button>
        </CardContent>
      </Card>

      {/* 포인트 충전 모달 */}
      <ChargeModal open={chargeModalOpen} onOpenChange={setChargeModalOpen} />
    </>
  );
};

export default BalanceCard;
