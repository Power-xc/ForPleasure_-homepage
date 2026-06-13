/** @type {import('next').NextConfig} */
// [ENG] 정적 랜딩 위주 — 기본 설정 유지, 불필요한 실험 기능 미사용 (의존성/공격표면 최소화)
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  // [ENG] 별도 ESLint 설정을 두지 않았으므로 빌드 단계에서 lint로 막지 않는다(타입체크로 품질 확보).
  eslint: { ignoreDuringBuilds: true },
  // [ENG] 정적 export 시 Next.js 이미지 최적화 서버(/_next/image)가 없으므로 비활성화
  images: { unoptimized: true },
};

export default nextConfig;
