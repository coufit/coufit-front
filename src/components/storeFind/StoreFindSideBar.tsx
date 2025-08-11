import { Search, ChevronDown, X } from "lucide-react";

interface StoreFindSideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StoreFindSideBar({
  isOpen,
  onClose,
}: StoreFindSideBarProps) {
  const categories = [
    { id: 1, name: "음식점", icon: "🍽️" },
    { id: 2, name: "교육", icon: "📚" },
    { id: 3, name: "마트", icon: "🛒" },
    { id: 4, name: "미용", icon: "💄" },
    { id: 5, name: "생활", icon: "🏠" },
    { id: 6, name: "스포츠", icon: "🏃‍♀️" },
    { id: 7, name: "의료", icon: "🏥" },
    { id: 8, name: "제조", icon: "🏭" },
    { id: 9, name: "숙박", icon: "🏘️" },
    { id: 10, name: "잡화", icon: "🛍️" },
  ];

  return (
    <>
      {isOpen && <div className="fixed inset- z-40" onClick={onClose}></div>}
      <div className="flex h-[calc(100vh-64px)] relative">
        {/* 토글 가능한 필터 사이드바 */}
        <div
          className={`h-full bg-white shadow-xl transform transition-all duration-300 ease-in-out overflow-hidden z-20
            ${isOpen ? "w-80" : "w-0"}`}
        >
          <div className="px-6 py-6 space-y-6 h-full overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900">필터</h3>
              <button>
                <X className="w-4 h-4" />
              </button>
            </div>
            {/* 검색 */}
            <div className="p-2 relative rounded-md border border-gray-300">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                id="store-search"
                name="search-query"
                type="text"
                placeholder="가맹점명, 주소 검색"
                className="pl-10 w-full"
              />
            </div>

            {/* 지역 선택 */}
            <div className="space-y-5">
              <h3 className="font-semibold text-gray-900">지역 선택</h3>
              <div className="grid grid-cols-1 gap-2">
                <div className="relative">
                  <select className="w-full text-black p-2 rounded-md border appearance-none border-gray-300 pr-10">
                    <option>경기도</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
                <div className="relative">
                  <select className="w-full text-black p-2 rounded-md border appearance-none border-gray-300 pr-10">
                    <option>시흥시</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* 업종 선택 */}
            <div className=" space-y-3">
              <h3 className="font-semibold text-gray-900">업종 선택</h3>
              <div className="space-y-3">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      key={category.id}
                      value={category.name}
                    />
                    <label
                      htmlFor={category.name}
                      className="flex text-black items-center space-x-2 cursor-pointer flex-1"
                    >
                      <span>{category.icon}</span>
                      <span className="text-sm">{category.name}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* 정렬 */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">정렬</h3>
              <div className="relative">
                <select className="w-full text-black p-2 rounded-md border appearance-none border-gray-300 pr-10">
                  <option>추천순</option>
                  <option>거리순</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* 필터 초기화 */}
            <button className="p-2 w-full bg-transparent border border-gray-300 rounded-md font-medium text-gray-900">
              필터 초기화
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
