/** @type {import('next').NextConfig} */
// [ENG] 정적 랜딩 위주 — 기본 설정 유지, 불필요한 실험 기능 미사용 (의존성/공격표면 최소화)
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
