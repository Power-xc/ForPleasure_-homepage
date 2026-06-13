// [PROD] 상단 고정 헤더 — 로고 + 내비게이션 + QR 프리패스 CTA.
import Link from "next/link";
import { Button, Container } from "@/shared/ui";
import { BRAND, NAV } from "@/shared/config/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-primary/10 bg-white/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        {/* 로고 — 워드마크 + 골드 별 포인트 */}
        <Link href="#top" className="flex items-center gap-1 text-xl font-bold text-primary">
          {BRAND.name}
          <span className="text-gold" aria-hidden="true">
            ✦
          </span>
        </Link>

        {/* 내비게이션 — 모바일에서는 숨김(데스크톱 우선 노출) */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Button href={BRAND.prepassAnchor} size="md">
          QR 프리패스 가입
        </Button>
      </Container>
    </header>
  );
}
