"use client";

import { Store } from "@/lib/types/store";
import { Badge } from "../ui/badge";

import {
  Map,
  MapMarker,
  useKakaoLoader,
  CustomOverlayMap,
} from "react-kakao-maps-sdk";

import { useState, useEffect } from "react";

interface StoreMapProps {
  stores: Store[];
  currentLocation?: { latitude: number; longitude: number };
  onOpenDetail: (storeId: number) => void;
}

const categoryIcons: { [key: string]: string } = {
  음식점: "🍽️",
  교육: "📚",
  마트: "🛒",
  미용: "💄",
  생활: "🏠",
  스포츠: "🏃‍♀️",
  의료: "🏥",
  제조: "🏭",
  숙박: "🏘️",
  잡화: "🛍️",
};

export default function KakaoMap({
  stores,
  currentLocation,
  onOpenDetail,
}: StoreMapProps) {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_MAPS_APP_KEY!,
    libraries: ["services", "clusterer", "drawing"],
  });

  const [hoveredStoreId, setHoveredStoreId] = useState<number | null>(null);

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

  return (
    <div className="h-[calc(100vh-64px)] relative">
      <Map center={center} className="w-full h-full" level={4}>
        {stores.map((store) => {
          const iconEmoji = categoryIcons[store.categoryName];

          return (
            <CustomOverlayMap
              key={store.storeId}
              position={{ lat: store.latitude, lng: store.longitude }}
              yAnchor={1}
            >
              <div
                className="relative"
                onMouseOver={() => setHoveredStoreId(store.storeId)}
                onMouseOut={() => setHoveredStoreId(null)}
              >
                <div
                  onClick={() => onOpenDetail(store.storeId)}
                  className="w-8 h-8 bg-emerald-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                >
                  <span className="text-medium">{iconEmoji}</span>
                </div>

                {hoveredStoreId === store.storeId && (
                  <div
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 p-2 space-y-1 bg-white rounded-md shadow-md border border-gray-200"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    <div className="flex flex-row gap-2 items-center">
                      <Badge variant="secondary">{store.categoryName}</Badge>
                      <h4 className="font-semibold text-gray-900">
                        {store.name}
                      </h4>
                      <div
                        className={`w-2 h-2 rounded-full ${
                          store.isOpenNow ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </CustomOverlayMap>
          );
        })}

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
