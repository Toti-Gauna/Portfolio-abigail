'use client';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { gsap, finePointer, reducedMotion } from '@/lib/gsap';
import type { Dict } from '@/lib/i18n';
import { ARTS, PROJECT_META, type ArtId } from './art/arts';
import { Lines, SectionLabel } from './print';
import './work.css';

const FONT: Record<string, string> = {
  'Bodoni Moda': 'var(--font-d)',
  'Bodoni Moda Italic': 'var(--font-d)',
  'Hanken Grotesk': 'var(--font-s)',
  'DM Mono': 'var(--font-m)',
};

export function Work({ t }: { t: Dict['work'] }) {
  const list = t.projects;
  const preview = useRef<HTMLDivElement>(null);
  const dlg = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const [hover, setHover] = useState(-1);
  const [open, setOpen] = useState(0);

  // the preview card follows the pointer and leans with its speed
  useEffect(() => {
    const el = preview.current;
    if (!el || !finePointer()) return;
    const qx = gsap.quickTo(el, 'x', { duration: 0.7, ease: 'expo.out' });
    const qy = gsap.quickTo(el, 'y', { duration: 0.7, ease: 'expo.out' });
    const qr = gsap.quickTo(el, 'rotation', { duration: 0.9, ease: 'expo.out' });
    let lx = 0;
    const move = (e: PointerEvent) => {
      qx(e.clientX + 32); qy(e.clientY - 180);
      if (!reducedMotion()) qr(gsap.utils.clamp(-7, 7, (e.clientX - lx) * 0.4));
      lx = e.clientX;
    };
    addEventListener('pointermove', move, { passive: true });
    return () => removeEventListener('pointermove', move);
  }, []);

  const show = (i: number, from: HTMLButtonElement, e?: React.MouseEvent) => {
    const d = dlg.current;
    if (!d) return;
    opener.current = from;
    setOpen(i);
    d.showModal();
    d.scrollTop = 0;
    document.documentElement.style.overflow = 'hidden';
    if (reducedMotion()) return;
    const r = from.getBoundingClientRect();
    const x = e?.clientX || r.left + r.width / 2, y = e?.clientY || r.top + r.height / 2;
    gsap.fromTo(d, { clipPath: `circle(0% at ${x}px ${y}px)` }, { clipPath: `circle(150% at ${x}px ${y}px)`, duration: 1.1, ease: 'expo.inOut' });
    gsap.fromTo(d.querySelectorAll('[data-case]'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.06, delay: 0.45 });
    gsap.fromTo(d.querySelector('.case-art'), { scale: 1.12 }, { scale: 1, duration: 1.6, ease: 'expo.out' });
  };

  const hide = () => {
    const d = dlg.current;
    if (!d) return;
    const done = () => { d.close(); document.documentElement.style.overflow = ''; opener.current?.focus(); };
    if (reducedMotion()) return done();
    gsap.to(d, { clipPath: 'circle(0% at 50% 50%)', duration: 0.8, ease: 'expo.inOut', onComplete: done });
  };

  const step = (dir: 1 | -1) => {
    const next = (open + dir + list.length) % list.length;
    const d = dlg.current;
    if (!d || reducedMotion()) { setOpen(next); return; }
    gsap.to(d.querySelectorAll('[data-case], .case-art'), {
      opacity: 0, duration: 0.3, ease: 'power2.in',
      onComplete: () => {
        setOpen(next);
        d.scrollTop = 0;
        requestAnimationFrame(() => {
          gsap.fromTo(d.querySelectorAll('[data-case]'), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out', stagger: 0.05 });
          gsap.fromTo(d.querySelector('.case-art'), { opacity: 0, scale: 1.06 }, { opacity: 1, scale: 1, duration: 1.1, ease: 'expo.out' });
        });
      },
    });
  };

  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    const cancel = (e: Event) => { e.preventDefault(); hide(); };
    d.addEventListener('cancel', cancel);
    return () => d.removeEventListener('cancel', cancel);
  });

  const p = list[open];
  const id = p.id as ArtId;
  const meta = PROJECT_META[id];
  const Art = ARTS[id];

  return (
    <section id="trabajo" className="work sec on-paper" data-hdr="paper">
      <div className="wrap">
        <header className="work-head">
          <SectionLabel n="02" text={t.label} />
          <Lines text={t.title} className="display h-sec" />
          <p className="lead" data-reveal>{t.lead}</p>
        </header>

        <ol className="wk-list" onMouseLeave={() => setHover(-1)}>
          {list.map((w, i) => {
            const A = ARTS[w.id as ArtId];
            return (
              <li key={w.id} data-reveal style={{ ['--d' as string]: `${i * 0.05}s` }}>
                <button
                  type="button" className="wk-row" data-cursor="view" aria-haspopup="dialog"
                  onMouseEnter={() => setHover(i)} onFocus={() => setHover(i)} onBlur={() => setHover(-1)}
                  onClick={(e) => show(i, e.currentTarget, e)}
                >
                  <span className="wk-i">{String(i + 1).padStart(2, '0')}</span>
                  <span className="wk-thumb" aria-hidden="true"><A label="" /></span>
                  <span className="wk-name display">{w.name}</span>
                  <span className="wk-meta"><span>{w.discipline}</span><span>{w.client}</span></span>
                  <span className="wk-go"><span className="sr-only">{t.open}</span><span aria-hidden="true">→</span></span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className={`wk-preview${hover >= 0 ? ' is-on' : ''}`} ref={preview} aria-hidden="true">
        {list.map((w, i) => {
          const A = ARTS[w.id as ArtId];
          return <div key={w.id} className={`wk-pv${i === hover ? ' is-active' : ''}`}><A label="" /></div>;
        })}
      </div>

      <dialog ref={dlg} className="case" aria-labelledby="case-title" style={{ ['--cbg' as string]: meta.bg, ['--cfg' as string]: meta.fg } as CSSProperties}>
        <div className="case-in">
          <div className="case-art-wrap">
            <div className="case-art"><Art label={`${p.name} · ${t.badge}`} /></div>
          </div>
          <div className="case-body">
            <div className="case-top">
              <p className="case-badge" data-case>{t.badge} · {t.fictional}</p>
              <button type="button" className="case-close" onClick={hide}>{t.close} <span aria-hidden="true">✕</span></button>
            </div>
            <p className="case-disc" data-case>{p.discipline} — {p.client}</p>
            <h3 id="case-title" className="case-name display" data-case>{p.name}</h3>
            <dl className="case-fields">
              {(['brief', 'idea', 'system'] as const).map((k) => (
                <div key={k} data-case><dt>{t.fields[k]}</dt><dd>{p[k]}</dd></div>
              ))}
            </dl>
            <div className="case-specs" data-case>
              <div>
                <h4>{t.fields.deliverables}</h4>
                <ul>{p.deliverables.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
              <div>
                <h4>{t.fields.tools}</h4>
                <ul>{meta.tools.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
              <div className="case-pal">
                <h4>{t.fields.palette}</h4>
                <ul>
                  {p.palette.map(([n, hex]) => (
                    <li key={hex}><i style={{ background: hex }} /><span>{n}</span><code>{hex}</code></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>{t.fields.type}</h4>
                <ul>{meta.type.map((x) => <li key={x} style={{ fontFamily: FONT[x], fontStyle: x.includes('Italic') ? 'italic' : undefined, fontSize: x.startsWith('Bodoni') ? '1.35em' : undefined }}>{x}</li>)}</ul>
              </div>
            </div>
            <nav className="case-nav" data-case aria-label={t.label}>
              <button type="button" onClick={() => step(-1)}><span aria-hidden="true">←</span> {t.prev}<b>{list[(open - 1 + list.length) % list.length].name}</b></button>
              <button type="button" onClick={() => step(1)}>{t.next} <span aria-hidden="true">→</span><b>{list[(open + 1) % list.length].name}</b></button>
            </nav>
          </div>
        </div>
      </dialog>
    </section>
  );
}
