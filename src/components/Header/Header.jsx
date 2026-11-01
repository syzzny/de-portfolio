import { nav } from '../../hooks/useRoute';
import s from './Header.module.scss';

export default function Header() {
  return (
    <header className={s.header} onClick={(e) => e.target.closest('a') && (nav.y = null)}>
      <a className={s.logo} href="#top">YEJIN</a>
      <nav className={s.nav}>
        <a href="#work">Work</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}
