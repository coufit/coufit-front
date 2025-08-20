// components/wallet/BalanceCard.tsx
"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import ChargeModal from "@/components/wallet/ChargeModal";

const BalanceCard: React.FC = () => {
  const [chargeModalOpen, setChargeModalOpen] = useState(false);

  return (
    <>
      <Card className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white">
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold mb-2">현재 잔액</h2>
            <div className="text-3xl font-bold mb-2">125,000원</div>
            <div className="text-emerald-100 text-sm">
              마지막 충전: 2024.01.15
            </div>
          </div>
          <Button
            className="bg-white text-green-600 hover:bg-emerald-50 hover:text-white"
            onClick={() => setChargeModalOpen(true)}
          >
            <CreditCard className="w-4 h-4 mr-2" />
            충전하기
          </Button>
        </CardContent>
      </Card>

      {/* 충전 모달 */}
      <ChargeModal open={chargeModalOpen} onOpenChange={setChargeModalOpen} />
    </>
  );
};

export default BalanceCard;
