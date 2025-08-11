"use client";

import { Store as StoreIcon } from "lucide-react";
import { Store } from "@/lib/types/store";

import {
  Map,
  MapMarker,
  useKakaoLoader,
  MapInfoWindow,
} from "react-kakao-maps-sdk";

import { useState, useEffect } from "react";

interface StoreMapProps {
  initialStores: Store[];
  currentLocation?: { latitude: number; longitude: number };
}

export default function KakaoMap({
  initialStores,
  currentLocation,
}: StoreMapProps) {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_MAPS_APP_KEY!,
    libraries: ["services", "clusterer", "drawing"],
  });

  const [stores, setStores] = useState<Store[]>(initialStores);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [hoveredStoreId, setHoverStoreId] = useState<number | null>(null);
  //const [isInfoOpen, setIsInfoOpen] = useState(false);

  // 중심 좌표를 동적으로 관리
  const [center, setCenter] = useState({
    lat: currentLocation?.latitude || 37.512453,
    lng: currentLocation?.longitude || 127.01890122222221,
  });

  // initialStores 업데이트 시 stores 상태 갱신
  useEffect(() => {
    console.log("initialStores:", initialStores);
    setStores(initialStores);
  }, [initialStores]);

  // currentLocation 변경 시 중심 좌표 갱신
  useEffect(() => {
    if (currentLocation) {
      setCenter({
        lat: currentLocation.latitude,
        lng: currentLocation.longitude,
      });
    }
  }, [currentLocation]);
  if (loading) return <div>지도 로드 중...</div>;
  if (error) return <div>지도 로드 오류: {error.message}</div>;

  const handleMarkerClick = (store: Store) => {
    setSelectedStore(store);
    console.log("마커 클릭: ", store);
    //setIsInfoOpen(true);
  };

  return (
    <div className="h-[calc(100vh-64px)] relative">
      <Map center={center} className="w-full h-full" level={4}>
        {stores.map((store) => (
          <MapMarker
            key={store.storeId}
            position={{ lat: store.latitude, lng: store.longitude }}
            clickable={true}
            onClick={() => handleMarkerClick(store)}
            onMouseOver={() => setHoverStoreId(store.storeId)}
            onMouseOut={() => setHoverStoreId(null)}
          >
            <div className="w-8 h-8 bg-emerald-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
              <StoreIcon className="w-4 h-4 text-white" />
            </div>

            {hoveredStoreId === store.storeId && (
              <MapInfoWindow
                position={{ lat: store.latitude, lng: store.longitude }}
                disableAutoPan={true}
                removable={false}
              >
                <div>
                  <div>{store.name}</div>
                  <div>{store.categoryName}</div>
                </div>
              </MapInfoWindow>
            )}
          </MapMarker>
        ))}

        {currentLocation && (
          <MapMarker
            position={{
              lat: currentLocation.latitude,
              lng: currentLocation.longitude,
            }}
            clickable={false}
          >
            <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
          </MapMarker>
        )}
      </Map>
    </div>
  );
}
