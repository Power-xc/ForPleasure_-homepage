// [PROD][SEC] 푸터 — 브랜드, 정책 링크, 성인 대상 고지, 카피라이트.
import Link from "next/link";
import { Container } from "@/shared/ui";
import { BRAND } from "@/shared/config/site";

// [SPEC] 정책 페이지는 아직 별도 제작 전 — 자리만 잡아둔다. (TODO: 실제 페이지 연결)
const LINKS = [
  { label: "이용약관", href: "#" },
  { label: "개인정보처리방침", href: "#" },
  { label: "문의하기", href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-primary/10 bg-white py-12">
      <Container className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="flex items-center gap-1 text-lg font-bold text-primary">
            {BRAND.name}
            <span className="text-gold" aria-hidden="true">
              ✦
            </span>
          </p>
          <p className="mt-2 text-sm text-muted">{BRAND.slogan}</p>
          <p className="mt-4 max-w-sm text-xs leading-relaxed text-muted">
            잇다는 가입 심사를 거친 성인 회원을 대상으로 운영되는 서비스입니다.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-sm text-muted transition-colors hover:text-primary"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </Container>
      <Container className="mt-8">
        <p className="text-xs text-muted">© {new Date().getFullYear()} 잇다 (Itda). All rights reserved.</p>
      </Container>
    </footer>
  );
}
