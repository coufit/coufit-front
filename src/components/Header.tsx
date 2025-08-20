import React from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import coufit from "../../public/icon/coufit.png";
import Image from "next/image";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({
  sidebarOpen,
  setSidebarOpen,
  setLoginModalOpen,
}) => {
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
              <Image src={coufit} alt="Coufit 아이콘" width={32} height={32} />
            </div>
            <span className="text-xl font-bold text-gray-900">Coufit</span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="ghost" onClick={() => setLoginModalOpen(true)}>
            로그인
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            회원가입
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
