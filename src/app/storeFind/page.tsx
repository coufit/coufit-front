"use client";

import { useState } from "react";
import { List, ArrowLeft, Search } from "lucide-react";
import KakaoMap from "@/components/storeFind/KakaoMap";
import StoreList from "@/components/storeFind/StoreList";
import StoreFindSideBar from "@/components/storeFind/StoreFindSideBar";
import StoreDetailModal from "@/components/storeFind/StoreDetailModal";

interface Store {
  storeId: number;
  name: string;
  latitude: number;
  longitude: number;
  category: string;
  isOpen: boolean;
  address: string;
  distance: string;
  hours: string;
  phone: string;
}

export default function StoreFind() {
  const dummyStores: Store[] = [
    {
      storeId: 1,
      name: "멋진 카페",
      latitude: 37.5665,
      longitude: 126.978,
      category: "카페",
      isOpen: true,
      address: "어쩌구 저쩌구",
      distance: "100m",
      hours: "09:00-22:00",
      phone: "031-1234-5678",
    },
    {
      storeId: 2,
      name: "맛있는 식당",
      latitude: 37.568,
      longitude: 126.98,
      category: "한식",
      isOpen: false,
      address: "어쩌구 저쩌구",
      distance: "100m",
      hours: "09:00-22:00",
      phone: "031-1234-5678",
    },
  ];

  const userCurrentLocation = {
    latitude: 37.4444053361,
    longitude: 126.7992573088,
  };

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isStoreListOverlayOpen, setIsStoreListOverlayOpen] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);

  const toggleSidebar = () => {
    setIsSideBarOpen((prev) => !prev);
  };

  const toggleStoreListOverlay = () => {
    setIsStoreListOverlayOpen((prev) => !prev);
  };

  const handleModalOpen = (storeId: number) => {
    console.log("선택된 storeId:", storeId);
    setSelectedStoreId(storeId);
  };

  const handleModalClose = () => {
    setSelectedStoreId(null);
  };

  const selectedStore =
    dummyStores.find((store) => store.storeId === selectedStoreId) || null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-16">
              <button className="flex flex-row items-center justify-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                뒤로
              </button>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">지</span>
                </div>
                <span className="text-xl font-bold text-gray-900">
                  가맹점 찾기
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleSidebar}
                className="flex flex-row px-3 py-2 gap-2 border-solid border border-gray-300 text-black rounded-[6.25px] items-center justify-center"
              >
                <Search className="w-4 h-4 mr-1" />
                필터
              </button>
              <button
                onClick={toggleStoreListOverlay}
                className={`flex flex-row px-3 py-2 gap-2 bg-black text-gray-300 rounded-[6.25px] items-center justify-center`}
              >
                <List color="white" className="w-4 h-4 mr-1" />
                목록
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden relative">
        <StoreFindSideBar isOpen={isSideBarOpen} onClose={toggleSidebar} />
        <div className={`flex-1 transition-all duration-300 ease-in-out`}>
          <KakaoMap
            initialStores={dummyStores}
            currentLocation={userCurrentLocation}
          />
        </div>
      </div>
      {isStoreListOverlayOpen && (
        <StoreList
          stores={dummyStores}
          onOpenDetail={handleModalOpen}
          isOpen={isStoreListOverlayOpen}
          onClose={toggleStoreListOverlay}
        />
      )}
      <StoreDetailModal
        isOpen={!!selectedStore}
        onClose={handleModalClose}
        store={selectedStore}
      />
    </div>
  );
}
