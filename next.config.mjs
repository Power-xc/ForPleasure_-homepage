/** @type {import('next').NextConfig} */
// [ENG] 정적 랜딩 위주 — 기본 설정 유지, 불필요한 실험 기능 미사용 (의존성/공격표면 최소화)
const nextConfig = {
  reactStrictMode: true,
  // [ENG] 별도 ESLint 설정을 두지 않았으므로 빌드 단계에서 lint로 막지 않는다(타입체크로 품질 확보).
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
