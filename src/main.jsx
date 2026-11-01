import { createRoot } from 'react-dom/client';
import '@fontsource-variable/geist';
import '@fontsource/geist-mono/500.css';
import './styles/global.scss';
import App from './App';

// 상세 페이지 ↔ 홈 이동 시 스크롤 위치는 직접 관리
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

createRoot(document.getElementById('root')).render(<App />);
