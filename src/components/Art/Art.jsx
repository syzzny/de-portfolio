import { useState } from 'react';
import s from './Art.module.scss';

const thumbOf = (src) => src.replace(/\.(jpe?g|png)$/i, '-thumb.$1');

/**
 * 이미지가 있으면 이미지를, 없으면 브랜드 컬러 플레이스홀더를 보여줍니다.
 * thumb: 작게 표시되는 곳에서는 미리 줄여 둔 -thumb 파일을 써서 글자가 뭉개지지 않게 함 (없으면 원본으로 대체)
 * hi: 확대되는 카드용 — 스크롤로 커지면([data-hi]) 원본 해상도로 교체
 */
export default function Art({ work, thumb = false, hi = false, onRatio }) {
  const [failed, setFailed] = useState(false);
  const style = { '--bg1': work.bg[0], '--bg2': work.bg[1], '--fg': work.fg, '--glow': work.glow ?? 'transparent' };
  const alt = `${work.name} ${work.category}`;
  const onThumbError = (e) => {
    if (e.currentTarget.dataset.fb) return setFailed(true);
    e.currentTarget.dataset.fb = '1';
    e.currentTarget.src = work.src;
  };
  return (
    <div className={s.art} data-kind={work.kind} style={style}>
      <div className={s.ph} aria-hidden="true">
        {work.glow && <span className={s.glow} />}
        {work.kind !== 'banner' && work.kind !== 'square' && <span className={s.kind}>{work.category}</span>}
        <span className={s.name}>{work.name}</span>
      </div>
      {!failed && (
        <img className={s.img} src={thumb ? thumbOf(work.src) : work.src} alt={alt} draggable={false} decoding="async" loading={thumb ? undefined : 'lazy'}
          onLoad={(e) => onRatio && e.currentTarget.naturalHeight && onRatio(e.currentTarget.naturalWidth / e.currentTarget.naturalHeight)}
          onError={thumb ? onThumbError : () => setFailed(true)} />
      )}
      {!failed && hi && <img className={`${s.img} ${s.hi}`} src={work.src} alt="" aria-hidden="true" draggable={false} decoding="async" />}
    </div>
  );
}
