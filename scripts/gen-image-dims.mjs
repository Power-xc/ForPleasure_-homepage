#!/usr/bin/env node
// [PROD] public/images의 PNG 치수를 읽어 src/shared/config/imageDims.ts를 갱신한다.
// 의존성 없이 PNG 헤더(IHDR)에서 width/height를 직접 파싱한다.
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dir = path.join(root, "public", "images");
const out = path.join(root, "src", "shared", "config", "imageDims.ts");

/** PNG 파일의 IHDR 청크에서 width/height를 읽는다. */
function pngSize(file) {
  const buf = fs.readFileSync(file);
  // PNG 시그니처(8바이트) + 길이(4) + "IHDR"(4) 다음에 width(4), height(4)
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
}

const files = fs.readdirSync(dir).filter((f) => f.endsWith(".png")).sort();
const lines = files.map((f) => {
  const { w, h } = pngSize(path.join(dir, f));
  return `  "/images/${f}": { w: ${w}, h: ${h} },`;
});

const content =
  "// [PROD] 이미지 원본 픽셀 치수 맵 — next/image의 width/height에 사용(CLS 방지).\n" +
  "// 자동 생성됨. 이미지 교체 시 'node scripts/gen-image-dims.mjs'로 갱신.\n" +
  "export const IMAGE_DIMS: Record<string, { w: number; h: number }> = {\n" +
  lines.join("\n") +
  "\n};\n";

fs.writeFileSync(out, content);
console.log(`imageDims.ts 갱신: ${files.length}개`);
