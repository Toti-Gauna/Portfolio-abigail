'use client';
import { useRef } from 'react';
import { useInView } from '@/lib/useInView';

// The disciplines run like a press sheet through the rollers; only while visible.
export function Marquee({ items }: { items: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const run = useInView(ref);
  const row = (hidden?: boolean) => (
    <ul className="mq-row" aria-hidden={hidden || undefined}>
      {items.map((x) => <li key={x}><span>{x}</span><i aria-hidden="true" /></li>)}
    </ul>
  );
  return (
    <div className="mq on-ink" data-hdr="ink" ref={ref} data-run={run ? '1' : undefined}>
      <div className="mq-track">{row()}{row(true)}</div>
    </div>
  );
}
