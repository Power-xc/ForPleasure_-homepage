// [PROD] 최종 전환 — QR 프리패스 가입 유도. 1차 CTA 목적지(id=prepass).
// [SPEC] 코드 입력 후 연결 대상(앱 딥링크/가입 웹)은 미확정 → 실제 링크는 비워둔다.
//        결정 전까지 버튼 동작은 자리만 잡고, 안내 문구로 솔직히 상태를 알린다(과장 금지).
import { Button, Container } from "@/shared/ui";

export function FinalCta() {
  return (
    <div id="prepass" className="scroll-mt-20 bg-primary py-20 text-white md:py-28">
      <Container className="text-center">
        <p className="text-sm font-semibold tracking-wider text-gold">QR PREPASS</p>
        <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
          코드가 있다면, 지금 시작하세요
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
          오프라인 행사 등에서 받은 QR 프리패스 코드로 더 빠르게 가입할 수 있습니다.
        </p>
        <div className="mt-9 flex justify-center">
          {/* TODO: QR 프리패스 연결 대상 확정 시 href 연결 (현재는 미정이라 자리만) */}
          <Button size="lg" className="!bg-white !text-primary hover:!bg-white/90">
            QR 프리패스 가입
          </Button>
        </div>
        <p className="mt-4 text-sm text-white/60">가입 코드 입력 안내는 순차적으로 제공됩니다.</p>
      </Container>
    </div>
  );
}
