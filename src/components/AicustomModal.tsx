// components/AICustomModal.tsx
"use client";

import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Brain, Sparkles, TrendingUp, Target } from "lucide-react";

interface AICustomModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AICustomModal({
  open,
  onOpenChange,
}: AICustomModalProps) {
  // 예시 데이터
  const patternData = [
    { label: "음식점", value: 45, color: "blue" as const },
    { label: "카페", value: 25, color: "purple" as const },
    { label: "마트", value: 20, color: "emerald" as const },
    { label: "기타", value: 10, color: "gray" as const },
  ];

  const todayRecommendations = [
    {
      name: "맛있는 김밥천국",
      category: "한식",
      reason: "평소 한식을 자주 이용하시고, 점심시간대 방문이 많아요",
      discount: "15%",
      distance: "120m",
      rating: 4.8,
      match: 95,
    },
    {
      name: "카페 로스팅",
      category: "카페",
      reason: "오후 3시경 카페 방문 패턴이 있고, 원두커피를 선호하세요",
      discount: "10%",
      distance: "180m",
      rating: 4.9,
      match: 88,
    },
    {
      name: "프레시 마트",
      category: "마트",
      reason: "주말 장보기 패턴과 신선식품 구매 이력이 있어요",
      discount: "5%",
      distance: "250m",
      rating: 4.6,
      match: 82,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="w-full h-14 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
              <Brain className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="font-semibold">AI 맞춤 추천</p>
              <p className="text-xs opacity-90">개인화된 가맹점 찾기</p>
            </div>
            <Sparkles className="w-5 h-5 ml-auto" />
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl mb-4">
            <Brain className="w-6 h-6 mr-2 text-purple-600" />
            AI 맞춤 추천
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* 소비 패턴 분석 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                소비 패턴 분석
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {patternData.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-2">
                    <span>{item.label}</span>
                    <span>{item.value}%</span>
                  </div>
                  <Progress value={item.value} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* 오늘의 맞춤 추천 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Target className="w-5 h-5 mr-2 text-emerald-600" />
                오늘의 맞춤 추천
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {todayRecommendations.map((store, idx) => (
                <div
                  key={idx}
                  className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {store.name}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Badge variant="secondary">{store.category}</Badge>
                        <span>{store.distance}</span>
                        {/* <div className="flex items-center">
                          <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                          {store.rating}
                        </div> */}
                      </div>
                    </div>
                    <div className="text-right">
                      {/* <div className="text-emerald-600 font-semibold">
                        {store.discount} 할인
                      </div> */}
                      {/* <div className="text-xs text-purple-600 font-medium">
                        {store.match}% 매칭
                      </div> */}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{store.reason}</p>
                  <Button
                    size="sm"
                    className="w-full flex items-center justify-center bg-black"
                  >
                    자세히 보기
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* 이번 주 예상 혜택 */}
          {/* <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Gift className="w-5 h-5 mr-2 text-orange-600" />
                이번 주 예상 혜택
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600">
                    12,500원
                  </div>
                  <div className="text-sm text-gray-600">예상 절약 금액</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">8개</div>
                  <div className="text-sm text-gray-600">추천 가맹점</div>
                </div>
              </div>
            </CardContent>
          </Card> */}

          {/* 버튼 그룹 */}
          <div className="flex space-x-3">
            <Button
              className="flex-1 justify-center bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
              onClick={() => onOpenChange(false)}
            >
              추천 가맹점 보러가기
            </Button>
            <Button variant="ghost" onClick={() => onOpenChange(false)}>
              닫기
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
