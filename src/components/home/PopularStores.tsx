"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StoreItem {
  storeName: string;
  category: string;
  distance: number; // API에서 숫자로 받음 (미터)
  discount: string;
  imageUrl: string;
}

// 거리(m) → m 또는 km 단위로 포맷팅하는 헬퍼
function formatDistance(distance: number): string {
  if (distance >= 1000) {
    const km = distance / 1000;
    const rounded = Math.round(km * 10) / 10;
    return `${rounded.toLocaleString()}km`;
  }
  return `${distance.toLocaleString()}m`;
}

const PopularStores: React.FC = () => {
  // ① 빈 배열로 초기화해야 map 호출 시 에러가 나지 않습니다.
  const [stores, setStores] = useState<StoreItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchStores() {
      setLoading(true);
      setError("");

      // ② 하드코딩된 위도·경도
      const lat = 37.1234;
      const lon = 127.5678;

      // ③ 토큰이 필요하면 꺼내서 헤더에 추가
      const token = localStorage.getItem("authToken");
      const email = localStorage.getItem("userEmail");

      try {
        const res = await fetch(
          `http://localhost:8080/api/home/popular-stores?lat=${lat}&lon=${lon}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
              ...(email ? { Authorization: `Bearer ${email}` } : {}),
            },
          }
        );

        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        const json = await res.json();
        // API 스펙이 { message, data: StoreItem[] } 일 때:
        setStores(Array.isArray(json.data) ? json.data : []);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    }

    fetchStores();
  }, []);

  if (loading) {
    return (
      <section className="py-20">
        <div className="text-center">로딩 중...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20">
        <div className="text-center text-red-600">{error}</div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="container mx-auto max-w-[1280px] px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">인기 가맹점</h2>
          <p className="text-xl text-gray-600">
            지금 가장 많이 찾는 가맹점들을 확인해보세요
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stores.map((store, idx) => (
            <Card
              key={idx}
              className="hover:shadow-lg transition-shadow cursor-pointer"
            >
              <CardContent className="p-4">
                {/* 이미지 */}
                <div className="w-full h-32 overflow-hidden rounded-lg mb-4">
                  <img
                    src={store.imageUrl}
                    alt={store.storeName}
                    className="object-cover w-full h-full"
                  />
                </div>

                <h3 className="font-bold text-lg mb-2">{store.storeName}</h3>

                {/* 카테고리 + 할인 */}
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{store.category}</Badge>
                  <Badge className="bg-emerald-100 text-emerald-800">
                    {store.discount}
                  </Badge>
                </div>

                {/* 거리: m 또는 km */}
                <div className="text-sm text-gray-600">
                  거리: {formatDistance(store.distance)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularStores;
