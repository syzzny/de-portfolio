// public/images/works 의 원본(.jpg/.png)마다 글자가 선명한 축소본(-thumb)을 만듭니다.
// 사용: npm i -D sharp  →  npm run thumbs   (이미지를 새로 넣거나 바꿀 때마다 실행)
import { readdirSync } from 'node:fs';
import { join, extname, basename } from 'node:path';
import sharp from 'sharp';

const dir = new URL('../public/images/works/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const MAIN = new Set(['lumo-plate']); // 스크롤로 크게 확대되는 카드는 조금 더 크게
for (const f of readdirSync(dir)) {
  const ext = extname(f).toLowerCase();
  const name = basename(f, extname(f));
  if (!['.jpg', '.jpeg', '.png'].includes(ext) || name.endsWith('-thumb')) continue;
  const width = MAIN.has(name) ? 1400 : 1200;
  await sharp(join(dir, f)).resize({ width, withoutEnlargement: true, kernel: 'lanczos3' }).sharpen({ sigma: 0.6, m1: 0.8 })
    .jpeg({ quality: 90, mozjpeg: true }).toFile(join(dir, `${name}-thumb.jpg`));
  console.log('thumb', name);
}
