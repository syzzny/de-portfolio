import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS as PLATES } from '../../data/details';
import { nav } from '../../hooks/useRoute';
import Art from '../Art/Art';
import s from './Room01.module.scss';

/** Detail & Banner: 스크롤 등장 + 이미지 패럴랙스 */
export default function Room01() {
  const root = useRef(null);
  // 이미지 원본 비율대로 프레임을 잡아 위아래가 잘리지 않게 함 (이미지 로드 전엔 기본 비율)
  const [ratios, setRatios] = useState({});

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const $ = gsap.utils.selector(root);
      gsap.set($('[data-plate]'), { y: 80, opacity: 0 });
      ScrollTrigger.batch($('[data-plate]'), {
        start: 'top 88%',
        onEnter: (batch) => gsap.to(batch, { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', stagger: 0.1, overwrite: true }),
      });
      // 이미지를 자르지 않고 프레임 전체가 살짝 어긋나며 움직이는 패럴랙스
      $('[data-par]').forEach((el, i) => {
        gsap.fromTo(el, { y: i % 2 ? 22 : -22 }, { y: i % 2 ? -22 : 22, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className={s.room} id="work">
      <div className={s.head}>
        <span className={s.no}>01 — DETAIL & BANNER</span>
        <h2>상세페이지 &amp;<br />광고 배너</h2>
        <p>6개 브랜드, 상세페이지 6종과 웹·모바일·인스타 배너 36종.<br />제품이 돋보이는 순간부터 브랜드의 분위기까지 세심하게 설계했어요.</p>
      </div>
      <div className={s.grid}>
        {PLATES.map((w, i) => (
          <article key={w.id} className={s.plate} data-plate data-i={i}>
            <a className={s.link} href={`#/work/${w.id}`} onClick={() => { nav.y = window.scrollY; }} aria-label={`${w.name} 상세 보기`}>
              <div className={s.frame} data-par data-cursor="VIEW" style={{ aspectRatio: ratios[w.id] || undefined }}><Art work={w} thumb onRatio={(v) => setRatios((p) => (p[w.id] === v ? p : { ...p, [w.id]: v }))} /></div>
            </a>
            <p className={s.cap}><b>No. {String(i + 1).padStart(2, '0')}</b><span>{w.name}</span><em>상세페이지 · 배너 보기 →</em></p>
          </article>
        ))}
      </div>
    </section>
  );
}
