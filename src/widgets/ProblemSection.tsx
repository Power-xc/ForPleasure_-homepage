// [PROD] 문제 제기 — 기존 데이팅앱의 피로를 공감으로 짚는다(차별점으로 넘어가는 연결부).
import { Section, SectionHeading } from "@/shared/ui";

const PAINS = [
  { emoji: "💬", text: "매칭돼도 답장이 없거나 그대로 사라지는 경험" },
  { emoji: "🔁", text: "거절과 반복되는 시도로 쌓이는 피로" },
  { emoji: "📅", text: "연락처 교환·일정 조율까지 가야 하는 번거로움" },
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
          <div
            key={p.text}
            className="rounded-2xl border border-primary/10 bg-white p-6 text-center"
          >
            <div className="text-3xl" aria-hidden="true">
              {p.emoji}
            </div>
            <p className="mt-4 text-base leading-relaxed text-primary">{p.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
