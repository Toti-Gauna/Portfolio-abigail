'use client';
import { useEffect, useRef } from 'react';
import { gsap, reducedMotion } from '@/lib/gsap';
import type { Dict } from '@/lib/i18n';
import { CONTACT, hasContact } from '@/content/site';
import { ColorBar, Lines, RegMark, SectionLabel } from './print';

export function Process({ t }: { t: Dict['process'] }) {
  return (
    <section id="proceso" className="process sec on-paper" data-hdr="paper">
      <div className="wrap">
        <header className="pc-head">
          <SectionLabel n="04" text={t.label} />
          <Lines text={t.title} className="display h-sec" />
        </header>
        <ol className="pc-sheet" data-reveal>
          {t.steps.map((s, i) => (
            <li key={s.name} className="pc-step" style={{ ['--d' as string]: `${i * 0.08}s` }}>
              <span className="pc-n display" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="pc-name">{s.name}</h3>
              <p className="pc-body">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// Each word prints as the reader scrolls through it.
export function Manifesto({ t }: { t: Dict['manifesto'] }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    const words = el.querySelectorAll('.mf-w');
    const tw = gsap.fromTo(words, { opacity: 0.16 }, {
      opacity: 1, ease: 'none', stagger: 0.1,
      scrollTrigger: { trigger: el.querySelector('.mf-text'), start: 'top 80%', end: 'bottom 45%', scrub: 0.6 },
    });
    return () => { tw.scrollTrigger?.kill(); tw.kill(); };
  }, []);
  return (
    <section className="manifesto sec" ref={ref} aria-labelledby="mf-label" data-hdr="magenta">
      <div className="wrap">
        <p className="label mf-label" id="mf-label"><RegMark /><span>{t.label}</span></p>
        <p className="mf-text display">
          {t.text.split(' ').map((w, i) => <span key={i} className="mf-w">{w} </span>)}
        </p>
      </div>
    </section>
  );
}

export function Contact({ t }: { t: Dict['contact'] }) {
  const links = [
    ['Instagram', CONTACT.instagram],
    ['Behance', CONTACT.behance],
    ['LinkedIn', CONTACT.linkedin],
  ].filter(([, u]) => u);
  return (
    <section id="contacto" className="contact sec on-ink" data-hdr="ink">
      <div className="wrap">
        <SectionLabel n="05" text={t.label} />
        <p className="ct-q" data-reveal>{t.title}</p>
        <Lines text={t.title2} as="h2" className="display ct-big" />
        <div className="ct-foot">
          <p className="ct-body" data-reveal>{t.body}</p>
          <div className="ct-act" data-reveal>
            {CONTACT.email && (
              <a className="btn btn-solid ct-mail" href={`mailto:${CONTACT.email}`}><span>{t.email}</span><span className="arr" aria-hidden="true">→</span></a>
            )}
            {CONTACT.email && <p className="ct-addr mono">{CONTACT.email}</p>}
            {links.length > 0 && (
              <ul className="ct-links" aria-label={t.channels}>
                {links.map(([n, u]) => <li key={n}><a href={u} target="_blank" rel="noopener noreferrer">{n} <span aria-hidden="true">↗</span></a></li>)}
              </ul>
            )}
            {!hasContact && <p className="ct-pending mono">{t.pending}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer({ t }: { t: Dict['footer'] }) {
  return (
    <footer className="ft on-ink" data-hdr="ink">
      <div className="wrap ft-in">
        <p className="ft-mono display" aria-hidden="true">A<em>C</em></p>
        <div className="ft-meta">
          <p>{t.rights}</p>
          <p>{t.colophon}</p>
          <p>{t.note}</p>
        </div>
        <div className="ft-end">
          <ColorBar dark />
          <a href="#inicio" className="ft-top">{t.top} <span aria-hidden="true">↑</span></a>
        </div>
      </div>
    </footer>
  );
}
