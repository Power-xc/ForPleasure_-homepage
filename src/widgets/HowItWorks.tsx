// [PROD] 이용 방법 — 가입 심사부터 만남까지 5단계 흐름을 카드로 보여준다.
import { Section, SectionHeading, PhoneShot } from "@/shared/ui";
import { HOW_IT_WORKS } from "@/shared/config/site";

export function HowItWorks() {
  return (
    <Section id="how" surface>
      <SectionHeading
        eyebrow="HOW IT WORKS"
        title="가입부터 만남까지, 이렇게 이어집니다"
        subtitle="복잡한 과정은 잇다가 대신합니다. 정해진 약속에 맞춰 만나기만 하면 됩니다."
      />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {HOW_IT_WORKS.map((s) => (
          <div key={s.step} className="flex flex-col rounded-2xl border border-primary/10 bg-white p-4">
            <p className="text-xs font-semibold tracking-wider text-accent">{s.step}</p>
            <h3 className="mt-1 text-lg font-bold">{s.title}</h3>
            <p className="mt-2 mb-4 grow text-sm leading-relaxed text-muted">{s.body}</p>
            <PhoneShot src={s.image} alt={`${s.title} — 앱 화면`} />
          </div>
        ))}
      </div>
    </Section>
  );
}
