// [PROD] 6가지 차별점 — 스크롤로 내려갈 때 각 항목이 페이드업으로 등장한다(Reveal).
// 좌우 교차 배치 + 이미지/텍스트를 살짝 시차(delay)로 등장시켜 리듬을 준다.
import { Section, SectionHeading, PhoneShot, Reveal } from "@/shared/ui";
import { DIFFERENTIATORS } from "@/shared/config/site";

export function Differentiators() {
  return (
    <Section id="why">
      <SectionHeading
        eyebrow="6 REASONS"
        title="잇다가 다른 6가지"
        subtitle="매칭의 양이 아니라, 실제로 이어지는 만남의 질에 집중했습니다."
      />
      <div className="mt-14 space-y-16 md:mt-20 md:space-y-24">
        {DIFFERENTIATORS.map((item, i) => {
          const imageRight = i % 2 === 0; // 짝수: 이미지 오른쪽 / 홀수: 왼쪽 (md 이상)
          return (
            <div key={item.no} className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
              <Reveal className={imageRight ? "" : "md:order-2"}>
                <span className="text-5xl font-bold text-accent-soft">{item.no}</span>
                <h3 className="mt-3 text-2xl font-bold leading-snug md:text-3xl">{item.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">{item.body}</p>
              </Reveal>
              <Reveal delay={120} className={`mx-auto w-full max-w-[260px] ${imageRight ? "" : "md:order-1"}`}>
                <PhoneShot src={item.image} alt={`${item.title} — 앱 화면`} />
              </Reveal>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
