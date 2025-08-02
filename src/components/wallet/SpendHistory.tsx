// components/wallet/SpendHistory.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Spend {
  storeName: string;
  category: string;
  paidAt: string; // ISO 날짜 문자열
  amount: number; // 숫자
  imageUrl: string | null;
}

export default function SpendHistory() {
  const [list, setList] = useState<Spend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchHistory() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          "http://localhost:8080/api/points/spend/history"
        );
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const wrapper = (await res.json()) as {
          code: number;
          message: string;
          data: Spend[];
        };
        setList(wrapper.data);
      } catch (e: any) {
        console.error(e);
        setError("소비 내역을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  if (loading) {
    return <div className="text-center py-10">로딩 중…</div>;
  }
  if (error) {
    return <div className="text-center text-red-600 py-10">{error}</div>;
  }
  if (list.length === 0) {
    return <div className="text-center py-10">조회된 내역이 없습니다.</div>;
  }

  return (
    <div className="space-y-4">
      {list.map((item, idx) => {
        const dt = new Date(item.paidAt);
        const date = dt.toLocaleDateString("ko-KR");
        const time = dt.toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
        });
        return (
          <Card key={idx} className="hover:shadow-lg transition-shadow">
            <CardContent className="flex items-center space-x-4 p-4">
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.storeName}
                  className="w-12 h-12 rounded object-cover"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-gray-500 text-sm">No Img</span>
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-semibold">{item.storeName}</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Badge variant="secondary">{item.category}</Badge>
                  <span>{date}</span>
                  <span>{time}</span>
                </div>
              </div>
              <div className="text-right text-lg font-bold text-red-600">
                -{item.amount.toLocaleString()}원
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
