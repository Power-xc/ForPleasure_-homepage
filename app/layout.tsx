// [PROD][SPEC] 루트 레이아웃 — 한국어 문서, 공유(OG)·SEO 메타데이터 설정.
import type { Metadata, Viewport } from "next";
import "./globals.css";

const title = "잇다 (Itda) — 검증된 만남, 약속까지";
const description =
  "아무나 만나는 앱이 아닙니다. 직접 검증한 회원과 매칭되고, 시간과 장소까지 앱 안에서 확정되는 데이팅 서비스, 잇다.";

export const metadata: Metadata = {
  title,
  description,
  // 카톡·SNS 공유 카드 (OG)
  openGraph: {
    title,
    description,
    type: "website",
    locale: "ko_KR",
    siteName: "잇다",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#1E2A4A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        {/* [PROD] JS 미동작 환경에서는 스크롤 등장 요소를 즉시 보이게 (콘텐츠 가림 방지) */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
