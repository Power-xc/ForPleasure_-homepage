// [PROD] 앱 스크린샷 프레임 — next/image로 자동 최적화(WebP/AVIF·반응형)한다.
// width/height는 원본 치수 맵에서 가져와 레이아웃 시프트(CLS)를 막는다.
import Image from "next/image";
import { IMAGE_DIMS } from "@/shared/config/imageDims";

type Props = {
  src: string;
  alt: string;
  className?: string;
  /** 렌더 폭 힌트 — next/image가 적절한 해상도를 고르는 데 사용 */
  sizes?: string;
  /** 히어로 등 최초 화면 이미지에만 우선 로드 */
  priority?: boolean;
};

export function PhoneShot({ src, alt, className = "", sizes = "(max-width: 768px) 90vw, 320px", priority = false }: Props) {
  const dim = IMAGE_DIMS[src] ?? { w: 720, h: 1280 };
  return (
    <div className={`overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-lg ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={dim.w}
        height={dim.h}
        sizes={sizes}
        priority={priority}
        className="block h-auto w-full"
      />
    </div>
  );
}
