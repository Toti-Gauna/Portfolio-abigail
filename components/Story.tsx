'use client';
import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useInView } from '@/lib/useInView';
import type { Dict } from '@/lib/i18n';
import { CropMarks, Lines, RegMark, SectionLabel } from './print';
import { ToolDemo, type DemoId } from './tools/ToolDemo';
import './story.css';

const ART: DemoId[] = ['collage', 'ps', 'ai', 'id', 'ae', 'cc'];
type Chapter = Dict['story']['chapters'][number];

function Panel({ c, i, demo }: { c: Chapter; i: number; demo: Dict['tools']['demo'] }) {
  const ref = useRef<HTMLElement>(null);
  const run = useInView(ref, '-15% 0px -15% 0px');
  const n = String(i + 1).padStart(2, '0');
  return (
    <article className="st-panel" ref={ref} aria-labelledby={`st-${i}`}>
      <p className="st-num display" aria-hidden="true">{n}</p>
      <div className="st-text">
        <p className="st-tool"><RegMark size={14} /><span>{c.tool}</span></p>
        <h3 className="st-title display" id={`st-${i}`}>{c.title}</h3>
        <p className="st-body">{c.body}</p>
      </div>
      <figure className="st-art">
        <CropMarks />
        <ToolDemo id={ART[i]} run={run} copy={demo} label={c.tool} />
      </figure>
    </article>
  );
}

export function Story({ t, demo }: { t: Dict['story']; demo: Dict['tools']['demo'] }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const mm = gsap.matchMedia();
    // horizontal run only with a mouse or trackpad, wide screens and motion allowed; touch scrolls the chapters normally
    mm.add('(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const pin = root.querySelector<HTMLElement>('.st-pin')!;
      const track = root.querySelector<HTMLElement>('.st-track')!;
      const fill = root.querySelector<HTMLElement>('.st-fill')!;
      const count = root.querySelector<HTMLElement>('.st-count b')!;
      const total = t.chapters.length;
      const dist = () => track.scrollWidth - innerWidth;
      gsap.to(track, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: {
          trigger: pin, start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: 0.9, invalidateOnRefresh: true,
          onUpdate: (s) => {
            fill.style.transform = `scaleX(${s.progress})`;
            count.textContent = String(Math.min(total, Math.floor(s.progress * total) + 1)).padStart(2, '0');
          },
        },
      });
    });
    return () => mm.revert();
  }, [t.chapters.length]);

  return (
    <section id="historia" className="story on-ink" ref={ref} data-hdr="ink">
      <div className="st-pin">
        <div className="st-track">
          <header className="st-head">
            <SectionLabel n="01" text={t.label} />
            <Lines text={t.title} className="display h-sec" />
            <p className="lead" data-reveal>{t.lead}</p>
          </header>
          {t.chapters.map((c, i) => <Panel key={i} c={c} i={i} demo={demo} />)}
        </div>
        <div className="st-ruler" aria-hidden="true">
          <span className="st-count">{t.progress} <b>01</b> / {String(t.chapters.length).padStart(2, '0')}</span>
          <span className="st-bar"><span className="st-fill" /></span>
        </div>
      </div>
    </section>
  );
}
