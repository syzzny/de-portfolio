import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WORKS } from '../../data/works';
import Art from '../Art/Art';
import s from './Hero.module.scss';

/** x,y: 중심 기준 vw 오프셋 / w,h: vw / d: 깊이(1에 가까울수록 카메라에 가까움) */
const ITEMS = [
  { work: WORKS.lumo, x: 0, y: 0, w: 22.2, h: 32, d: 1, main: true },
  { work: WORKS.dewfield, x: -28, y: -6, w: 31, h: 19.8, d: 0.55 },
  { work: WORKS.onkyeol, x: -37, y: 12.5, w: 14.5, h: 9.1, d: 0.4 },
  { work: WORKS.noura, x: 24, y: -2, w: 14.5, h: 20.6, d: 0.6 },
  { work: WORKS.breeze, x: 41, y: 4, w: 9.2, h: 12.6, d: 0.5 },
];

/**
 * 입장 → 마우스 패럴랙스 → 스크롤 시 카메라가 벽 속으로 들어가 LUMO가 화면을 채움 → Room 01
 * DOM 구조  [data-item](스크롤) > [data-tilt](마우스) > [data-art](입장)
 */
export default function Hero() {
  const stage = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.config({ force3D: false });
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let onMove;

    const ctx = gsap.context(() => {
      const $ = gsap.utils.selector(stage);
      const items = $('[data-item]');
      const tilts = $('[data-tilt]');
      const arts = $('[data-art]');
      const labels = $('[data-label]');
      const lines = $('[data-line]');
      const fades = $('[data-fade]');
      const main = items[0];
      const others = items.slice(1);
      const el = stage.current;
      // 화면 비율이 달라도 구도가 잘리지 않도록 폭/높이 중 작은 쪽 기준 단위(u). CSS의 --u 와 동일
      const mob = window.innerWidth <= 800;
      const u = () => (mob ? Math.min(window.innerWidth / 41.67, window.innerHeight / 62.5) : Math.min(window.innerWidth / 100, window.innerHeight / 62.5));
      const OY = mob ? 35 : 42;

      gsap.set(items, { xPercent: -50, yPercent: -50 });

      // 1) 입장
      gsap.timeline({ defaults: { ease: 'power4.out' } })
        .from(lines, { yPercent: 110, duration: 1.3, stagger: 0.12 }, 0.1)
        .from(arts, { y: 70, opacity: 0, scale: 0.94, duration: 1.4, stagger: { each: 0.09, from: 'center' } }, 0.2)
        .from(labels, { opacity: 0, y: 8, duration: 0.8, stagger: 0.06 }, 0.9)
        .from(fades, { opacity: 0, y: 14, duration: 1, stagger: 0.1 }, 0.8);
      if (reduce) return;

      // 2) 마우스 패럴랙스 — 깊이가 클수록 많이 움직임
      const movers = tilts.map((t, i) => ({
        d: ITEMS[i].d,
        x: gsap.quickTo(t, 'x', { duration: 0.9, ease: 'power3' }),
        y: gsap.quickTo(t, 'y', { duration: 0.9, ease: 'power3' }),
      }));
      onMove = (e) => {
        const nx = e.clientX / innerWidth - 0.5;
        const ny = e.clientY / innerHeight - 0.5;
        movers.forEach((m) => { m.x(-nx * 34 * m.d); m.y(-ny * 22 * m.d); });
      };
      window.addEventListener('mousemove', onMove);

      // 3) 스크롤 dolly
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: el, start: 'top top', end: '+=320%', pin: true, scrub: 0.8, anticipatePin: 1, invalidateOnRefresh: true,
          // 가운데 카드가 충분히 커지면 원본 해상도 이미지로 교체
          onUpdate: (self) => { if (self.progress > 0.4) el.setAttribute('data-hi', ''); else el.removeAttribute('data-hi'); } },
      });
      others.forEach((node, i) => {
        const it = ITEMS[i + 1];
        tl.to(node, {
          x: () => it.x * u() * (1 + it.d * 2.2),
          y: () => it.y * u() * (1 + it.d * 2.2),
          width: () => it.w * u() * (1 + it.d * 2.4), height: () => it.h * u() * (1 + it.d * 2.4), ease: 'power1.in', duration: 0.62,
        }, 0).to(node, { opacity: 0, duration: 0.2, ease: 'power1.in' }, 0.42);
      });
      tl.to(main, {
        y: () => innerHeight / 2 - OY * u(),
        // scale 대신 width/height 로 키워 비트맵이 확대되지 않고 매 프레임 원본 해상도로 다시 그려지게 함(선명도)
        width: () => ITEMS[0].w * u() * Math.max(innerWidth / (ITEMS[0].w * u()), innerHeight / (ITEMS[0].h * u())) * 1.04,
        height: () => ITEMS[0].h * u() * Math.max(innerWidth / (ITEMS[0].w * u()), innerHeight / (ITEMS[0].h * u())) * 1.04,
        ease: 'power2.inOut', duration: 0.72,
      }, 0.26)
        .fromTo(labels, { opacity: 1 }, { opacity: 0, duration: 0.12, immediateRender: false }, 0)
        .fromTo(lines, { yPercent: 0, opacity: 1 }, { yPercent: -60, opacity: 0, duration: 0.3, stagger: 0.04, ease: 'power2.in', immediateRender: false }, 0)
        .fromTo(fades, { opacity: 1, y: 0 }, { opacity: 0, y: -30, duration: 0.25, immediateRender: false }, 0)
        .to('[data-endwall]', { opacity: 1, duration: 0.18 }, 0.96)
        .to(main, { opacity: 0, duration: 0.18 }, 0.96)
        ;
    }, stage);

    return () => { if (onMove) window.removeEventListener('mousemove', onMove); ctx.revert(); };
  }, []);

  return (
    <section className={s.hero} id="top">
      <div ref={stage} className={s.stage}>
        <div className={s.wall} />
        <p className={s.meta} data-fade>WEB DESIGNER &amp; PUBLISHER</p>
        <h1 className={s.title} aria-label="디자인을 이해하고, 웹으로 완성합니다.">
          <span className={s.mask}><span data-line>디자인을 이해하고,</span></span>
          <span className={s.mask}><span data-line>웹으로 완성합니다.</span></span>
        </h1>
        <p className={s.intro} data-fade>
          상세페이지와 광고 배너,<br />웹사이트 디자인 그리고 퍼블리싱까지.<br />화면이 완성되는 끝까지 만듭니다.
        </p>

        {ITEMS.map((it, i) => (
          <div
            key={it.work.id}
            data-item
            data-main={i === 0 ? '' : undefined}
            data-cursor="VIEW"
            className={s.item}
            style={{ '--x': it.x, '--y': it.y, '--w': it.w, '--h': it.h, zIndex: Math.round(it.d * 10) }}
          >
            <div data-tilt className={s.tilt}>
              <div data-art className={s.art}><Art work={it.work} thumb hi={i === 0} /></div>
              <p data-label className={s.label}><b>No. {it.work.no}</b><span>{it.work.name}</span><em>{it.work.category}</em></p>
            </div>
          </div>
        ))}

        <div className={s.scroll} data-fade><i />SCROLL</div>
        <div className={s.endwall} data-endwall />
      </div>
    </section>
  );
}
