'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap, reducedMotion } from '@/lib/gsap';
import { BASE_PATH } from '@/lib/site';
import type { Dict, Locale } from '@/lib/i18n';
import './chrome.css';

export const SECTIONS = [
  ['historia', 'story'],
  ['trabajo', 'work'],
  ['herramientas', 'tools'],
  ['proceso', 'process'],
  ['contacto', 'contact'],
] as const;

export function Chrome({ t, locale }: { t: Dict['nav']; locale: Locale }) {
  const other: Locale = locale === 'es' ? 'en' : 'es';
  const dlg = useRef<HTMLDialogElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  const switchLang = (e: React.MouseEvent<HTMLAnchorElement>) => {
    try { localStorage.setItem('ac:locale', other); } catch {}
    e.currentTarget.href = `${BASE_PATH}/${other}/${location.hash}`;
  };

  const show = () => {
    const d = dlg.current;
    if (!d) return;
    d.showModal();
    setOpen(true);
    if (!reducedMotion()) {
      gsap.fromTo(d, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'expo.inOut' });
      gsap.fromTo(d.querySelectorAll('.mn-link'), { yPercent: 110 }, { yPercent: 0, duration: 1, ease: 'expo.out', stagger: 0.06, delay: 0.35 });
    }
  };
  const hide = (then?: () => void) => {
    const d = dlg.current;
    if (!d) return;
    const finish = () => { d.close(); setOpen(false); btn.current?.focus(); then?.(); };
    if (reducedMotion()) return finish();
    gsap.to(d, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.7, ease: 'expo.inOut', onComplete: finish });
  };

  // header colour follows the sheet under it
  const hdr = useRef<HTMLElement>(null);
  useEffect(() => {
    const h = hdr.current;
    if (!h) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = h.offsetHeight / 2;
      let theme = 'paper';
      for (const s of document.querySelectorAll<HTMLElement>('[data-hdr]')) {
        const r = s.getBoundingClientRect();
        if (r.top <= y && r.bottom > y) { theme = s.dataset.hdr!; break; }
      }
      if (h.dataset.theme !== theme) h.dataset.theme = theme;
      h.toggleAttribute('data-scrolled', scrollY > 40);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener('scroll', on, { passive: true });
    addEventListener('resize', on);
    return () => { removeEventListener('scroll', on); removeEventListener('resize', on); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    const cancel = (e: Event) => { e.preventDefault(); hide(); };
    d.addEventListener('cancel', cancel);
    return () => d.removeEventListener('cancel', cancel);
  });

  const go = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    hide(() => document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth' }));
  };

  return (
    <>
      <a className="skip" href="#contenido">{t.skip}</a>
      <header className="hdr" ref={hdr} data-theme="paper">
        <a className="hdr-brand" href="#inicio" aria-label={t.home}>
          <span className="hdr-mono">A<em>C</em></span>
          <span className="hdr-name">Abigail Caricato</span>
        </a>
        <nav className="hdr-nav" aria-label={t.menu}>
          <ol>
            {SECTIONS.map(([id, k], i) => (
              <li key={id}><a href={`#${id}`}><span>0{i + 1}</span>{t[k]}</a></li>
            ))}
          </ol>
        </nav>
        <a className="hdr-lang" href={`${BASE_PATH}/${other}/`} hrefLang={other} onClick={switchLang} aria-label={`${t.lang}: ${t.langOther}`}>
          {t.langOtherShort}
        </a>
        <button ref={btn} className="hdr-menu" type="button" aria-haspopup="dialog" aria-expanded={open} onClick={show}>
          <span>{t.menu}</span><i aria-hidden="true" />
        </button>
      </header>

      <dialog ref={dlg} className="mn" aria-label={t.menu}>
        <div className="mn-top">
          <span className="mn-mono" aria-hidden="true">A<em>C</em></span>
          <button type="button" className="mn-close" onClick={() => hide()}>{t.close}</button>
        </div>
        <nav aria-label={t.menu}>
          <ol>
            {SECTIONS.map(([id, k], i) => (
              <li key={id}>
                <span className="mn-clip">
                  <a className="mn-link" href={`#${id}`} onClick={(e) => go(e, id)}><span>0{i + 1}</span>{t[k]}</a>
                </span>
              </li>
            ))}
          </ol>
        </nav>
        <div className="mn-foot">
          <a href={`${BASE_PATH}/${other}/`} hrefLang={other} onClick={switchLang}>{t.langOther}</a>
          <span aria-hidden="true" className="mn-bar"><i /><i /><i /><i /></span>
        </div>
      </dialog>
    </>
  );
}
