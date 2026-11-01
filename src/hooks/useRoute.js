import { useEffect, useState } from 'react';

/** 라우터 라이브러리 없이 #/work/<id> 해시로 페이지 전환 (정적 호스팅에서도 새로고침 OK) */
export const nav = { y: null, fromDetail: false };

const parse = (hash) => {
  const m = hash.match(/^#\/work\/([\w-]+)/);
  return m ? { name: 'work', id: m[1] } : { name: 'home' };
};

export default function useRoute() {
  const [route, setRoute] = useState(() => parse(window.location.hash));
  useEffect(() => {
    const on = () => setRoute(parse(window.location.hash));
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return route;
}
