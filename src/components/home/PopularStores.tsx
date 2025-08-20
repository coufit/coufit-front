"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Store } from "lucide-react";

interface StoreItem {
  name: string;
  category: string;
  rating: number;
  distance: string;
  discount: string;
}

const stores: StoreItem[] = [
  {
    name: "맛있는 김밥천국",
    category: "한식",
    rating: 4.8,
    distance: "120m",
    discount: "10%",
  },
  {
    name: "프레시 마트",
    category: "마트",
    rating: 4.6,
    distance: "250m",
    discount: "5%",
  },
  {
    name: "카페 로스팅",
    category: "카페",
    rating: 4.9,
    distance: "180m",
    discount: "15%",
  },
  {
    name: "헤어샵 스타일",
    category: "미용",
    rating: 4.7,
    distance: "300m",
    discount: "20%",
  },
];

export const PopularStores: React.FC = () => {
  return (
    <section className="py-20 ">
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
                <div className="w-full h-32 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-lg mb-4 flex items-center justify-center">
                  <Store className="w-12 h-12 text-emerald-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">{store.name}</h3>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{store.category}</Badge>
                  {/* <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">
                      {store.rating}
                    </span>
                  </div> */}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{store.distance}</span>
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
