'use client';
import { useEffect, useRef } from 'react';
import { gsap, finePointer, reducedMotion } from '@/lib/gsap';
import { onReady } from '@/lib/ready';
import type { Dict } from '@/lib/i18n';
import { ColorBar, CropMarks, RegMark } from './print';
import './hero.css';

const PLATES = ['c', 'm', 'y'] as const;
// where each plate starts, in em, before the press brings them into register
const OFF: Record<(typeof PLATES)[number], [number, number]> = { c: [-0.07, -0.035], m: [0.06, 0.04], y: [0.02, -0.06] };

function Name({ t }: { t: Dict['hero'] }) {
  return (
    <>
      <span className="hn-l1"><span>{t.first}</span></span>
      <span className="hn-l2"><span><em>{t.last}</em></span></span>
    </>
  );
}

export function Hero({ t }: { t: Dict['hero'] }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const q = gsap.utils.selector(root);
    if (reducedMotion()) { gsap.set(q('.hn-plate'), { x: 0, y: 0 }); gsap.set(q('.hn-k, [data-hero]'), { opacity: 1, y: 0 }); return; }

    const fs = parseFloat(getComputedStyle(q('.hname')[0]).fontSize);
    PLATES.forEach((p) => gsap.set(q(`.hn-${p}`), { x: OFF[p][0] * fs * 2.2, y: OFF[p][1] * fs * 2.2 }));
    gsap.set(q('.hn-l1 > span, .hn-l2 > span'), { yPercent: 108 });

    let tl: gsap.core.Timeline | undefined;
    const off = onReady(() => {
      tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
        .to(q('.hn-l1 > span'), { yPercent: 0, duration: 1.4, stagger: 0.02 }, 0)
        .to(q('.hn-l2 > span'), { yPercent: 0, duration: 1.4, stagger: 0.02 }, 0.12)
        .to(q('.hn-plate'), { x: 0, y: 0, duration: 1.8, ease: 'expo.inOut', stagger: 0.08 }, 0.35)
        .to(q('.hn-k'), { opacity: 1, duration: 0.6, ease: 'power2.out' }, 1.75)
        .to(q('[data-hero]'), { opacity: 1, y: 0, duration: 1.1, stagger: 0.08 }, 1.2)
        .fromTo(q('.hero-rule'), { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: 'expo.inOut' }, 0.9);
    });

    // misregistration under the pointer: the plates peek out around the black
    let cleanup = () => {};
    if (finePointer()) {
      const qx = PLATES.map((p) => gsap.quickTo(q(`.hn-${p}`)[0], 'x', { duration: 0.9, ease: 'expo.out' }));
      const qy = PLATES.map((p) => gsap.quickTo(q(`.hn-${p}`)[0], 'y', { duration: 0.9, ease: 'expo.out' }));
      const k = [[-7, -4], [6, 5], [3, -7]];
      let visible = true;
      const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
      io.observe(root);
      const move = (e: PointerEvent) => {
        if (!visible || (tl && tl.isActive())) return;
        const dx = e.clientX / innerWidth - 0.5, dy = e.clientY / innerHeight - 0.5;
        PLATES.forEach((_, i) => { qx[i](dx * k[i][0] * 2); qy[i](dy * k[i][1] * 2); });
      };
      addEventListener('pointermove', move, { passive: true });
      cleanup = () => { removeEventListener('pointermove', move); io.disconnect(); };
    }
    return () => { off(); tl?.kill(); cleanup(); };
  }, []);

  return (
    <section id="inicio" className="hero on-paper" ref={ref} data-hdr="paper">
      <div className="hero-sheet">
        <CropMarks />
        <RegMark className="hero-reg hero-reg-l" size={22} />
        <RegMark className="hero-reg hero-reg-r" size={22} />
        <div className="hero-top" data-hero>
          <span>{t.sheet}</span>
          <ColorBar className="hero-bar" />
        </div>

        <p className="label hero-kicker" data-hero><span className="n">●</span>{t.kicker}</p>
        <h1 className="hname" aria-label={`${t.first} ${t.last}`}>
          {PLATES.map((p) => (
            <span key={p} className={`hn-plate hn-${p}`} aria-hidden="true"><Name t={t} /></span>
          ))}
          <span className="hn-k" aria-hidden="true"><Name t={t} /></span>
        </h1>

        <span className="hero-rule" aria-hidden="true" />
        <div className="hero-foot">
          <p className="hero-tag display" data-hero><em>{t.tagline}</em></p>
          <div className="hero-side">
            <p className="hero-intro" data-hero>{t.intro}</p>
            <div className="hero-cta" data-hero>
              <a className="btn btn-solid" href="#trabajo"><span>{t.ctaWork}</span><span className="arr" aria-hidden="true">→</span></a>
              <a className="btn btn-line" href="#historia"><span>{t.ctaStory}</span></a>
            </div>
          </div>
        </div>
        <p className="hero-slug" data-hero aria-hidden="true">
          <span>Abigail Caricato — Portfolio 2026</span>
          {t.specs.map((s) => <span key={s}>{s}</span>)}
        </p>
      </div>
    </section>
  );
}
