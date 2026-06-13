// [PROD] 가운데 정렬 콘텐츠 래퍼 — 최대 폭과 좌우 여백을 한 곳에서 통제한다.
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-content px-5 md:px-8 ${className}`}>{children}</div>;
}
