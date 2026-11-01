# YEJIN Portfolio — React + Vite + SCSS Module

```
npm install
npm run dev      # http://localhost:3000
npm run build
```

## 구조
- `src/data/works.js` — 작품 데이터 (이미지 경로·플레이스홀더 색)
- `src/components/Hero` — 입장 → 마우스 패럴랙스 → 스크롤 dolly (GSAP ScrollTrigger, `useLayoutEffect` + `gsap.context`)
- `src/components/Room` — Room 01 (스크롤 등장 + 패럴랙스)
- `src/components/{Header,Cursor,Art}` — 헤더, VIEW 커서, 작품 카드(이미지 없으면 플레이스홀더)
- `src/hooks/useSmoothScroll.js` — Lenis ↔ ScrollTrigger 동기화
- 컴포넌트마다 `*.module.scss`, 공통 변수는 `styles/global.scss`, 반응형 믹스인은 `styles/_mixins.scss`
