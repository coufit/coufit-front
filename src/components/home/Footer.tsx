// components/Footer.tsx
import * as React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 max-w-[1280px]">
        <div className="grid md:grid-cols-4 gap-8">
          {/* 브랜드 */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">지</span>
              </div>
              <span className="text-xl font-bold">Coufit</span>
            </div>
            <p className="text-gray-400">
              지역 경제 활성화를 위한 스마트한 소비 플랫폼
            </p>
          </div>

          {/* 서비스 */}
          <div>
            <h3 className="font-bold mb-4">서비스</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  가맹점 검색
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  AI 추천
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  리뷰 시스템
                </a>
              </li>
            </ul>
          </div>

          {/* 고객지원 */}
          <div>
            <h3 className="font-bold mb-4">고객지원</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  이용 가이드
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  고객센터
                </a>
              </li>
            </ul>
          </div>

          {/* 회사 */}
          <div>
            <h3 className="font-bold mb-4">회사</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  회사소개
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  개인정보처리방침
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  이용약관
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 저작권 */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Coufit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
