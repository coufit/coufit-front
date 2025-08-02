"use client";

import "./globals.css";
import React, { useState, useEffect } from "react";
import { Noto_Sans_KR, Inter } from "next/font/google";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import LoginModal from "@/components/LoginModal";

const noto = Noto_Sans_KR({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});
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

  // 로그인 사용자 정보
  const [user, setUser] = useState<{ email: string } | null>(null);
  // 마운트 완료 플래그 (SSR vs CSR 차단)
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // ① 클라이언트 마운트 시점에만 실행
    setMounted(true);

    // ② 로컬스토리지에서 이메일 읽어서 user 세팅
    const email = localStorage.getItem("userEmail");
    const token = localStorage.getItem("authToken");
    if (token && email) {
      setUser({ email });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    setUser(null);
  };

  // 마운트 전까지 아무것도 렌더하지 않아 깜빡임 방지
  if (!mounted) {
    return null;
  }

  return (
    <html lang="ko" className={noto.className}>
      <body
        className={`${inter.className} min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50`}
      >
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          user={user}
          onLogout={handleLogout}
          onLoginClick={() => setLoginModalOpen(true)}
        />

        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          aiModalOpen={aiModalOpen}
          setAiModalOpen={setAiModalOpen}
          setCurrentPage={setCurrentPage}
        />

        <LoginModal
          open={loginModalOpen}
          onClose={() => setLoginModalOpen(false)}
          onLoginSuccess={(userData) => {
            setUser(userData);
            setLoginModalOpen(false);
          }}
        />

        <main>{children}</main>
      </body>
    </html>
  );
}
