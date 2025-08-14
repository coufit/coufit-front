"use client";

import { Store as StoreIcon } from "lucide-react";
import { Store } from "@/lib/types/store";

import {
  Map,
  MapMarker,
  useKakaoLoader,
  MapInfoWindow,
  CustomOverlayMap,
} from "react-kakao-maps-sdk";

import { useState, useEffect } from "react";

interface StoreMapProps {
  stores: Store[];
  currentLocation?: { latitude: number; longitude: number };
}

export default function KakaoMap({ stores, currentLocation }: StoreMapProps) {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_MAPS_APP_KEY!,
    libraries: ["services", "clusterer", "drawing"],
  });

  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [hoveredStoreId, setHoverStoreId] = useState<number | null>(null);
  //const [isInfoOpen, setIsInfoOpen] = useState(false);

  // 중심 좌표를 동적으로 관리
  const [center, setCenter] = useState({
    lat: currentLocation?.latitude || 37.512453,
    lng: currentLocation?.longitude || 127.01890122222221,
  });

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
          <CustomOverlayMap
            key={store.storeId}
            position={{ lat: store.latitude, lng: store.longitude }}
            yAnchor={1}
          >
            <div
              onClick={() => handleMarkerClick(store)}
              className="w-8 h-8 bg-emerald-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
            >
              <StoreIcon className="w-4 h-4 text-white" />
            </div>

            {hoveredStoreId === store.storeId && (
              <MapInfoWindow
                position={{
                  lat: store.latitude,
                  lng: store.longitude,
                }}
                disableAutoPan={true}
                removable={false}
              >
                <div>
                  <div>{store.name}</div>
                  <div>{store.categoryName}</div>
                </div>
              </MapInfoWindow>
            )}
          </CustomOverlayMap>
        ))}

        {currentLocation && (
          <MapMarker
            position={{
              lat: currentLocation.latitude,
              lng: currentLocation.longitude,
            }}
            clickable={false}
          ></MapMarker>
        )}
      </Map>
    </div>
  );
}
