import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITES } from '../../data/sites';
import { nav } from '../../hooks/useRoute';
import Art from '../Art/Art';
import s from './Room02.module.scss';

/** Website: 웹사이트 3종 — 프레임이 스크롤에 맞춰 열리는 클립 리빌 + 안쪽 이미지 줌아웃 */
export default function Room02() {
  const root = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const $ = gsap.utils.selector(root);
      $('[data-site]').forEach((site) => {
        const frame = site.querySelector('[data-frame]');
        const inner = site.querySelector('[data-inner]');
        const info = site.querySelectorAll('[data-info]');
        gsap.fromTo(frame, { clipPath: 'inset(14% 14% 14% 14%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { trigger: frame, start: 'top 92%', end: 'top 30%', scrub: true } });
        gsap.fromTo(inner, { scale: 1.18 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: frame, start: 'top 92%', end: 'top 30%', scrub: true } });
        gsap.from(info, { y: 40, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.08, scrollTrigger: { trigger: site.querySelector('[data-meta]'), start: 'top 88%' } });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className={s.room} id="websites">
      <div className={s.head}>
        <span className={s.no}>02 — WEBSITE</span>
        <h2>웹사이트<br />디자인 &amp; 퍼블리싱</h2>
        <p>디자인한 화면을 직접 구현해서 배포까지.<br />시안과 결과물이 어긋나지 않게 끝까지 맡았어요.</p>
      </div>
      {SITES.map((it) => (
        <article key={it.work.id} className={s.site} data-site>
          <a className={s.frame} href={`#/work/${it.work.id}`} onClick={() => { nav.y = window.scrollY; }} aria-label={`${it.title} 상세 보기`} data-frame data-cursor="VIEW"><div className={s.inner} data-inner><Art work={it.work} thumb /></div></a>
          <div className={s.meta} data-meta>
            <div data-info><span className={s.idx}>No. {it.no}</span><h3><a href={`#/work/${it.work.id}`} onClick={() => { nav.y = window.scrollY; }}>{it.title}</a></h3><em>{it.sub}</em><a className={s.more} href={`#/work/${it.work.id}`} onClick={() => { nav.y = window.scrollY; }}>상세 보기 →</a></div>
            <p data-info className={s.desc}>{it.desc}</p>
            <dl data-info className={s.facts}>
              <div><dt>ROLE</dt><dd>{it.role}</dd></div>
              <div><dt>STACK</dt><dd>{it.stack}</dd></div>
            </dl>
          </div>
        </article>
      ))}
    </section>
  );
}
