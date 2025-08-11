"use client";
import React, { useState } from "react";
import BalanceCard from "@/components/wallet/BalanceCard";
import StatCard from "@/components/wallet/StatCard";
import TransactionItem, {
  Transaction,
} from "@/components/wallet/TransactionItem";
import ChargeItem, { Charge } from "@/components/wallet/ChargeItem";
// import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem } from "@/components/ui/select";
// import { Download, CreditCard } from "lucide-react";

const transactions: Transaction[] = [
  {
    date: "2024.01.20",
    time: "14:30",
    store: "맛있는 김밥천국",
    category: "음식점",
    amount: "-12,000원",
    balance: "125,000원",
    discount: "1,800원",
  },
  {
    date: "2024.01.19",
    time: "16:15",
    store: "카페 로스팅",
    category: "카페",
    amount: "-8,500원",
    balance: "137,000원",
    discount: "850원",
  },
  {
    date: "2024.01.18",
    time: "11:20",
    store: "프레시 마트",
    category: "마트",
    amount: "-35,000원",
    balance: "145,500원",
    discount: "1,750원",
  },
  {
    date: "2024.01.17",
    time: "19:45",
    store: "헤어샵 스타일",
    category: "미용",
    amount: "-40,000원",
    balance: "180,500원",
    discount: "8,000원",
  },
];

const charges: Charge[] = [
  {
    date: "2024.01.15",
    time: "09:30",
    method: "신용카드",
    amount: "+100,000원",
    balance: "180,500원",
    status: "완료",
  },
  {
    date: "2024.01.01",
    time: "10:15",
    method: "계좌이체",
    amount: "+50,000원",
    balance: "80,500원",
    status: "완료",
  },
];

enum TabKey {
  Spending = "spending",
  Charge = "charge",
}

const WalletPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>(TabKey.Spending);
  const [period, setPeriod] = useState("thisMonth");
  const [selectOpen, setSelectOpen] = useState(false);

  return (
    <div className="container mx-auto max-w-[1280px] px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">지갑 관리</h1>
        <p className="text-gray-600">
          지역화폐 잔액, 포인트, 소비 내역을 한 곳에서 관리하세요
        </p>
      </div>

      {/* 잔액 카드 */}
      <div className="grid md:grid-cols-1 gap-6 mb-8">
        <BalanceCard />
      </div>

      {/* 통계 카드 */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="이번 달 사용"
          value="245,000원"
          colorClass="text-emerald-600"
        />
        <StatCard
          title="총 사용 금액"
          value="245,000원"
          colorClass="text-blue-600"
        />
        <StatCard
          title="이번 달 이용"
          value="18회"
          colorClass="text-purple-600"
        />
        <StatCard
          title="이용 가맹점"
          value="12개"
          colorClass="text-orange-600"
        />
      </div>

      {/* 탭 버튼 */}
      <div className="flex space-x-2 mb-6">
        <button
          className={`flex-1 py-2 text-center font-medium rounded-md ${
            activeTab === TabKey.Spending
              ? "bg-emerald-100"
              : "hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab(TabKey.Spending)}
        >
          소비 내역
        </button>
        <button
          className={`flex-1 py-2 text-center font-medium rounded-md ${
            activeTab === TabKey.Charge ? "bg-emerald-100" : "hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab(TabKey.Charge)}
        >
          충전 내역
        </button>
      </div>

      {/* 탭 내용: 고정 최소 높이 적용 */}
      <div className="min-h-[400px]">
        {activeTab === TabKey.Spending ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">소비 내역</h3>
              <div className="flex items-center space-x-2">
                <Select
                  defaultValue={period}
                  // 트리거 클릭 시 open 토글
                  onClick={() => setSelectOpen(!selectOpen)}
                  className="relative bg-white border border-gray-200 rounded-lg shadow-sm"
                >
                  {/* <SelectTrigger className="w-[120px]">
                    <SelectValue>
                      {period === "thisMonth"
                        ? "이번 달"
                        : period === "lastMonth"
                        ? "지난 달"
                        : "최근 3개월"}
                    </SelectValue>
                  </SelectTrigger> */}

                  {/* open 상태일 때만 렌더링 */}
                  {selectOpen && (
                    <SelectContent>
                      <SelectItem
                        value="thisMonth"
                        onClick={() => {
                          setPeriod("thisMonth");
                          setSelectOpen(false);
                        }}
                      >
                        이번 달
                      </SelectItem>
                      <SelectItem
                        value="lastMonth"
                        onClick={() => {
                          setPeriod("lastMonth");
                          setSelectOpen(false);
                        }}
                      >
                        지난 달
                      </SelectItem>
                      <SelectItem
                        value="last3Months"
                        onClick={() => {
                          setPeriod("last3Months");
                          setSelectOpen(false);
                        }}
                      >
                        최근 3개월
                      </SelectItem>
                    </SelectContent>
                  )}
                </Select>
                {/* <Button variant="ghost" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  다운로드
                </Button> */}
              </div>
            </div>
            {transactions.map((tx, idx) => (
              <TransactionItem key={idx} tx={tx} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">충전 내역</h3>
              {/* <Button className="bg-emerald-600 hover:bg-emerald-700">
                <CreditCard className="w-4 h-4 mr-2" />
                새로 충전하기
              </Button> */}
            </div>
            {charges.map((c, idx) => (
              <ChargeItem key={idx} c={c} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletPage;
