// [PROD] 히어로 — 핵심 가치 1줄 + 대표 비주얼 + 1차 CTA(QR 프리패스).
import { Button, Container, PhoneShot } from "@/shared/ui";
import { BRAND } from "@/shared/config/site";

export function Hero() {
  return (
    <div id="top" className="relative overflow-hidden bg-primary text-white">
      {/* 배경 포인트 — 퍼플 글로우 (장식, 토큰 색 사용) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/30 blur-3xl"
      />
      <Container className="relative grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
        <div className="text-center md:text-left">
          <p className="mb-4 text-sm font-semibold tracking-wider text-gold">{BRAND.slogan}</p>
          <h1 className="text-3xl font-bold leading-tight md:text-5xl">
            검증된 사람과의 만남,
            <br />
            <span className="text-accent-soft">약속까지 책임지는</span> 데이팅
          </h1>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-white/80 md:mx-0 md:text-lg">
            아무나 만나는 앱이 아닙니다. 직접 검증한 회원과 매칭되고, 시간과 장소까지 앱 안에서 확정됩니다.
          </p>
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center md:justify-start">
            <Button href={BRAND.prepassAnchor} size="lg">
              QR 프리패스로 시작하기
            </Button>
            <Button href="#why" variant="outline" size="lg" className="!border-white/30 !bg-transparent !text-white hover:!bg-white/10">
              잇다가 다른 이유
            </Button>
          </div>
        </div>

        {/* 대표 비주얼 — 스플래시 화면 */}
        <div className="mx-auto w-full max-w-xs">
          <PhoneShot src="/homepage/images/hero-splash.png" alt="잇다 앱 시작 화면" priority sizes="(max-width: 768px) 80vw, 320px" />
        </div>
      </Container>
    </div>
  );
}
