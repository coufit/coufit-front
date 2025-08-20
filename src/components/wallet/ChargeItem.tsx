"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export interface Charge {
  date: string;
  time: string;
  method: string;
  amount: string;
  balance: string;
  status: string;
}

const ChargeItem: React.FC<{ c: Charge }> = ({ c }) => (
  <Card>
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
            <ArrowRight className="w-6 h-6 text-emerald-600 -rotate-45" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">지역화폐 충전</h3>
            <div className="text-sm text-gray-600">
              {c.method} • {c.date} {c.time}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-semibold text-emerald-600">{c.amount}</div>
          <div className="text-sm text-gray-600">잔액: {c.balance}</div>
          <Badge variant="secondary">{c.status}</Badge>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default ChargeItem;
