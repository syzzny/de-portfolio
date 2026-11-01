import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import s from './Cursor.module.scss';

/** [data-cursor="VIEW"] 요소 위에서 커서가 라벨 원으로 커집니다. */
export default function Cursor() {
  const el = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const node = el.current;
    const xTo = gsap.quickTo(node, 'x', { duration: 0.35, ease: 'power3' });
    const yTo = gsap.quickTo(node, 'y', { duration: 0.35, ease: 'power3' });
    gsap.set(node, { xPercent: -50, yPercent: -50 });

    const move = (e) => { gsap.to(node, { opacity: 1, duration: 0.3, overwrite: 'auto' }); xTo(e.clientX); yTo(e.clientY); };
    const over = (e) => {
      const t = e.target.closest('[data-cursor]');
      if (t) {
        label.current.textContent = t.dataset.cursor;
        gsap.to(node, { width: 92, height: 92, duration: 0.5, ease: 'power3.out' });
        gsap.to(label.current, { opacity: 1, duration: 0.3 });
      } else {
        gsap.to(node, { width: 12, height: 12, duration: 0.5, ease: 'power3.out' });
        gsap.to(label.current, { opacity: 0, duration: 0.15 });
      }
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseover', over); };
  }, []);

  return <div ref={el} className={s.cursor}><span ref={label} /></div>;
}
