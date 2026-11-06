import { useEffect, useRef } from 'react';

function fadeIn(element: Element) {
  return [element.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 800, easing: 'ease-out' })];
}

export function useScrollReveal<T extends HTMLElement>(
  selector: string,
  reveal: (element: Element, index: number) => Animation[] = fadeIn,
) {
  const rootRef = useRef<T>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !('IntersectionObserver' in window)) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const animations = new Set<Animation>();
    const revealed = new WeakSet<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        if (reducedMotion.matches) return;
        entries.forEach((entry, index) => {
          if (!entry.isIntersecting) return;
          revealed.add(entry.target);
          observer.unobserve(entry.target);
          reveal(entry.target, index).forEach((animation) => {
            animations.add(animation);
            animation.onfinish = () => animations.delete(animation);
          });
        });
      },
      { threshold: 0.12 },
    );

    function updateMotion() {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
      if (reducedMotion.matches) return;
      root?.querySelectorAll(selector).forEach((element) => {
        if (!revealed.has(element)) observer.observe(element);
      });
    }

    updateMotion();
    reducedMotion.addEventListener('change', updateMotion);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      reducedMotion.removeEventListener('change', updateMotion);
    };
  }, [selector, reveal]);

  return rootRef;
}
