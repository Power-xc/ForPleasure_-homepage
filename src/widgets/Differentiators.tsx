// [PROD] 6가지 차별점 — 텍스트와 실제 앱 화면을 좌우 교차 배치로 보여준다.
import { Section, SectionHeading, PhoneShot } from "@/shared/ui";
import { DIFFERENTIATORS } from "@/shared/config/site";

export function Differentiators() {
  return (
    <Section id="why">
      <SectionHeading
        eyebrow="6 REASONS"
        title="잇다가 다른 6가지"
        subtitle="매칭의 양이 아니라, 실제로 이어지는 만남의 질에 집중했습니다."
      />
      <div className="mt-16 space-y-16 md:space-y-24">
        {DIFFERENTIATORS.map((item, i) => (
          <div
            key={item.no}
            className="grid items-center gap-8 md:grid-cols-2 md:gap-14"
          >
            {/* 짝수 인덱스는 이미지를 오른쪽, 홀수는 왼쪽으로 교차 (md 이상) */}
            <div className={i % 2 === 1 ? "md:order-2" : ""}>
              <span className="text-5xl font-bold text-accent-soft">{item.no}</span>
              <h3 className="mt-3 text-2xl font-bold leading-snug md:text-3xl">{item.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">{item.body}</p>
            </div>
            <div className={`mx-auto w-full max-w-[280px] ${i % 2 === 1 ? "md:order-1" : ""}`}>
              <PhoneShot src={item.image} alt={`${item.title} — 앱 화면`} />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
