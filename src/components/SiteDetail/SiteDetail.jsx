import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITES } from '../../data/sites';
import { getSiteFiles } from '../../data/details';
import { nav } from '../../hooks/useRoute';
import Art from '../Art/Art';
import s from '../Detail/Detail.module.scss';
import x from './SiteDetail.module.scss';

/** 이미지 한 장 — 가로로 넓은 이미지는 한 줄을 다 쓰도록 비율을 읽어 표시 */
function Fig({ src, cap, tag, half }) {
  const [wide, setWide] = useState(false);
  return (
    <figure className={x.fig} data-wide={wide || undefined} data-c>
      <img src={src} alt={cap || ''} loading="lazy" decoding="async" draggable={false}
        onLoad={(e) => { const { naturalWidth: w, naturalHeight: h } = e.currentTarget; if (!half && h && w / h > 1.9) setWide(true); }} />
      {cap ? <figcaption><b>{tag}</b>{cap}</figcaption> : null}
    </figure>
  );
}

/** 웹사이트 작업 상세: 소개 + 디자인 포인트(+디자인 과정) + 기술 포인트(+반응형 화면) + 라이브 링크 */
export default function SiteDetail({ id }) {
  const root = useRef(null);
  const idx = SITES.findIndex((it) => it.work.id === id);
  const site = SITES[idx];

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.dataset.view = 'detail';
    return () => { nav.fromDetail = true; delete document.documentElement.dataset.view; };
  }, [id]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const $ = gsap.utils.selector(root);
      gsap.from($('[data-in]'), { y: 40, opacity: 0, duration: 1.1, ease: 'power3.out', stagger: 0.09 });
      gsap.set($('[data-c]'), { y: 40, opacity: 0 });
      ScrollTrigger.batch($('[data-c]'), {
        start: 'top 92%', once: true,
        onEnter: (b) => gsap.to(b, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.1, overwrite: true }),
      });
    }, root);
    return () => ctx.revert();
  }, [id]);

  if (!site) return <main className={s.page}><p className={s.nf}>없는 작업이에요. <a href="#websites">← WEBSITE</a></p></main>;

  const files = getSiteFiles(id);
  const pick = (list) => (list || []).map((e) => ({ ...e, src: files(e.img) })).filter((e) => e.src);
  const assets = { process: pick(site.process), mobile: pick(site.mobile) };
  const prev = SITES[(idx - 1 + SITES.length) % SITES.length];
  const next = SITES[(idx + 1) % SITES.length];
  const rows = (items) => items.map((it, i) => (
    <article key={it.t} className={x.row} data-c>
      <span className={x.n}>{String(i + 1).padStart(2, '0')}</span>
      <h3>{it.t}</h3>
      <p>{it.d}</p>
    </article>
  ));

  return (
    <main ref={root} className={s.page} key={id}>
      <section className={`${s.top} ${x.top}`}>
        <div className={s.info}>
          <a className={s.back} href="#websites" data-in data-cursor="BACK">← WEBSITE</a>
          <span className={s.no} data-in>No. {site.no} / {String(SITES.length).padStart(2, '0')}</span>
          <h1 data-in className={x.h1}>{site.title}</h1>
          <p className={x.desc} data-in>{site.desc}</p>
          <dl data-in>
            <div><dt>분류</dt><dd>웹사이트 · {site.sub}</dd></div>
            <div><dt>역할</dt><dd>{site.role}</dd></div>
            <div><dt>스택</dt><dd>{site.stack}</dd></div>
          </dl>
          {site.link ? <a className={x.live} href={site.link} target="_blank" rel="noreferrer" data-in data-cursor="OPEN">라이브 사이트 보기 ↗</a> : null}
        </div>
        <div className={`${s.plate} ${x.shot}`} data-in><Art work={site.work} thumb /></div>
      </section>

      <section className={`${x.band} ${x.dark}`}>
        <div className={x.split}>
          <div className={x.side}>
            <span className={x.k} data-in>01</span>
            <h2 data-in>Design</h2>
            <p data-in>무엇을, 왜 그렇게 디자인했는지</p>
          </div>
          <div className={x.list}>{rows(site.design)}</div>
        </div>
        {assets.process.length ? (
          <div className={x.gal}>
            <h4 className={x.gh} data-c>Process <small>디자인 과정</small></h4>
            <div className={x.grid}>{assets.process.map((a, i) => <Fig key={a.img} src={a.src} cap={a.cap} half={a.half} tag={String(i + 1).padStart(2, '0')} />)}</div>
          </div>
        ) : null}
      </section>

      <section className={`${x.band} ${x.light}`}>
        <div className={x.split}>
          <div className={x.side}>
            <span className={x.k} data-in>02</span>
            <h2 data-in>Tech</h2>
            <p data-in>어떻게 구현하고 관리했는지</p>
          </div>
          <div className={x.list}>{rows(site.tech)}</div>
        </div>
        {assets.mobile.length ? (
          <div className={x.gal}>
            <h4 className={x.gh} data-c>Responsive <small>모바일 · 태블릿</small></h4>
            <div className={`${x.grid} ${x.phones}`}>{assets.mobile.map((a, i) => <Fig key={a.img} src={a.src} cap={a.cap} tag={String(i + 1).padStart(2, '0')} />)}</div>
          </div>
        ) : null}
      </section>

      <nav className={s.pn}>
        <a href={`#/work/${prev.work.id}`} data-cursor="PREV"><small>← PREV</small><span>{prev.title}</span></a>
        <a className={s.all} href="#websites">ALL WEBSITES</a>
        <a href={`#/work/${next.work.id}`} data-cursor="NEXT"><small>NEXT →</small><span>{next.title}</span></a>
      </nav>
    </main>
  );
}
