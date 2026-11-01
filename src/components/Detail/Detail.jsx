import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS, getAssets } from '../../data/details';
import { nav } from '../../hooks/useRoute';
import Art from '../Art/Art';
import s from './Detail.module.scss';

const isVideo = (u) => /\.(mp4|webm)(\?|$)/i.test(u);

/** 움직이는 섹션: 화면에 보일 때만 재생 */
function Clip({ src, label, onLoad }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    // 재생 전에는 애니메이션이 끝난 완성 장면을 보여줌 (첫 프레임은 요소가 아직 안 나온 빈 상태)
    const rest = () => { if (el.paused && el.duration) el.currentTime = Math.max(0, el.duration - 0.05); };
    el.addEventListener('loadedmetadata', rest);
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { if (el.paused) { el.currentTime = 0; el.play().catch(() => {}); } } else { el.pause(); rest(); }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => { io.disconnect(); el.removeEventListener('loadedmetadata', rest); };
  }, []);
  return <video ref={ref} src={src} aria-label={label} muted loop playsInline preload="auto" onLoadedMetadata={onLoad} />;
}

let t;
const refreshSoon = () => { clearTimeout(t); t = setTimeout(() => ScrollTrigger.refresh(), 150); };

/** 작업 상세: 상세페이지 전체 + 이벤트 배너 모음 */
export default function Detail({ id }) {
  const root = useRef(null);
  const idx = PROJECTS.findIndex((w) => w.id === id);
  const work = PROJECTS[idx];
  const { pages, banners } = getAssets(id);
  const [ratio, setRatio] = useState();
  const [lb, setLb] = useState(null);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    // 헤더의 blend 효과는 영상·큰 이미지 위에서 매 프레임 합성 비용이 커서 상세 페이지에서는 끔
    document.documentElement.dataset.view = 'detail';
    return () => { nav.fromDetail = true; delete document.documentElement.dataset.view; };
  }, [id]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const $ = gsap.utils.selector(root);
      gsap.from($('[data-in]'), { y: 40, opacity: 0, duration: 1.1, ease: 'power3.out', stagger: 0.09 });
    }, root);
    return () => ctx.revert();
  }, [id]);

  // 배너: 원본 비율을 먼저 읽은 뒤, 한 줄의 높이가 같아지도록 줄 단위로 배치
  const [ratios, setRatios] = useState(null);
  const [mob, setMob] = useState(() => window.matchMedia('(max-width: 800px)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 800px)');
    const on = () => setMob(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  const bannerKey = banners.join('|');
  useEffect(() => {
    let dead = false;
    setRatios(null);
    Promise.all(banners.map((u) => new Promise((res) => {
      const im = new Image();
      im.onload = () => res(im.naturalWidth / im.naturalHeight || 1);
      im.onerror = () => res(1);
      im.src = u;
    }))).then((r) => !dead && setRatios(r));
    return () => { dead = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bannerKey]);

  // 비슷한 비율끼리 묶어 한 줄에 배치 (정사각형·세로형은 3개, 가로로 긴 배너는 2개씩 / 모바일은 2개·1개)
  const rows = useMemo(() => {
    if (!ratios) return [];
    const out = [];
    let i = 0;
    while (i < ratios.length) {
      const wide = ratios[i] >= 1.6;
      const max = wide ? (mob ? 1 : 2) : (mob ? 2 : 3);
      const items = [];
      while (i < ratios.length && items.length < max && (ratios[i] >= 1.6) === wide) { items.push({ u: banners[i], r: ratios[i], i }); i += 1; }
      out.push({ items, w: items.length > 1 ? 1 : 1 / max });
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ratios, mob]);

  useLayoutEffect(() => {
    if (!rows.length) return undefined;
    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray('[data-b]');
      gsap.set(els, { y: 50, opacity: 0 });
      ScrollTrigger.batch(els, {
        start: 'top 94%',
        once: true,
        onEnter: (b) => gsap.to(b, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.08, overwrite: true }),
      });
    }, root);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [rows]);

  useEffect(() => {
    if (!lb) return;
    const key = (e) => e.key === 'Escape' && setLb(null);
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [lb]);

  if (!work) return <main className={s.page}><p className={s.nf}>없는 작업이에요. <a href="#work">← DETAIL & BANNER</a></p></main>;

  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  const no = String(idx + 1).padStart(2, '0');
  const hint = (name) => <span className={s.hint}>src/assets/works/{id}/<b>{name}</b> 에 이미지를 넣어주세요</span>;

  return (
    <main ref={root} className={s.page} key={id}>
      <section className={s.top}>
        <div className={s.info}>
          <a className={s.back} href="#work" data-in data-cursor="BACK">← DETAIL & BANNER</a>
          <span className={s.no} data-in>No. {no} / {String(PROJECTS.length).padStart(2, '0')}</span>
          <h1 data-in>{work.name}</h1>
          <dl data-in>
            <div><dt>분류</dt><dd>{work.category} · 이벤트 배너</dd></div>
            <div><dt>구성</dt><dd>상세페이지 {pages.length ? '1종' : '—'} · 배너 {banners.length ? `${banners.length}종` : '—'}</dd></div>
          </dl>
        </div>
        <div className={s.plate} data-in style={{ aspectRatio: ratio || undefined }}>
          <Art work={work} thumb onRatio={setRatio} />
        </div>
      </section>

      <section className={s.sec}>
        <h2 className={s.label} data-in><span>01</span>상세페이지</h2>
        <div className={s.pageCol}>
          {pages.length
            ? pages.map((u, i) => (isVideo(u) ? <Clip key={u} src={u} label={`${work.name} 상세페이지 ${i + 1}`} onLoad={refreshSoon} /> : <img key={u} src={u} alt={`${work.name} 상세페이지 ${i + 1}`} loading={i ? 'lazy' : undefined} decoding="async" onLoad={refreshSoon} />))
            : <div className={s.empty}>{hint('page.jpg')}</div>}
        </div>
      </section>

      <section className={s.sec}>
        <h2 className={s.label} data-in><span>02</span>이벤트 배너{banners.length ? <em>{banners.length}</em> : null}</h2>
        {banners.length ? (
          <div className={s.banners}>
            {rows.map((row, ri) => (
              <div key={ri} className={s.row} style={{ width: `${row.w * 100}%` }}>
                {row.items.map(({ u, r, i }) => (
                  <button key={u} type="button" className={s.banner} style={{ flex: `${r} 1 0`, aspectRatio: r }} data-b data-cursor="ZOOM" onClick={() => setLb(u)} aria-label={`${work.name} 배너 ${i + 1} 크게 보기`}>
                    <img src={u} alt={`${work.name} 배너 ${i + 1}`} decoding="async" />
                  </button>
                ))}
              </div>
            ))}
          </div>
        ) : <div className={s.empty}>{hint('banner-01.jpg')}</div>}
      </section>

      <nav className={s.pn}>
        <a href={`#/work/${prev.id}`} data-cursor="PREV"><small>← PREV</small><span>{prev.name}</span></a>
        <a className={s.all} href="#work">ALL WORKS</a>
        <a href={`#/work/${next.id}`} data-cursor="NEXT"><small>NEXT →</small><span>{next.name}</span></a>
      </nav>

      {lb && (
        <div className={s.lb} data-lenis-prevent onClick={() => setLb(null)} role="dialog" aria-modal="true">
          <img src={lb} alt="" />
          <button type="button" aria-label="닫기">✕</button>
        </div>
      )}
    </main>
  );
}
