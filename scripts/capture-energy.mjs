// 에너지전환진흥원 실제 배포 화면을 고해상도(2x)로 캡처해서
// src/assets/sites/energy/ 에 저장합니다.
//   npm i --no-save playwright
//   node scripts/capture-energy.mjs
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const BASE = process.env.SITE || 'https://energy-agency.vercel.app';
const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../src/assets/sites/energy');
mkdirSync(OUT, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function open(page, route) {
  await page.goto(BASE + route, { waitUntil: 'networkidle' });
  await sleep(1200);
  // 지연 로딩 이미지 · 스크롤 등장 요소가 다 그려지도록 끝까지 한 번 내렸다가 올린다
  await page.evaluate(async () => {
    const step = Math.max(300, innerHeight * 0.8);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 180));
    }
    scrollTo(0, 0);
  });
  await sleep(900);
}

const shot = (page, name, opts = {}) =>
  page.screenshot({ path: path.join(OUT, name), type: 'jpeg', quality: 90, ...opts });

const browser = await chromium.launch({ channel: 'chrome' }).catch(() => chromium.launch());

// ── 데스크톱 1440 ──
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();

  await open(page, '/');
  await shot(page, 'process-01.jpg', { fullPage: true });
  console.log('process-01 메인');

  await page.evaluate(() => scrollTo(0, 0));
  await page.hover('[data-gnb-link="business"]');
  await sleep(900);
  await shot(page, 'process-02.jpg', { clip: { x: 0, y: 0, width: 1440, height: 640 } });
  console.log('process-02 GNB 메가메뉴');

  await open(page, '/business/solar');
  await shot(page, 'process-03.jpg', { fullPage: true });
  console.log('process-03 사업 안내');

  await open(page, '/participation/petition');
  await shot(page, 'process-04.jpg', { fullPage: true });
  console.log('process-04 온라인 민원 신청');
  await ctx.close();
}

// ── 모바일 390 ──
{
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true,
  });
  const page = await ctx.newPage();

  await open(page, '/');
  await shot(page, 'mobile-01.jpg', { fullPage: true });
  console.log('mobile-01 메인');

  await open(page, '/business/solar');
  await shot(page, 'mobile-02.jpg', { fullPage: true });
  console.log('mobile-02 사업 안내');
  await ctx.close();
}

await browser.close();
console.log('완료 →', OUT);
