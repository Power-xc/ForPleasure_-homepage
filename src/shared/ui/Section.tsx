// [PROD] 섹션 래퍼 — 세로 여백과 배경(흰색/표면색)을 표준화한다. id로 앵커 이동 지원.
import type { ReactNode } from "react";
import { Container } from "./Container";

export function Section({
  id,
  surface = false,
  className = "",
  children,
}: {
  id?: string;
  surface?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      // 모바일 우선: 작은 화면 기본값 → 큰 화면에서 여백 확대
      className={`scroll-mt-20 py-16 md:py-24 ${surface ? "bg-surface" : "bg-white"} ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}
