'use client';
import { useEffect } from 'react';

// One observer for every entrance on the page ([data-reveal] and .lines): CSS does the motion.
export function Reveals() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }),
      { rootMargin: '0px 0px -12% 0px' },
    );
    document.querySelectorAll('[data-reveal], [data-lines]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
