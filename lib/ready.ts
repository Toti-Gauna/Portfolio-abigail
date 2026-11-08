'use client';
// The loader announces when the page is uncovered; the hero waits for it to start its entrance.
type W = Window & { __acReady?: boolean };

export function markReady() {
  (window as W).__acReady = true;
  window.dispatchEvent(new Event('ac:ready'));
}

export function onReady(cb: () => void) {
  if ((window as W).__acReady) { cb(); return () => {}; }
  const h = () => cb();
  window.addEventListener('ac:ready', h, { once: true });
  return () => window.removeEventListener('ac:ready', h);
}
