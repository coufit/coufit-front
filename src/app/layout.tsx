"use client";

import "./globals.css";
import React, { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Noto_Sans_KR, Inter } from "next/font/google";

// 1) 폰트 불러오기 (한글용 Noto Sans KR엔 반드시 'korean'을 포함)
const noto = Noto_Sans_KR({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

// 영어 보조 폰트 Inter
const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("spending");

  return (
    // 2) html/body에 font.className 적용
    <html lang="ko" className={noto.className}>
      <body
        className={`${inter.className} min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50`}
      >
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          setLoginModalOpen={setLoginModalOpen}
        />
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          aiModalOpen={aiModalOpen}
          setAiModalOpen={setAiModalOpen}
          setCurrentPage={setCurrentPage}
        />
        <main> {children} </main>
      </body>
    </html>
  );
}
