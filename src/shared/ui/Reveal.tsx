"use client";
// [PROD] 스크롤 등장 애니메이션 — 요소가 화면에 들어오면 페이드업으로 나타난다.
// IntersectionObserver로 한 번만 트리거(disconnect)해 성능 부담을 줄인다.
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  /** 같은 화면의 여러 요소를 약간씩 시차 등장시킬 때 (ms) */
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect(); // 한 번 등장하면 더 관찰하지 않는다
        }
      },
      // 하단에서 약간 올라온 시점에 트리거
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${shown ? "reveal-in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
