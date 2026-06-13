// [PROD] 문제 제기 — 기존 데이팅앱의 피로를 공감으로 짚는다(차별점으로 넘어가는 연결부).
import type { ReactNode } from "react";
import { Section, SectionHeading } from "@/shared/ui";

// [PROD] 플랫(솔리드 채움) 아이콘 — 외부 라이브러리 없이 인라인 SVG, fill=currentColor로 토큰 색 사용.
// 장식용 배경/그림자 없이 글리프만 둬서 최대한 플랫하게.
const svgProps = { width: 32, height: 32, viewBox: "0 0 24 24", fill: "currentColor" } as const;

// 답장 없음/대화 끊김 — 솔리드 말풍선
function ChatIcon() {
  return (
    <svg {...svgProps} aria-hidden="true">
      <rect x="2" y="4" width="20" height="13" rx="3.5" />
      <path d="M8 15.5 L8 21 L13.5 15.5 Z" />
    </svg>
  );
}

// 거절·반복되는 시도 — 솔리드 반복(교차) 화살표
function RepeatIcon() {
  return (
    <svg {...svgProps} aria-hidden="true">
      <path d="M7 3 L11 8 H8 V15 H6 V8 H3 Z" />
      <path d="M17 21 L13 16 H16 V9 H18 V16 H21 Z" />
    </svg>
  );
}

// 일정 조율 — 솔리드 캘린더 (본문은 evenodd로 비워 플랫하게)
function CalendarIcon() {
  return (
    <svg {...svgProps} aria-hidden="true" fillRule="evenodd" clipRule="evenodd">
      <path d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1V3a1 1 0 0 1 1-1zM4 10h16v9H4z" />
    </svg>
  );
}

const PAINS: { icon: ReactNode; text: string }[] = [
  { icon: <ChatIcon />, text: "매칭돼도 답장이 없거나 그대로 사라지는 경험" },
  { icon: <RepeatIcon />, text: "거절과 반복되는 시도로 쌓이는 피로" },
  { icon: <CalendarIcon />, text: "연락처 교환·일정 조율까지 가야 하는 번거로움" },
];

export function ProblemSection() {
  return (
    <Section surface>
      <SectionHeading
        eyebrow="WHY ITDA"
        title={<>매칭이 되어도, 만남까지는 왜 이렇게 멀까요?</>}
        subtitle="문제는 매칭이 아니라 그 다음입니다. 잇다는 만남까지 가는 과정을 다시 설계했습니다."
      />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {PAINS.map((p) => (
          <div key={p.text} className="rounded-2xl border border-primary/10 bg-white p-6 text-center">
            <div className="mx-auto flex justify-center text-accent">{p.icon}</div>
            <p className="mt-4 text-base leading-relaxed text-primary">{p.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
