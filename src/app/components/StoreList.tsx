import { X, MapPin } from "lucide-react";

interface StoreListProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Store {
  storeId: number;
  name: string;
  latitude: number;
  longitude: number;
  category: string;
  isOpen: boolean;
  address: string;
  distance: string;
}

export default function StoreList({ isOpen, onClose }: StoreListProps) {
  const dummyStores: Store[] = [
    {
      storeId: 1,
      name: "멋진 카페",
      latitude: 37.5665,
      longitude: 126.978,
      category: "카페",
      isOpen: true,
      address: "어쩌구 저쩌구",
      distance: "250m",
    },
    {
      storeId: 2,
      name: "맛있는 식당",
      latitude: 37.568,
      longitude: 126.98,
      category: "한식",
      isOpen: false,
      address: "어쩌구 저쩌구",
      distance: "200m",
    },
  ];
  return (
    <>
      {isOpen && <div className="fixed inset- z-40" onClick={onClose}></div>}
      <div
        className={`fixed top-4 right-4 w-96 max-h-[calc(100vh-64px)] bg-white rounded-2xl shadow-2xl overflow-hidden z-40
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{ top: "80px" }}
      >
        <div className="p-4 border-b bg-white sticky top-0">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">가맹점 목록</h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">
                {dummyStores.length}개
              </span>
              <button>
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
          <div className="p-4 space-y-3">
            {dummyStores.map((store) => (
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
                        <div className="text-xs">{store.category}</div>
                        <div
                          className={`w-2 h-2 rounded-full ${
                            store.isOpen ? "bg-green-500" : "bg-red-500"
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
                    <button className="flex flex-row px-3 py-2 gap-2 border-solid border border-gray-300 text-black rounded-[6.25px] items-center justify-center">
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
