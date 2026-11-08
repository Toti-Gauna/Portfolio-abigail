'use client';
import { useEffect, useState, type RefObject } from 'react';

// true while the element is on screen: loops (marquee, tool demos) only run when someone can see them.
export function useInView(ref: RefObject<Element | null>, rootMargin = '0px') {
  const [inView, set] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => set(e.isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);
  return inView;
}
