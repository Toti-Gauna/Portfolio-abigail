'use client';
import { useRef, useState } from 'react';
import { useInView } from '@/lib/useInView';
import type { Dict } from '@/lib/i18n';
import { CropMarks, Lines, SectionLabel } from './print';
import { ToolDemo, type DemoId } from './tools/ToolDemo';
import './tools.css';

function Eye() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6S2 12 2 12Z" /><circle cx="12" cy="12" r="2.6" />
    </svg>
  );
}

// The suite as a Layers panel: pick a layer, the stage shows what that tool does.
export function Tools({ t }: { t: Dict['tools'] }) {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);
  const cur = t.items[active];

  const stage = (inline?: boolean) => (
    <div className={inline ? 'tl-inline' : 'tl-stage'} aria-live={inline ? undefined : 'polite'}>
      <figure className="tl-art">
        <CropMarks />
        <ToolDemo id={cur.id as DemoId} run={inView} copy={t.demo} label={cur.name} />
      </figure>
      <div className="tl-cap">
        <p className="tl-name display">{cur.name}</p>
        <p className="tl-role">{cur.role}</p>
        <p className="tl-key"><span className="tl-key-l">{t.shortcut}</span><kbd>{cur.key}</kbd><span>{cur.keyLabel}</span></p>
      </div>
    </div>
  );

  return (
    <section id="herramientas" className="tools sec on-ink" ref={ref} data-hdr="ink">
      <div className="wrap">
        <header className="tl-head">
          <SectionLabel n="03" text={t.label} />
          <Lines text={t.title} className="display h-sec" />
          <p className="lead" data-reveal>{t.lead}</p>
        </header>

        <div className="tl-grid">
          <div className="tl-panel" data-reveal>
            <p className="tl-panel-bar"><span>{t.panel}</span><span aria-hidden="true">{t.items.length}</span></p>
            <ul>
              {t.items.map((it, i) => (
                <li key={it.id}>
                  <button type="button" className={`tl-row${i === active ? ' is-on' : ''}`} aria-pressed={i === active} onClick={() => setActive(i)} onMouseEnter={() => setActive(i)}>
                    <Eye />
                    <span className="tl-thumb" aria-hidden="true" data-id={it.id} />
                    <span className="tl-row-name">{it.name}</span>
                    <span className="tl-row-role">{it.role}</span>
                  </button>
                  {i === active && stage(true)}
                </li>
              ))}
            </ul>
            <p className="tl-also"><span>{t.also}</span> {t.alsoList.join(' · ')}</p>
          </div>
          {stage()}
        </div>
      </div>
    </section>
  );
}
