"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export interface Transaction {
  date: string;
  time: string;
  store: string;
  category: string;
  amount: string;
  balance: string;
  discount: string;
}

const TransactionItem: React.FC<{ tx: Transaction }> = ({ tx }) => (
  <Card>
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <ArrowRight className="w-6 h-6 text-red-600 rotate-45" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{tx.store}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Badge variant="secondary">{tx.category}</Badge>
              <span>
                {tx.date} {tx.time}
              </span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-semibold text-red-600">{tx.amount}</div>
          <div className="text-sm text-gray-600">잔액: {tx.balance}</div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default TransactionItem;
