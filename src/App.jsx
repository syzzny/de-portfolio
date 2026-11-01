import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './components/Header/Header';
import Cursor from './components/Cursor/Cursor';
import Hero from './components/Hero/Hero';
import Room01 from './components/Room/Room01';
import Room02 from './components/Room/Room02';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Detail from './components/Detail/Detail';
import SiteDetail from './components/SiteDetail/SiteDetail';
import { SITE_IDS } from './data/sites';
import useSmoothScroll from './hooks/useSmoothScroll';
import useRoute, { nav } from './hooks/useRoute';

function Home() {
  // 상세 페이지에서 돌아오면 보던 위치(또는 누른 메뉴 위치)로 복원
  useEffect(() => {
    if (!nav.fromDetail) return;
    nav.fromDetail = false;
    const y = nav.y;
    nav.y = null;
    let r2;
    const r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        if (y != null) return window.scrollTo(0, y);
        const el = document.getElementById(window.location.hash.slice(1));
        window.scrollTo(0, el ? el.getBoundingClientRect().top + window.scrollY : 0);
      });
    });
    return () => { cancelAnimationFrame(r1); cancelAnimationFrame(r2); };
  }, []);
  return (
    <main>
      <Hero />
      <Room01 />
      <Room02 />
      <About />
      <Contact />
    </main>
  );
}

export default function App() {
  useSmoothScroll();
  const route = useRoute();
  return (
    <>
      <Header />
      <Cursor />
      {route.name === 'work' ? (SITE_IDS.includes(route.id) ? <SiteDetail id={route.id} /> : <Detail id={route.id} />) : <Home />}
    </>
  );
}
