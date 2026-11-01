import { WORKS } from './works';

/**
 * 웹사이트 작업 목록 (WEBSITE 섹션 + 상세 페이지 공통)
 * link   : 배포 주소 — 비워두면 "라이브 사이트" 버튼이 나오지 않아요.
 * design : 디자인 포인트  [{ t: 제목, d: 설명 }]
 * tech   : 기술 포인트    [{ t: 제목, d: 설명 }]
 * process : 디자인 과정 [{ img: '파일명(확장자 제외)', cap: '설명' }] — src/assets/sites/<id>/ 의 이미지와 1:1 매칭
 * mobile  : 반응형 · 기기 화면 [{ img: 'mobile-01', cap: '설명' }] — 같은 폴더 이미지와 1:1 매칭
 * <id> = dewfield · onkyeol · energy · trippio · lineon
 */
export const SITES = [
  {
    work: WORKS.dewfield, no: '01', title: 'Dewfield', sub: '스킨케어 쇼핑몰',
    desc: '에디토리얼 럭셔리 방향의 스킨케어 쇼핑몰. 메인과 상품 상세, 모바일까지 디자인하고 직접 구현했어요.',
    role: 'Design · Publishing', stack: 'React · HTML5 · SCSS · JavaScript · Git · Vercel', link: 'https://dewfield.vercel.app',
    design: [
      { t: '에디토리얼 럭셔리', d: '큼직한 세리프 타이포와 여백, 매거진 같은 격자 레이아웃으로 화려하면서도 브랜드 이미지에 충실한 고급스러움을 만들었어요.' },
      { t: '차분한 컬러 톤', d: '짙은 그린과 크림을 중심으로, 제품 사진이 가장 돋보이도록 색을 절제했어요.' },
      { t: '메인부터 상세까지 한 흐름', d: '메인 · 상품 상세 · 모바일을 하나의 시스템으로 설계해 어느 화면에서도 같은 브랜드로 읽히게 했어요.' },
    ],
    tech: [
      { t: '컴포넌트 기반 퍼블리싱', d: 'React를 활용해 페이지를 구성하고, 공통으로 사용되는 UI 요소를 컴포넌트화해 일관성 있는 화면을 구현했어요..' },
      { t: '반응형 레이아웃 구현', d: 'CSS를 활용해 화면 크기에 따라 유연하게 변화하는 레이아웃을 구성하고, PC와 모바일 환경에 최적화된 화면을 구현했어요.' },
      { t: '인터랙션 및 배포', d: 'JavaScript를 활용해 호버와 스크롤 등 다양한 인터랙션을 구현했으며, Git으로 소스 코드를 관리하고 Vercel을 통해 웹사이트를 배포했어요.' },
    ],
    process: [{ img: 'process-01', cap: '디자인 시스템 — 컬러 · 타이포 · 상품 타일 · 옵션 카드 · 칩 · 버튼' }, { img: 'process-02', cap: '피부 진단 플로우 — 질문 5단계에서 결과 추천까지' }, { img: 'process-03', cap: '모바일 화면 — 메인 · 상품 상세 · 피부 진단' }],
    mobile: [],
  },
  {
    work: WORKS.onkyeol, no: '02', title: '온결피부과', sub: '피부과 홈페이지',
    desc: '시안을 그대로 옮기는 데서 끝나지 않고, 데스크톱부터 모바일까지 흐름이 이어지는 반응형으로 퍼블리싱했어요.',
    role: 'Design · Publishing', stack: 'Figma · React · HTML5  · SCSS ·  TypeScript · Git', link: 'https://ongyeol-smoky.vercel.app',
    design: [
      { t: '신뢰가 가는 병원 톤', d: '차분한 컬러와 넉넉한 여백으로, 처음 방문한 사람도 편안하게 읽을 수 있는 병원 사이트를 만들었어요.' },
      { t: '상담 신청 흐름', d: '진료 안내에서 상담 신청까지 망설임 없이 이어지도록 동선을 설계했어요.' },
      { t: '화면 크기별 재구성', d: '데스크톱 시안을 줄이는 대신, 모바일에서 읽는 순서에 맞게 구성을 다시 짰어요.' },
    ],
    tech: [
      { t: 'Next.js + TypeScript', d: '타입으로 props와 데이터 구조를 정리해 화면이 늘어나도 안전하게 확장할 수 있어요.' },
      { t: 'SCSS Module', d: '컴포넌트별로 스타일을 분리해 충돌 없이 반응형 규칙을 관리했어요.' },
      { t: '공통 컴포넌트', d: '버튼 · 입력 · 카드처럼 반복되는 UI를 공통 컴포넌트로 묶어 일관성을 지켰어요.' },
    ],
    process: [{ img: 'process-01', cap: 'Foundations — 컬러 · 타이포 · 간격 토큰' }, { img: 'process-02', cap: 'Buttons — 상태별(hover · focus · disabled) 정의' }, { img: 'process-03', cap: 'Cards — 시술 · 의료진 · 뉴스 카드' }, { img: 'process-04', cap: 'Reservation — 예약 CTA · 상담 신청 폼 · 날짜 선택' }],
    mobile: [],
  },
  {
    work: WORKS.energy, no: '03', title: '에너지전환진흥원', sub: '공공기관 누리집',
    desc: '메인과 서브 7개 페이지, GNB 메가메뉴까지. 정보량이 많은 공공기관 누리집을 읽기 쉬운 구조로 정리했어요.',
    role: 'Design · Publishing', stack: 'Figma · React · HTML5  · SCSS ·  TypeScript ·  Vite ·  Supabase · Git', link: 'https://energy-agency.vercel.app/',
    design: [
      { t: '깔끔하고 트렌디한 공공 디자인', d: '딱딱해 보이기 쉬운 공공기관 누리집을 정돈된 격자와 밝은 톤으로 현대적으로 풀었어요.' },
      { t: '정보 구조 정리', d: '정보량이 많은 사이트라 GNB 메가메뉴와 서브 페이지 구성을 먼저 잡아 원하는 정보를 빠르게 찾게 했어요.' },
      { t: '서브 페이지 7종', d: '메인과 함께 서브 페이지 7개를 같은 레이아웃 규칙으로 디자인했어요.' },
    ],
    tech: [
      { t: 'React 기반 페이지 구현', d: 'React와 TypeScript를 활용해 메인 페이지와 7개의 서브 페이지를 구성하고, 각 페이지의 콘텐츠와 레이아웃을 일관성 있게 구현했어요.' },
      { t: 'GNB 메가메뉴', d: '다양한 메뉴와 하위 항목을 직관적으로 탐색할 수 있도록 메가메뉴를 구현하고, 메뉴 간 이동이 자연스럽게 이어지도록 구성했어요.' },
      { t: 'Supabase 연동', d: 'REST API로 실제 데이터를 저장하고 불러오도록 연결했어요.' },
    ],
    process: [{ img: 'process-01', cap: '메인 — 히어로 · 자주 찾는 서비스 · 알림·소식' }, { img: 'process-02', cap: 'GNB 메가메뉴 — 가리킨 메뉴의 컬럼 강조' }, { img: 'process-03', cap: '서브 페이지 — 사업 안내 (태양광 보급지원)' }, { img: 'process-04', cap: '서브 페이지 — 온라인 민원 신청 폼' }],
    mobile: [],
  },
  {
    work: WORKS.trippio, no: '04', title: 'Trippio', sub: 'AI 여행 일정 서비스',
    desc: '여행지와 취향을 말하면 일정을 만들어 주는 AI 여행 서비스. 브랜드와 캐릭터부터 화면 설계, 구현까지 직접 맡았어요.',
    role: 'Design · Publishing', stack: 'Figma · React · HTML5  · SCSS ·  TypeScript ·  Vite ·  ECharts · Git', link: 'https://trippio-kappa.vercel.app',
    design: [
      { t: '민트 톤 브랜드', d: '여행의 가벼운 설렘이 느껴지도록 민트 컬러를 중심으로 브랜드 톤을 잡았어요.' },
      { t: '캐릭터 "피오"와 로고', d: '서비스를 안내하는 캐릭터와 로고를 직접 만들어 화면 전체의 인상을 하나로 묶었어요.' },
      { t: '대화하는 느낌의 UX', d: 'AI라는 말을 앞세우지 않고, 친구와 이야기하며 일정을 짜는 듯한 흐름으로 설계했어요.' },
    ],
    tech: [
      { t: 'React + TypeScript', d: '화면을 컴포넌트 단위로 나누고 타입으로 데이터를 정리했어요.' },
      { t: '지도와 차트', d: '장소 데이터를 지도(Leaflet)와 차트(ECharts)로 시각화해 일정을 한눈에 보게 했어요.' },
      { t: 'API 연동', d: '장소 검색 API를 연결하고, 호출 한도 문제는 다른 API로 교체해 해결했어요.' },
    ],
    process: [{ img: 'process-01', cap: '컬러 팔레트 — 프리미티브에서 시맨틱 토큰으로' }, { img: 'process-02', cap: '타이포그래피' }, { img: 'process-03', cap: '캐릭터 후보 비교', half: true }, { img: 'process-04', cap: '로고 후보', half: true }],
    mobile: [{ img: 'mobile-01', cap: '일정 결과 (모바일)' }, { img: 'mobile-02', cap: '내 여행 한눈에 (모바일)' }],
  },
  {
    work: WORKS.lineon, no: '05', title: 'LineOn MES', sub: '생산관리 업무시스템',
    desc: '가상의 제조사를 가정하고 사용자와 업무 흐름부터 정의한 B2B 생산관리(MES) UI/UX 프로젝트예요.',
    role: 'Design · Publishing', stack: 'Figma · React · HTML5  · SCSS  · Git', link: 'https://lineon-mes.vercel.app',
    design: [
      { t: '사용자와 업무 정의', d: '가상 회사와 사용자를 먼저 정하고, 현장에서 어떤 순서로 일하는지부터 정리했어요.' },
      { t: '정보 구조와 와이어프레임', d: 'IA를 잡고 와이어프레임에서 시안까지 단계적으로 발전시켰어요.' },
      { t: '데이터 중심 화면', d: '대시보드와 데이터 그리드처럼 정보가 많은 화면을 빠르게 읽히도록 설계했어요.' },
    ],
    tech: [
      { t: '공통 레이아웃과 데이터 컴포넌트', d: '사이드바 · 검색 · 브레드크럼을 하나의 레이아웃으로 묶고, KPI 카드 · 진행률 바 · 상태 배지 · 차트를 재사용 단위로 나눠 정보 밀도 높은 화면을 일관되게 구현했어요.' },
      { t: '상태 색과 시안 일치', d: '지연 · 주의 · 정상 · 진행을 빨강 · 주황 · 초록 · 파랑으로 정해 변수로 관리하고, 수치 단위와 증감 배지 같은 디테일까지 Figma 시안대로 옮겼어요.' },
      { t: 'React + Vite · Vercel 배포', d: '핵심 화면인 작업지시 목록부터 전체 화면까지 React로 퍼블리싱하고, GitHub로 관리해 Vercel에 배포했어요.' },
    ],
    process: [{ img: 'process-01', cap: '와이어프레임 — 작업지시 목록과 설계 포인트 메모' }, { img: 'process-02', cap: '시안(Hi-fi) — 같은 화면을 디자인 시스템으로 완성' }, { img: 'process-03', cap: 'LineOn 디자인 시스템 — 컴포넌트 · 상태 색' }],
    mobile: [{ img: 'mobile-01', cap: '현장 작업자 태블릿 화면 — 실적 입력' }],
  },
];
export const SITE_IDS = SITES.map((x) => x.work.id);
