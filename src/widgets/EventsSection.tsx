// [PROD] 이벤트/혜택 — 친구 초대·데일리 보상으로 시작 부담을 낮춘다.
import { Section, SectionHeading, PhoneShot } from "@/shared/ui";
import { EVENTS } from "@/shared/config/site";

export function EventsSection() {
  return (
    <Section surface>
      <SectionHeading
        eyebrow="BENEFITS"
        title="부담 없이 시작하는 방법"
        subtitle="활동할수록 더 많은 기회가 쌓입니다."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {EVENTS.map((e) => (
          <div
            key={e.title}
            className="flex items-center gap-6 rounded-2xl border border-primary/10 bg-white p-6"
          >
            <div className="w-28 shrink-0">
              <PhoneShot src={e.image} alt={`${e.title} — 앱 화면`} />
            </div>
            <div>
              <h3 className="text-xl font-bold">{e.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted">{e.body}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
