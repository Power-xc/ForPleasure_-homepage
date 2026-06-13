// [PROD][SEC] 신뢰·안전 — 검증/활동/책임 근거를 제시해 의구심을 해소한다.
// 데이팅 서비스 특성상 신뢰 메시지를 우선하고, 과장·보장 표현은 쓰지 않는다.
import { Section, SectionHeading, PhoneShot } from "@/shared/ui";
import { TRUST_POINTS } from "@/shared/config/site";

export function TrustSafety() {
  return (
    <Section id="trust">
      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <div className="mx-auto w-full max-w-[280px] md:order-2">
          <PhoneShot src="/homepage/images/matching-waiting.png" alt="잇다 매니저가 안내하는 매칭 대기 화면" />
        </div>
        <div className="md:order-1">
          <SectionHeading
            eyebrow="TRUST & SAFETY"
            title="신뢰는 잇다가 먼저 책임집니다"
            align="left"
          />
          <ul className="mt-8 space-y-6">
            {TRUST_POINTS.map((t) => (
              <li key={t.title} className="flex gap-4">
                <span
                  className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent"
                  aria-hidden="true"
                >
                  ✓
                </span>
                <div>
                  <h3 className="text-lg font-bold">{t.title}</h3>
                  <p className="mt-1 text-base leading-relaxed text-muted">{t.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
