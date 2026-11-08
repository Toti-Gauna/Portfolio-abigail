'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap, reducedMotion } from '@/lib/gsap';
import { markReady } from '@/lib/ready';
import './loader.css';

// A colour proof: the four plates print, the counter reaches 100 and the sheet lifts off the press.
export function Loader({ label, ready }: { label: string; ready: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion()) { setDone(true); markReady(); return; }
    const root = document.documentElement;
    root.style.overflow = 'hidden';
    const count = el.querySelector<HTMLElement>('.ld-count b')!;
    const lbl = el.querySelector<HTMLElement>('.ld-label')!;
    const n = { v: 0 };
    const tl = gsap.timeline({
      defaults: { ease: 'expo.out' },
      onComplete: () => { root.style.overflow = ''; setDone(true); },
    });
    tl.to('.ld-reg circle, .ld-reg path', { strokeDashoffset: 0, duration: 1.2, stagger: 0.08, ease: 'power2.inOut' }, 0)
      .to(n, { v: 100, duration: 1.5, ease: 'power3.inOut', onUpdate: () => { count.textContent = String(Math.round(n.v)).padStart(3, '0'); } }, 0)
      .to('.ld-plate i', { scaleX: 1, duration: 0.7, stagger: 0.22, ease: 'power3.inOut' }, 0.1)
      .add(() => { lbl.textContent = ready; }, 1.5)
      .to('.ld-inner', { opacity: 0, y: -24, duration: 0.5, ease: 'power2.in' }, 1.75)
      .add(markReady, 1.95)
      .to(el, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.1, ease: 'expo.inOut' }, 1.9);
    const skip = () => tl.progress(1);
    addEventListener('pointerdown', skip, { once: true });
    addEventListener('keydown', skip, { once: true });
    return () => { tl.kill(); root.style.overflow = ''; removeEventListener('pointerdown', skip); removeEventListener('keydown', skip); };
  }, [ready]);

  if (done) return null;
  return (
    <div className="loader" ref={ref} aria-hidden="true">
      <div className="ld-inner">
        <svg className="ld-reg" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="60" cy="60" r="38" pathLength={1} />
          <circle cx="60" cy="60" r="14" pathLength={1} />
          <path d="M60 0v120" pathLength={1} />
          <path d="M0 60h120" pathLength={1} />
        </svg>
        <p className="ld-count"><b>000</b><span>%</span></p>
        <p className="ld-label">{label}</p>
        <div className="ld-plates">
          {['c', 'm', 'y', 'k'].map((p) => (
            <span className="ld-plate" key={p}><i className={p} /><em>{p.toUpperCase()}</em></span>
          ))}
        </div>
      </div>
    </div>
  );
}
