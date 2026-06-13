import type { Config } from "tailwindcss";

// [PROD] 잇다 디자인 토큰 — 앱 화면에서 추출(딥네이비 버튼 + 퍼플 일러스트 + 골드 별).
// 색/간격/라운드는 여기 한 곳에서만 정의한다. 컴포넌트에서 임의 hex 하드코딩 금지.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // 브랜드 핵심 — 딥네이비 (CTA·헤딩의 기본색)
        primary: {
          DEFAULT: "#1E2A4A",
          hover: "#152037",
          press: "#0E1626",
        },
        // 포인트 — 퍼플 (강조·아이콘)
        accent: {
          DEFAULT: "#6D5AE6",
          soft: "#EEEBFB",
        },
        // 별/프리미엄 강조 — 골드
        gold: "#E6B450",
        // 표면/배경
        surface: "#F4F5F8",
        // 본문 보조 텍스트
        muted: "#6B7280",
        // 비활성 상태
        disabled: "#C7CBD4",
      },
      fontFamily: {
        // 한글 우선 — Pretendard가 있으면 사용, 없으면 시스템 폰트로 폴백 (외부 폰트 의존 최소화)
        sans: [
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "Apple SD Gothic Neo",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      maxWidth: {
        content: "1120px",
      },
      borderRadius: {
        xl: "16px",
        "2xl": "24px",
      },
    },
  },
  plugins: [],
};

export default config;
