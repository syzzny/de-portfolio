import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import s from './About.module.scss';

// 소개 문구는 짧게: 두 줄 안에서 끝나는 한 문장
const STATEMENT = ['보기 좋은 화면보다,', '끝까지 동작하는 화면을.'];

const STATS = [
  { n: 6, label: 'Brands' },
  { n: 36, label: 'Banners' },
  { n: 5, label: 'Websites' },
  { n: 11, label: 'Projects' },
];

const PROFILE = [
  ['NAME', 'Yejin'],
  ['ROLE', 'Web Designer & Publisher'],
  ['BASED', 'Busan, Korea'],
  ['FOCUS', '상세페이지 · 광고 배너 · 웹사이트'],
  ['STATUS', 'Available for work'],
];

const PRINCIPLES = [
  { no: '01', title: '처음부터 끝까지', text: '컨셉을 잡는 단계부터 구현, 검수, 배포까지 한 흐름으로 맡아요. 중간에 의도가 끊기지 않아서 결과물이 처음 그린 모습과 같아요.' },
  { no: '02', title: '구현을 아는 디자인', text: '프론트엔드 개발 경험이 있어서 만들 수 있는 화면을 그려요. 시안과 실제 화면이 어긋나는 일을 줄여요.' },
  { no: '03', title: '디테일은 확인하며', text: '정렬, 여백, 대비를 눈대중에 맡기지 않고 하나씩 확인하며 맞춰요. 보이지 않는 곳까지 같은 기준으로 다듬어요.' },
];

const SKILLS = [
  { no: '01', title: 'Design', items: ['상세페이지 · 광고 배너', '웹 UI · 디자인 시스템', 'Figma'] },
  { no: '02', title: 'Publishing', items: ['HTML · CSS · SCSS', 'JavaScript · TypeScript', 'React'] },
  { no: '03', title: 'Delivery', items: ['브리프 · 컨셉', '시안 · 구현', '검수 · 배포'] },
];

const EXPERIENCE = [
  { period: '2026.04 — 2026.07', name: '레드버튼 웹', role: '기획 · 디자인', tag: 'Company' },
  { period: '2025.12 — 2026.02', name: '블루세일', role: '기획 · 디자인 · 퍼블리싱', tag: 'Company' },
  { period: '2025.09 — 2026.06', name: '레드버튼 앱', role: '기획 · 디자인 · 퍼블리싱', tag: 'Company' },
  { period: '2025.09 — 2026.06', name: '블루버튼 앱', role: '기획 · 디자인', tag: 'Company' },
  { period: 'Personal', name: 'Dewfield · 온결피부과 · 에너지전환진흥원 · Trippio · LineOn MES', role: '디자인 · 퍼블리싱', tag: 'Website' },
  { period: 'Personal', name: 'BREEZ · SOLAE · Pawsy · NOURA · LUMO · 포근베베', role: '상세페이지 · 광고 배너', tag: 'Brand' },
];

/** About: 문장 스크럽 → 숫자 카운트 → 프로필 & 원칙 → 역량 → 경력 */
export default function About() {
  const root = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const $ = gsap.utils.selector(root);
      gsap.fromTo($('[data-word]'), { opacity: 0.14 }, { opacity: 1, ease: 'none', stagger: 0.12, scrollTrigger: { trigger: $('[data-statement]')[0], start: 'top 80%', end: 'bottom 45%', scrub: true } });

      $('[data-count]').forEach((el) => {
        const end = Number(el.dataset.count);
        const o = { v: 0 };
        gsap.to(o, { v: end, duration: 1.6, ease: 'power3.out', onUpdate: () => { el.textContent = String(Math.round(o.v)).padStart(2, '0'); }, scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
      });

      ['[data-stat]', '[data-profile]', '[data-principle]', '[data-col]', '[data-exp]'].forEach((sel) => {
        const els = $(sel);
        if (!els.length) return;
        gsap.from(els, { y: 40, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.1, scrollTrigger: { trigger: els[0], start: 'top 88%' } });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className={s.about} id="about">
      <span className={s.no}>ABOUT</span>
      <p className={s.statement} data-statement>
        {STATEMENT.map((line, li) => (
          <span key={li} className={s.line}>
            {line.split(' ').map((w, i) => <span key={i} data-word>{w}{' '}</span>)}
          </span>
        ))}
      </p>

      <div className={s.stats}>
        {STATS.map((st) => (
          <div key={st.label} className={s.stat} data-stat>
            <strong data-count={st.n}>00</strong>
            <span>{st.label}</span>
          </div>
        ))}
      </div>

      <div className={s.profileRow}>
        <dl className={s.profile} data-profile>
          {PROFILE.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
        </dl>
        <div className={s.principles}>
          {PRINCIPLES.map((p) => (
            <article key={p.no} className={s.principle} data-principle>
              <span>{p.no}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </article>
          ))}
        </div>
      </div>

      <div className={s.cols}>
        {SKILLS.map((c) => (
          <div key={c.no} className={s.col} data-col>
            <span>{c.no}</span>
            <h3>{c.title}</h3>
            <ul>{c.items.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
        ))}
      </div>

      <div className={s.exp}>
        <h3 className={s.expTitle}>Experience</h3>
        <ul className={s.list}>
          {EXPERIENCE.map((e) => (
            <li key={e.name} className={s.row} data-exp>
              <span className={s.period}>{e.period}</span>
              <strong>{e.name}</strong>
              <span className={s.role}>{e.role}</span>
              <em>{e.tag}</em>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
