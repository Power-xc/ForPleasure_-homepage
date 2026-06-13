// [PROD] 문제 제기 — 기존 데이팅앱의 피로를 공감으로 짚는다(차별점으로 넘어가는 연결부).
import type { ReactNode } from "react";
import { Section, SectionHeading } from "@/shared/ui";

// [PROD] 플랫 라인 아이콘 — 외부 아이콘 라이브러리 의존 없이 인라인 SVG로.
// stroke=currentColor 라 부모 text 색을 그대로 따른다(토큰 색 사용).
const svgProps = {
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

// 답장 없음/대화 끊김 — 말풍선
function ChatIcon() {
  return (
    <svg {...svgProps} aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

// 거절·반복되는 시도 — 반복 화살표
function RepeatIcon() {
  return (
    <svg {...svgProps} aria-hidden="true">
      <path d="m17 2 4 4-4 4" />
      <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
      <path d="m7 22-4-4 4-4" />
      <path d="M21 13v1a4 4 0 0 1-4 4H3" />
    </svg>
  );
}

// 일정 조율 — 캘린더
function CalendarIcon() {
  return (
    <svg {...svgProps} aria-hidden="true">
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 2v4" />
      <path d="M16 2v4" />
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
            {/* 아이콘 — 소프트 퍼플 배경의 둥근 사각형 안에 플랫 라인 아이콘 */}
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent">
              {p.icon}
            </div>
            <p className="mt-5 text-base leading-relaxed text-primary">{p.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
