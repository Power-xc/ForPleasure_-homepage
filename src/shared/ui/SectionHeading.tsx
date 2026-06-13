// [PROD] 섹션 제목 블록 — 작은 라벨(eyebrow) + 제목 + 보조 설명을 일관된 스타일로.
import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
}) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-2xl ${alignCls}`}>
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">{eyebrow}</p>
      ) : null}
      <h2 className="text-2xl font-bold leading-snug md:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">{subtitle}</p> : null}
    </div>
  );
}
