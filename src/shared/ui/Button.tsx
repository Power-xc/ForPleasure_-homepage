// [PROD] 공용 버튼 — 디자인 토큰만 사용하고 인터랙티브 5상태를 모두 구현한다.
// href가 있으면 a 태그, 없으면 button 태그로 렌더링한다(중복 컴포넌트 방지). [DRY]
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "outline";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center rounded-full font-semibold transition-colors " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 " +
  "disabled:cursor-not-allowed disabled:bg-disabled disabled:text-white disabled:border-transparent";

// [PROD] 변형별 색 — 기본/hover/press 상태 정의
const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-hover active:bg-primary-press border border-transparent",
  outline:
    "bg-white text-primary border border-primary/20 hover:border-primary hover:bg-surface active:bg-accent-soft",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type AsLink = CommonProps & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className">;
type AsButton = CommonProps & { href?: undefined } & Omit<ComponentProps<"button">, "className">;

export function Button(props: AsLink | AsButton) {
  const { variant = "primary", size = "md", className = "", children } = props;
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if ("href" in props && props.href !== undefined) {
    const { href, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
