// app/layout.tsx

import "./globals.css";
import { ReactNode } from "react";
import { Noto_Sans_KR } from "next/font/google";

const noto = Noto_Sans_KR({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "coufit",
  description: "coufit ",
  icons: {
    icon: "/icon/coufit.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${noto.className}`}>{children}</body>
    </html>
  );
}
