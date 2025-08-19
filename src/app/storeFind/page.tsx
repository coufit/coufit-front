"use client";

import { useState, useEffect } from "react";
import { List, ArrowLeft, Search } from "lucide-react";
import KakaoMap from "@/components/storeFind/KakaoMap";
import StoreList from "@/components/storeFind/StoreList";
import StoreFindSideBar from "@/components/storeFind/StoreFindSideBar";
import { Store } from "@/lib/types/store";
import StoreDetailModal from "@/components/storeFind/StoreDetailModal";
import { useRouter, useSearchParams } from "next/navigation";

export default function StoreFind() {
  const router = useRouter();
  const searchParamsFromUrl = useSearchParams();

  // 사용자 현재 위치 (가정)
  const userCurrentLocation = {
    latitude: 37.5007861,
    longitude: 127.0368861,
  };

  const [stores, setStores] = useState<Store[]>([]);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isStoreListOverlayOpen, setIsStoreListOverlayOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const initialSearchParams = {
    keyword: "",
    region: "",
    area: "",
    category: "",
    isOpenNow: false,
    sort: "popularity",
  };
  // 검색 파라미터 상태
  const [searchParams, setSearchParams] = useState(initialSearchParams);

  useEffect(() => {
    const keywordFromUrl = searchParamsFromUrl.get("keyword");
    if (keywordFromUrl) {
      setSearchParams((prev) => ({ ...prev, keyword: keywordFromUrl }));
    }

    // API 호출 함수
    const fetchStores = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.warn("API 호출 실패: 인증 토큰이 없습니다.");
        setStores([]);
        return;
      }

      try {
        const params = new URLSearchParams();
        if (searchParams.keyword) {
          params.append("keyword", searchParams.keyword);
        }
        if (searchParams.region) {
          params.append("region", searchParams.region);
        }
        if (searchParams.area) {
          params.append("area", searchParams.area);
        }
        if (searchParams.category) {
          params.append("category", searchParams.category);
        }
        if (searchParams.isOpenNow) {
          params.append("isOpenNow", "true");
        }
        if (searchParams.sort) {
          params.append("sort", searchParams.sort);
        }
        params.append("latitude", userCurrentLocation.latitude.toString());
        params.append("longitude", userCurrentLocation.longitude.toString());

        const api = `${
          process.env.NEXT_PUBLIC_API_BASE_URL
        }/api/stores/search?${params.toString()}`;

        const res = await fetch(api, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 403) {
          console.error("api 호출 오류: 유효하지 않은 토큰");
          return;
        }

        if (!res.ok) {
          throw new Error("네트워크 에러");
        }
        const data = await res.json();

        if (data.code === 200) {
          setStores(data.data.storeList);
        } else {
          console.error("API 응답 오류:", data.message);
          setStores([]);
        }
      } catch (error) {
        console.error("API 호출 오류:", error);
      }
    };

    fetchStores();
  }, [searchParams, userCurrentLocation, searchParamsFromUrl, router]);

  const toggleSidebar = () => {
    setIsSideBarOpen((prev) => !prev);
  };

  const toggleStoreListOverlay = () => {
    setIsStoreListOverlayOpen((prev) => !prev);
  };

  const handleResetFilters = () => {
    setSearchParams(initialSearchParams);
  };

  const handleOpenDetail = (storeId: number) => {
    console.log(`가맹점 상세 열기: ID ${storeId}`);
    const store = stores.find((s) => s.storeId === storeId);
    if (store) {
      setSelectedStore(store);
      setIsDetailModalOpen(true);
    }
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedStore(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-16">
              <button
                onClick={() => router.push("/")}
                className="flex flex-row items-center justify-center gap-2 text-black"
              >
                <ArrowLeft className="w-4 h-4" />
                뒤로
              </button>
              <div className="flex items-center space-x-4">
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
        <StoreFindSideBar
          isOpen={isSideBarOpen}
          onClose={toggleSidebar}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          onReset={handleResetFilters}
        />
        <div className={`flex-1 transition-all duration-300 ease-in-out`}>
          <KakaoMap
            stores={stores}
            currentLocation={userCurrentLocation}
            onOpenDetail={handleOpenDetail}
          />
        </div>
      </div>
      {isStoreListOverlayOpen && (
        <StoreList
          isOpen={isStoreListOverlayOpen}
          onClose={toggleStoreListOverlay}
          onOpenDetail={handleOpenDetail}
          stores={stores}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      )}
      <StoreDetailModal
        store={selectedStore}
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
      />
    </div>
  );
}
