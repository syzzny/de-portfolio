import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 링크 공유 미리보기(og:image)는 절대 주소가 필요해요.
// Vercel 배포 시 자동으로 운영 도메인이 들어가고, 직접 지정하려면 환경변수 SITE_URL 을 사용하세요.
const site = process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '');

export default defineConfig({
  plugins: [react(), { name: 'site-url', transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', site) }],
  server: { port: 3000 },
});
