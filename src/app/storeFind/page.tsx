"use client";

import { useState, useEffect } from "react";
import { List, ArrowLeft, Search } from "lucide-react";
import KakaoMap from "@/components/storeFind/KakaoMap";
import StoreList from "@/components/storeFind/StoreList";
import StoreFindSideBar from "@/components/storeFind/StoreFindSideBar";
import { Store } from "@/lib/types/store";
import StoreDetailModal from "@/components/storeFind/StoreDetailModal";
import { useRouter } from "next/navigation";

export default function StoreFind() {
  const router = useRouter();

  const userCurrentLocation = {
    latitude: 37.5007861,
    longitude: 127.0368861,
  };

  const [stores, setStores] = useState<Store[]>([]);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isStoreListOverlayOpen, setIsStoreListOverlayOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSideBarOpen((prev) => !prev);
  };

  const toggleStoreListOverlay = () => {
    setIsStoreListOverlayOpen((prev) => !prev);
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

  useEffect(() => {
    async function fetchNearbyStores() {
      try {
        const api = `http://localhost:8080/api/stores/nearby?latitude=${userCurrentLocation.latitude}&longitude=${userCurrentLocation.longitude}&radius=3000`;
        console.log("api url : ", api);
        const token = localStorage.getItem("authToken");
        const response = await fetch(api, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log("api 응답 : ", data);

        if (data.code === 200) {
          const mappedStores: Store[] = data.data.map((item: Store) => ({
            storeId: item.storeId,
            name: item.name,
            latitude: item.latitude,
            longitude: item.longitude,
            categoryName: item.categoryName,
            isOpenNow: item.isOpenNow,
            address: item.address,
            distance: item.distance, // API에서 제공하는 거리 (미터)
            openTime: item.openTime,
            closeTime: item.closeTime,
            phoneNumber: item.phoneNumber,
            imageUrl: item.imageUrl,
          }));
          console.log("매핑된 가맹점:", mappedStores);
          setStores(mappedStores);
        } else {
          console.error("API 응답 오류:", data.message);
          setStores([]);
        }
      } catch (error) {
        console.error("API 호출 오류:", error);
        // 더미 데이터 fallback
        const dummyStores: Store[] = [
          {
            storeId: 1,
            name: "멋진 카페",
            latitude: 37.512453,
            longitude: 127.01890122222221,
            categoryName: "카페",
            isOpenNow: true,
            address: "서울특별시 강남구 테헤란로 123",
            distance: 0,
            openTime: "09:00:00",
            closeTime: "21:00:00",
            phoneNumber: "02-1234-5678",
            imageUrl: null,
          },
        ];
        setStores(dummyStores);
      }
    }

    fetchNearbyStores();
  }, []);

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
        <StoreFindSideBar isOpen={isSideBarOpen} onClose={toggleSidebar} />
        <div className={`flex-1 transition-all duration-300 ease-in-out`}>
          <KakaoMap
            initialStores={stores}
            currentLocation={userCurrentLocation}
          />
        </div>
      </div>
      {isStoreListOverlayOpen && (
        <StoreList
          isOpen={isStoreListOverlayOpen}
          onClose={toggleStoreListOverlay}
          onOpenDetail={handleOpenDetail}
          stores={stores}
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
