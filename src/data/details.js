import { WORKS } from './works';

/** Room 01 / 상세 페이지에 나오는 프로젝트 순서 */
export const PROJECTS = [WORKS.breeze, WORKS.solae, WORKS.pawsy, WORKS.noura, WORKS.lumo, WORKS.pogeun];

/**
 * 상세 페이지 이미지는 src/assets/works/<id>/ 폴더에 넣으면 자동으로 나타납니다.
 *   page.jpg (또는 page-01.jpg, page-02.jpg … 길면 나눠서)  → 상세페이지 전체
 *   움직이는 섹션은 page-06.mp4 처럼 영상으로 (순서대로 이어 붙여 보여줌)
 *   banner-01.jpg, banner-02.jpg …                           → 이벤트 배너 (개수 제한 없음)
 * <id> = breeze · solae · pawsy · noura · lumo · pogeun
 */
const files = import.meta.glob('../assets/works/*/*.{jpg,jpeg,png,webp,mp4,webm}', { eager: true, query: '?url', import: 'default' });
const natural = (a, b) => a.name.localeCompare(b.name, undefined, { numeric: true });

export function getAssets(id) {
  const prefix = `../assets/works/${id}/`;
  const list = Object.keys(files)
    .filter((k) => k.startsWith(prefix))
    .map((k) => ({ name: k.slice(prefix.length), url: files[k] }))
    .sort(natural);
  const parts = list.filter((f) => /^page/i.test(f.name));
  // page-01.jpg, page-01.mp4 … 번호가 같으면 영상이 이미지를 대신함 (영상 넣기 전에는 이미지가 임시로 보임)
  const byNo = new Map();
  parts.forEach((f) => {
    const m = f.name.match(/^page-(\d+)/i);
    if (!m) return;
    const no = Number(m[1]);
    const video = /\.(mp4|webm)$/i.test(f.name);
    const cur = byNo.get(no);
    if (!cur || (video && !cur.video)) byNo.set(no, { url: f.url, video });
  });
  // 번호 없는 page.jpg 는 번호 조각이 하나도 없을 때만 사용 (번호 없는 영상은 무시)
  const pages = byNo.size
    ? [...byNo.entries()].sort((x, y) => x[0] - y[0]).map(([, v]) => v.url)
    : parts.filter((f) => !/\.(mp4|webm)$/i.test(f.name)).map((f) => f.url);
  return {
    pages,
    banners: list.filter((f) => /^banner/i.test(f.name)).map((f) => f.url),
    mobile: list.filter((f) => /^mobile/i.test(f.name)).map((f) => f.url),
  };
}

/**
 * 웹사이트 상세의 "디자인 과정" · "반응형" 이미지는 src/assets/sites/<id>/ 폴더에 넣으면 자동으로 나타납니다.
 *   data/sites.js 의 process / mobile 에 { img: '파일명', cap: '설명' } 으로 적은 것만 보입니다 (확장자 제외, 같은 이름이면 jpg 우선)
 * <id> = dewfield · onkyeol · energy · trippio · lineon  (설명 문구는 data/sites.js 의 process / mobile)
 */
// 같은 이름의 예전 파일(png)과 안 쓰는 파일은 번들에서 제외
const siteFiles = import.meta.glob([
  '../assets/sites/*/*.{jpg,jpeg,png,webp}',
  '!../assets/sites/dewfield/process-0[23].png',
  '!../assets/sites/energy/*.png',
  '!../assets/sites/energy/mobile-02.jpg',
], { eager: true, query: '?url', import: 'default' });

export function getSiteFiles(id) {
  const prefix = `../assets/sites/${id}/`;
  const rank = { jpg: 0, jpeg: 0, webp: 1, png: 2 }; // 같은 이름이면 jpg > webp > png
  const map = new Map();
  Object.keys(siteFiles).filter((k) => k.startsWith(prefix)).forEach((k) => {
    const file = k.slice(prefix.length);
    const base = file.replace(/\.[^.]+$/, '');
    const r = rank[file.split('.').pop().toLowerCase()] ?? 9;
    const cur = map.get(base);
    if (!cur || r < cur.r) map.set(base, { r, url: siteFiles[k] });
  });
  return (base) => map.get(base)?.url;
}
