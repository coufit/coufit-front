// app/(your-path)/wallet/page.tsx  혹은  pages/wallet.tsx
"use client";

import React, { useState, useEffect } from "react";
import BalanceCard from "@/components/wallet/BalanceCard";
import StatCard from "@/components/wallet/StatCard";
import SpendHistory from "@/components/wallet/SpendHistory";
import ChargeItem, { Charge } from "@/components/wallet/ChargeItem";
import { Select, SelectContent, SelectItem } from "@/components/ui/select";

interface SummaryData {
  monthlyUsageAmount: number;
  monthlyUsageCount: number;
  usedStoresCount: number;
  totalUsageAmount: number;
}

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

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState<TabKey>(TabKey.Spending);
  const [period, setPeriod] = useState("thisMonth");
  const [selectOpen, setSelectOpen] = useState(false);

  // 통계 데이터
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [summaryError, setSummaryError] = useState("");

  useEffect(() => {
    async function fetchSummary() {
      setSummaryLoading(true);
      setSummaryError("");
      try {
        const res = await fetch("http://localhost:8080/api/points/summary");
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const wrapper = (await res.json()) as {
          code: number;
          message: string;
          data: SummaryData;
        };
        setSummary(wrapper.data);
      } catch (e: any) {
        console.error(e);
        setSummaryError("통계 정보를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setSummaryLoading(false);
      }
    }
    fetchSummary();
  }, []);

  return (
    <div className="container mx-auto max-w-[1280px] px-4 py-8">
      {/* 타이틀 */}
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
        {summaryLoading ? (
          <>
            <div className="h-24 bg-gray-200 animate-pulse rounded" />
            <div className="h-24 bg-gray-200 animate-pulse rounded" />
            <div className="h-24 bg-gray-200 animate-pulse rounded" />
            <div className="h-24 bg-gray-200 animate-pulse rounded" />
          </>
        ) : summaryError || !summary ? (
          <div className="col-span-4 text-center text-red-600">
            {summaryError || "통계 데이터를 불러오지 못했습니다."}
          </div>
        ) : (
          <>
            <StatCard
              title="이번 달 사용 금액"
              value={`${summary.monthlyUsageAmount.toLocaleString()}원`}
              colorClass="text-emerald-600"
            />
            <StatCard
              title="총 사용 금액"
              value={`${summary.totalUsageAmount.toLocaleString()}원`}
              colorClass="text-orange-600"
            />
            <StatCard
              title="이번 달 소비 횟수"
              value={`${summary.monthlyUsageCount}회`}
              colorClass="text-blue-600"
            />
            <StatCard
              title="이용 가맹점 수"
              value={`${summary.usedStoresCount}개`}
              colorClass="text-purple-600"
            />
          </>
        )}
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

      {/* 탭 콘텐츠 */}
      <div className="min-h-[400px]">
        {activeTab === TabKey.Spending ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">소비 내역</h3>
              <div className="flex items-center space-x-2">
                <Select
                  defaultValue={period}
                  onClick={() => setSelectOpen(!selectOpen)}
                  className="relative bg-white border border-gray-200 rounded-lg shadow-sm"
                >
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
              </div>
            </div>

            {/* 실제 API 연동 내역 */}
            <SpendHistory />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">충전 내역</h3>
            </div>
            {charges.map((c, idx) => (
              <ChargeItem key={idx} c={c} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
