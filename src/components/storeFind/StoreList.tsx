import { X, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { Store } from "@/lib/types/store";

interface StoreListProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDetail: (storeId: number) => void;
  stores: Store[];
}

export default function StoreList({
  isOpen,
  onClose,
  onOpenDetail,
  stores,
}: StoreListProps) {
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isOpen) {
      setShouldRender(true);
    } else {
      timeoutId = setTimeout(() => {
        setShouldRender(false);
      }, 300);
    }
    return () => clearTimeout(timeoutId);
  }, [isOpen]);

  if (!shouldRender) {
    return null;
  }

  return (
    <>
      <div
        className={`fixed top-4 right-4 w-96 max-h-[calc(100vh-64px)] bg-white rounded-2xl shadow-2xl overflow-hidden z-40
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{ top: "150px" }}
      >
        <div className="p-4 border-b bg-white sticky top-0">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">가맹점 목록</h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">{stores.length}개</span>
              <button onClick={onClose}>
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
          <div className="p-4 space-y-3">
            {stores.map((store) => (
              <div
                key={store.storeId}
                className="hover:shadow-md transition-shadow cursor-pointer border-0 shadow-sm"
              >
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-gray-900">
                          {store.name}
                        </h4>
                        <div className="text-xs text-black">
                          {store.categoryName}
                        </div>
                        <div
                          className={`w-2 h-2 rounded-full ${
                            store.isOpenNow ? "bg-green-500" : "bg-red-500"
                          }`}
                        ></div>
                      </div>
                      <div className="space-y-1 text-xs text-gray-600">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate">{store.address}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">
                            {store.distance}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => onOpenDetail(store.storeId)}
                      className="flex flex-row px-3 py-2 gap-2 border-solid border border-gray-300 text-black rounded-[6.25px] items-center justify-center"
                    >
                      상세
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
