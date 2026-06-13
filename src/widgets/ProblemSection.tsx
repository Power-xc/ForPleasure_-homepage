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

// 거절·반복되는 시도 — 솔리드 깨진 하트 (안쪽 균열은 카드 배경색 흰색으로 knockout)
function HeartBrokenIcon() {
  return (
    <svg {...svgProps} aria-hidden="true">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      <path
        d="M12.6 4.6 L10.3 9 L13 11 L10.8 15.6"
        fill="none"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 일정 조율 — 솔리드 시계 (시침/분침은 카드 배경색 흰색으로 knockout)
function ClockIcon() {
  return (
    <svg {...svgProps} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path
        d="M12 7.5 V12 L15 13.8"
        fill="none"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const PAINS: { icon: ReactNode; text: string }[] = [
  { icon: <ChatIcon />, text: "매칭돼도 답장이 없거나 그대로 사라지는 경험" },
  { icon: <HeartBrokenIcon />, text: "거절과 반복되는 시도로 쌓이는 피로" },
  { icon: <ClockIcon />, text: "연락처 교환·일정 조율까지 가야 하는 번거로움" },
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
