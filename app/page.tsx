// [SPEC] 잇다 랜딩 — 섹션 위젯을 기획서 순서대로 조립한다.
// 순서: 히어로 → 문제 제기 → 6가지 차별점 → 이용 방법 → 신뢰·안전 → 혜택 → FAQ → 최종 CTA → 푸터
import {
  Header,
  Hero,
  ProblemSection,
  Differentiators,
  HowItWorks,
  TrustSafety,
  EventsSection,
  FaqSection,
  FinalCta,
  Footer,
} from "@/widgets";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProblemSection />
        <Differentiators />
        <HowItWorks />
        <TrustSafety />
        <EventsSection />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
