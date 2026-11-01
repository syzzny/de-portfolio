import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import s from './Contact.module.scss';

/** Contact: 다크 전환 + 거대 헤드라인 마스크 리빌 */
export default function Contact() {
  const root = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const $ = gsap.utils.selector(root);
      gsap.from($('[data-line]'), { yPercent: 110, duration: 1.3, ease: 'power4.out', stagger: 0.12, scrollTrigger: { trigger: root.current, start: 'top 55%' } });
      gsap.from($('[data-in]'), { y: 24, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.1, delay: 0.3, scrollTrigger: { trigger: root.current, start: 'top 55%' } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className={s.contact} id="contact">
      <h2 className={s.title} aria-label="Contact">
        <span className={s.mask}><span data-line>Contact</span></span>
      </h2>
      <div className={s.row} data-in>
        <a className={s.mail} href="mailto:son115502@gmail.com" data-cursor="MAIL">son115502@gmail.com</a>
      </div>
      <footer className={s.footer} data-in>
        <span>© 2026 YEJIN</span>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </section>
  );
}
