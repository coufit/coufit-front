"use client";

import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Phone } from "lucide-react";

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md z-[100]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{store?.name}</span>
          </DialogTitle>
          <DialogDescription className="sr-only">
            {store.name}의 상세 정보 모달입니다.
          </DialogDescription>
        </DialogHeader>

        {store && (
          <div className="space-y-6">
            {/* 기본 정보 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{store.category}</Badge>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      store.isOpen ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></div>
                  <span
                    className={`text-sm ${
                      store.isOpen ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {store.isOpen ? "영업중" : "영업종료"}
                  </span>
                </div>
              </div>
            </div>

            {/* 상세 정보 */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <div className="font-medium">주소</div>
                  <div className="text-gray-600 text-sm">{store.address}</div>
                  <div className="text-emerald-600 text-sm">
                    {store.distance} 거리
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <div className="font-medium">영업시간</div>
                  <div className="text-gray-600 text-sm">{store.hours}</div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <div className="font-medium">전화번호</div>
                  <div className="text-gray-600 text-sm">{store.phone}</div>
                </div>
              </div>
            </div>

            {/* 액션 버튼 */}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
