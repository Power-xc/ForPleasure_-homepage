// [PROD] FAQ — 네이티브 <details>로 JS 없이 접근성 있는 아코디언을 구현한다.
import { Section, SectionHeading } from "@/shared/ui";
import { FAQ } from "@/shared/config/site";

export function FaqSection() {
  return (
    <Section id="faq">
      <SectionHeading eyebrow="FAQ" title="자주 묻는 질문" />
      <div className="mx-auto mt-12 max-w-2xl divide-y divide-primary/10">
        {FAQ.map((item) => (
          <details key={item.q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
              {item.q}
              {/* 펼침 표시 — 열리면 회전 */}
              <span className="text-accent transition-transform group-open:rotate-45" aria-hidden="true">
                +
              </span>
            </summary>
            <p className="mt-3 text-base leading-relaxed text-muted">{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
