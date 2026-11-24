'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { ADOPTIONS } from '@/lib/content';
import Photo from './Photo';

type Props = { title: string; blurb: string; children?: ReactNode };

/** Swipe-through "adopted" photo wall with prev/next, progress bar and lightbox. */
export default function AdoptionShowcase({ title, blurb, children }: Props) {
  const wall = useRef<HTMLDivElement>(null);
  const [first, setFirst] = useState(1);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [bar, setBar] = useState({ width: 30, shift: 0 });
  const [lb, setLb] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);

  const step = () => {
    const w = wall.current;
    const card = w?.querySelector<HTMLElement>('.adopt-card');
    if (!w || !card) return 300;
    return card.getBoundingClientRect().width + parseFloat(getComputedStyle(w).columnGap || '18');
  };

  const update = useCallback(() => {
    const w = wall.current;
    if (!w) return;
    const max = w.scrollWidth - w.clientWidth;
    setFirst(Math.min(ADOPTIONS.length, Math.round(w.scrollLeft / step()) + 1));
    setAtStart(w.scrollLeft <= 2);
    setAtEnd(w.scrollLeft >= max - 2);
    const vis = w.clientWidth / w.scrollWidth;
    setBar({ width: vis * 100, shift: max > 0 ? (w.scrollLeft / max) * (1 / vis - 1) * 100 : 0 });
  }, []);

  useEffect(() => {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [update]);

  const scrollBy = (dir: 1 | -1) => wall.current?.scrollBy({ left: dir * step(), behavior: 'smooth' });

  // lightbox: keyboard + scroll lock
  useEffect(() => {
    if (lb === null) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLb(null);
      if (e.key === 'ArrowLeft') setLb((i) => (i === null ? i : (i - 1 + ADOPTIONS.length) % ADOPTIONS.length));
      if (e.key === 'ArrowRight') setLb((i) => (i === null ? i : (i + 1) % ADOPTIONS.length));
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      opener.current?.focus();
    };
  }, [lb]);

  const touchX = useRef<number | null>(null);
  const go = (d: number) => setLb((i) => (i === null ? i : (i + d + ADOPTIONS.length) % ADOPTIONS.length));
  const current = lb === null ? null : ADOPTIONS[lb];

  return (
    <div className="wrap">
      <div className="sec-head">
        <div>
          <h2>{title}</h2>
          <p>{blurb}</p>
        </div>
        <div className="rail-nav">
          <span className="count">{`${first} / ${ADOPTIONS.length}`}</span>
          <button className="rail-btn" disabled={atStart} aria-label="Previous adoptions" onClick={() => scrollBy(-1)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button className="rail-btn" disabled={atEnd} aria-label="More adoptions" onClick={() => scrollBy(1)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="adopt-wall" ref={wall} onScroll={update}>
        {ADOPTIONS.map((a, i) => (
          <button
            key={a.k}
            className="adopt-card"
            onClick={(e) => {
              opener.current = e.currentTarget;
              setLb(i);
            }}
          >
            <span className="frame">
              <Photo k={a.k} alt={a.alt} sizes="(max-width: 560px) 76vw, (max-width: 900px) 40vw, 300px" />
              <span className="tag">
                <svg viewBox="0 0 32 32" aria-hidden="true">
                  <path d="M16 27s-10-6.2-10-13a5.5 5.5 0 0 1 10-3.2A5.5 5.5 0 0 1 26 14c0 6.8-10 13-10 13z" />
                </svg>
                Adopted
              </span>
            </span>
            <span className="cap">{a.cap}</span>
          </button>
        ))}
      </div>
      <div className="rail-bar" aria-hidden="true">
        <i style={{ width: `${bar.width}%`, transform: `translateX(${bar.shift}%)` }} />
      </div>

      {children}

      {current && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Adoption photo"
          onClick={(e) => e.target === e.currentTarget && setLb(null)}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <Photo k={current.k} alt={current.alt} sizes="560px" />
          <button className="lb-btn lb-close" aria-label="Close" autoFocus onClick={() => setLb(null)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <button className="lb-btn lb-prev" aria-label="Previous photo" onClick={() => go(-1)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button className="lb-btn lb-next" aria-label="Next photo" onClick={() => go(1)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <p>{`${current.cap}, adopted from Pet Shelter NG`}</p>
        </div>
      )}
    </div>
  );
}
