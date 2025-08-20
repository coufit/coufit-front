"use client";

import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { Clock, MapPin, Phone, Navigation, Share } from "lucide-react";
import { Store } from "@/lib/types/store";

interface StoreDetailModalProps {
  store: Store | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function StoreDetailModal({
  store,
  isOpen,
  onClose,
}: StoreDetailModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen || !store) return null;

  const userCurrentLocation = {
    latitude: 37.5007861,
    longitude: 127.0368861,
  };

  const handleFindRoute = () => {
    if (!store) return;

    const userLat = userCurrentLocation.latitude;
    const userLng = userCurrentLocation.longitude;
    const userLocationName = "출발지";

    const encodedUserLocationName = encodeURIComponent(userLocationName);
    const encodedStoreName = encodeURIComponent(store.name);

    const url = `https://map.kakao.com/link/to/${encodedStoreName},${store.latitude},${store.longitude}?from=${encodedUserLocationName}&sX=${userLng}&sY=${userLat}`;
    window.open(url, "_blank");
  };

  const handleShare = async () => {
    if (!store) return;

    const encodedStoreName = encodeURIComponent(store.name);
    const mapLink = `https://map.kakao.com/link/map/${encodedStoreName},${store.latitude},${store.longitude}`;

    navigator.clipboard
      .writeText(mapLink)
      .then(() => {
        alert("카카오맵 링크가 클립보드에 복사되었습니다.");
      })
      .catch((err) => {
        console.log("클립보드 복사 실패: ", err);
        alert("링크 복사 실패");
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md z-[100]">
        <DialogHeader>
          <DialogTitle className="text-black flex items-center justify-between">
            <span className="flex flex-row gap-2 items-center">
              {store?.name}
              <div className="text-emerald-600 text-sm">{store.distance}m</div>
            </span>
          </DialogTitle>
        </DialogHeader>

        {store && (
          <div className="space-y-6">
            {/* 기본 정보 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge className="mt-2 " variant="secondary">
                  {store.categoryName}
                </Badge>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      store.isOpenNow ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></div>
                  <span
                    className={`text-sm ${
                      store.isOpenNow ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {store.isOpenNow ? "영업중" : "영업종료"}
                  </span>
                </div>
              </div>
            </div>

            {/* 상세 정보 */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <div className="font-medium text-black flex flex-row gap-2 items-center">
                    주소
                  </div>
                  <div className="text-gray-600 text-sm">{store.address}</div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <div className="font-medium text-black">영업시간</div>
                  <div className="text-gray-600 text-sm">
                    {store.openTime.slice(0, 5)} - {store.closeTime.slice(0, 5)}
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <div className="font-medium text-black">전화번호</div>
                  <div className="text-gray-600 text-sm">
                    {store.phoneNumber}
                  </div>
                </div>
              </div>
            </div>

            {/* 액션 버튼 */}
            <div className="flex space-x-3">
              <Button
                onClick={handleFindRoute}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 justify-center"
              >
                <Navigation className="w-4 h-4 mr-2" />
                길찾기
              </Button>
              <Button
                onClick={handleShare}
                variant="ghost"
                className="flex-1 bg-transparent border justify-center"
              >
                <Share className="w-4 h-4 mr-2" />
                공유하기
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
