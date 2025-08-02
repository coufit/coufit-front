"use client";

import React from "react";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: { email: string } | null;
  onLogout: () => void;
  onLoginClick: () => void;
}

export default function Header({
  sidebarOpen,
  setSidebarOpen,
  user,
  onLogout,
  onLoginClick,
}: HeaderProps) {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container w-[1280px] h-[60px] mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:flex"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">지</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Coufit</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {user ? (
            <>
              <span className="text-gray-700">
                안녕하세요, <strong>{user.email}</strong>님
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="text-sm"
              >
                로그아웃
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={onLoginClick}>
                로그인
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                회원가입
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
