import type { Metadata } from "next";

import { Footer, Header } from "@/components";

import "./globals.css";

export const metadata: Metadata = {
  title: "Press Community MVP",
  description: "언론인 지망생을 위한 커뮤니티 사이트 MVP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 py-8">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
