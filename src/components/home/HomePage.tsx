// components/HomePage.tsx
"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Zap, Search, ArrowRight, Brain } from "lucide-react";
import PopularStores from "@/components/home/PopularStores";

export interface HomePageProps {
  setCurrentPage: (page: string) => void;
  aiModalOpen: boolean;
  setAiModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const HomePage: React.FC<HomePageProps> = ({
  setCurrentPage,
  aiModalOpen,
  setAiModalOpen,
}) => (
  <section className="py-20 px-4">
    <div className="container mx-auto max-w-[1280px] text-center">
      <Badge className="mb-6 bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
        <Zap className="w-4 h-4 mr-1" />
        스마트한 지역 소비 플랫폼
      </Badge>
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
        지역화폐로 더 똑똑하게
        <br />
        <span className="text-emerald-600">소비하세요</span>
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        AI 기반 개인 맞춤 추천으로 내 주변 최적의 가맹점을 찾고, 지역 경제
        활성화에 기여하며 혜택까지 받아보세요.
      </p>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="지역, 업종, 가게명으로 검색해보세요"
            className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 focus:border-emerald-500 rounded-xl"
          />
          <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-emerald-600 hover:bg-emerald-700 rounded-lg">
            검색
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        <Button
          size="lg"
          className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-4"
          onClick={() => setCurrentPage("store-finder")}
        >
          가맹점 찾기 <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
        <Dialog open={aiModalOpen} onOpenChange={setAiModalOpen}>
          <DialogTrigger asChild>
            <Button
              size="lg"
              variant="default"
              className="text-lg px-8 py-4 border-2 bg-gradient-to-r from-purple-300 to-blue-300 border-purple-300 hover:from-purple-200 hover:to-blue-200"
            >
              <Brain className="w-5 h-5 mr-2" />
              AI 맞춤 추천 받기
            </Button>
          </DialogTrigger>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
        <div className="text-center">
          <div className="text-3xl font-bold text-emerald-600 mb-2">
            12,000+
          </div>
          <div className="text-gray-600">등록 가맹점</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-emerald-600 mb-2">50만+</div>
          <div className="text-gray-600">누적 사용자</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-emerald-600 mb-2">
            198,000+
          </div>
          <div className="text-gray-600">누적 소비 건수</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-emerald-600 mb-2">24시간</div>
          <div className="text-gray-600">실시간 업데이트</div>
        </div>
      </div>
    </div>

    <PopularStores />
  </section>
);

export default HomePage;
