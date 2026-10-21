import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Scroll-reveal wrapper: fades content up the first time it enters the viewport.
 * Respects prefers-reduced-motion and degrades to always-visible without JS observers.
 */
export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
    if (typeof IntersectionObserver === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [shown]);

  return (
    <div
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${shown ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'} ${className}`}
    >
      {children}
    </div>
  );
}
