"use client";
// [PROD] 6가지 차별점 — 긴 세로 스크롤 대신 "탭 선택 + 고정 상세 패널"로 한 화면에 담는다.
// 왼쪽 목록에서 항목을 고르면 오른쪽 패널이 페이드업으로 전환된다(UX 개선).
import { useState } from "react";
import { Section, SectionHeading, PhoneShot } from "@/shared/ui";
import { DIFFERENTIATORS } from "@/shared/config/site";

export function Differentiators() {
  const [active, setActive] = useState(0);
  const item = DIFFERENTIATORS[active];

  return (
    <Section id="why">
      <SectionHeading
        eyebrow="6 REASONS"
        title="잇다가 다른 6가지"
        subtitle="매칭의 양이 아니라, 실제로 이어지는 만남의 질에 집중했습니다."
      />

      <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-2 md:gap-12">
        {/* 선택 목록 — 번호 + 제목 (클릭으로 상세 전환) */}
        <ul className="flex flex-col gap-2">
          {DIFFERENTIATORS.map((d, i) => {
            const on = i === active;
            return (
              <li key={d.no}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={on}
                  className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                    on ? "border-accent bg-accent-soft" : "border-primary/10 bg-white hover:bg-surface active:bg-accent-soft"
                  }`}
                >
                  <span className={`text-xl font-bold ${on ? "text-accent" : "text-primary/30"}`}>{d.no}</span>
                  <span className={`text-base font-semibold md:text-lg ${on ? "text-primary" : "text-muted"}`}>
                    {d.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* 상세 패널 — 데스크톱에서는 스크롤에 따라 고정(sticky) */}
        <div className="md:sticky md:top-24 md:self-start">
          {/* key를 active로 줘서 전환 때마다 페이드업 재생 */}
          <div key={active} className="anim-fadeup grid gap-6 sm:grid-cols-[200px_1fr] sm:items-center md:block">
            <div className="mx-auto w-full max-w-[240px] sm:mx-0 md:mb-6 md:max-w-[260px]">
              <PhoneShot src={item.image} alt={`${item.title} — 앱 화면`} sizes="(max-width: 768px) 70vw, 260px" />
            </div>
            <div>
              <h3 className="text-xl font-bold leading-snug md:text-2xl">{item.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted">{item.body}</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
