import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 링크 공유 미리보기(og:image)는 절대 주소가 필요해요.
// 기본값은 배포 주소이고, 도메인을 바꾸면 환경변수 SITE_URL 로 지정하세요. (VERCEL_PROJECT_PRODUCTION_URL 은 실제 접속 주소와 달라서 쓰지 않아요)
const site = process.env.SITE_URL || 'https://de-portfolio-syzzny.vercel.app';

export default defineConfig({
  plugins: [react(), { name: 'site-url', transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', site) }],
  server: { port: 3000 },
});
