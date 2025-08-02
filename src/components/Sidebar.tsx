// components/Sidebar.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { X, User, CreditCard, MapPin, Star } from "lucide-react";
import AICustomModal from "@/components/AICustomModal";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  aiModalOpen: boolean;
  setAiModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentPage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  aiModalOpen,
  setAiModalOpen,
  setCurrentPage,
}) => {
  const router = useRouter();

  return (
    <div
      className={`fixed inset-y-0 left-0 z-[80] w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">지</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Coufit</h1>
              <p className="text-xs text-gray-500">스마트한 지역 소비</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-gray-100 rounded-full"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5 text-gray-400" />
          </Button>
        </div>

        {/* Profile & Balance */}
        <div className="p-6 bg-gradient-to-r from-emerald-50 to-blue-50 border-b border-gray-100">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
              <User className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-lg">김지역님</h3>
              <p className="text-sm text-gray-600">분당구 · 일반회원</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500 font-medium">보유 잔액</p>
            <p className="text-xl font-bold text-gray-900">125,000원</p>
          </div>
        </div>

        {/* AI 맞춤 추천 섹션 */}
        <div className="p-6 border-b border-gray-100">
          <AICustomModal open={aiModalOpen} onOpenChange={setAiModalOpen} />
        </div>

        {/* Main Menu */}
        <div className="flex-1 px-6 py-4 overflow-y-auto">
          {/* 소비 관리 */}
          <div className="mb-6">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
              소비 관리
            </h4>
            <Button
              variant="ghost"
              className="w-full h-12 justify-start rounded-xl hover:bg-gray-50 transition-colors group px-0"
              onClick={() => {
                setSidebarOpen(false);
                router.push("/wallet");
              }}
            >
              <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center mr-3 group-hover:bg-blue-100 transition-colors">
                <CreditCard className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">지갑 관리</p>
                <p className="text-xs text-gray-500">잔액, 소비내역</p>
              </div>
            </Button>
          </div>

          {/* 가맹점 찾기 */}
          <div className="mb-6">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
              가맹점 찾기
            </h4>
            <Button
              variant="ghost"
              className="w-full h-12 justify-start rounded-xl hover:bg-gray-50 transition-colors group px-0"
              onClick={() => {
                setSidebarOpen(false);
                setCurrentPage("store-finder");
              }}
            >
              <div className="w-8 h-8 bg-orange-50 rounded-xl flex items-center justify-center mr-3 group-hover:bg-orange-100 transition-colors">
                <MapPin className="w-4 h-4 text-orange-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">내 주변</p>
                <p className="text-xs text-gray-500">위치 기반 검색</p>
              </div>
            </Button>

            <Button
              variant="ghost"
              className="w-full h-12 justify-start rounded-xl hover:bg-gray-50 transition-colors group px-0"
            >
              <div className="w-8 h-8 bg-yellow-50 rounded-xl flex items-center justify-center mr-3 group-hover:bg-yellow-100 transition-colors">
                <Star className="w-4 h-4 text-yellow-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">인기 가맹점</p>
                <p className="text-xs text-gray-500">많이 찾는 가맹점</p>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
