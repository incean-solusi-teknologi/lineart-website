import { useEffect } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

function revealPrintSample(element: Element, index: number) {
  const benefit = element.classList.contains('print-benefit');
  const timing: KeyframeAnimationOptions = {
    duration: 1100,
    delay: Math.min(index * 120, 360),
    fill: 'backwards',
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
  };
  const animations = [
    element.animate(
      benefit
        ? [
            { opacity: 0.3, transform: 'translateY(18px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ]
        : [
            { opacity: 0.35, transform: 'perspective(900px) translateY(32px) rotateX(9deg)' },
            { opacity: 1, transform: 'perspective(900px) translateY(0) rotateX(0)' },
          ],
      timing,
    ),
  ];
  const icon = benefit && element.querySelector('svg');
  if (icon)
    animations.push(
      icon.animate(
        [{ transform: 'scale(0.75) rotate(-12deg)' }, { transform: 'scale(1) rotate(0)' }],
        timing,
      ),
    );
  return animations;
}

export function usePrintMotion() {
  const rootRef = useScrollReveal<HTMLElement>(
    '.print-benefit, .print-category-card, .print-services, .print-consult',
    revealPrintSample,
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const hero = root.querySelector<HTMLElement>('.print-hero');
    let waveFrame = 0;

    function updateWaves() {
      waveFrame = 0;
      if (!root) return;
      if (reducedMotion.matches) {
        root.style.removeProperty('--wave-progress');
        return;
      }
      const bounds = root.getBoundingClientRect();
      const progress = Math.min(
        1,
        Math.max(0, -bounds.top / Math.max(1, bounds.height - window.innerHeight)),
      );
      root.style.setProperty('--wave-progress', String(progress));
    }

    function scheduleWaves() {
      if (!waveFrame) waveFrame = window.requestAnimationFrame(updateWaves);
    }

    function resetPointer() {
      hero?.style.removeProperty('--pointer-x');
      hero?.style.removeProperty('--pointer-y');
    }

    function movePointer(event: PointerEvent) {
      if (!hero || reducedMotion.matches || !finePointer.matches || event.pointerType === 'touch')
        return;
      const bounds = hero.getBoundingClientRect();
      hero.style.setProperty(
        '--pointer-x',
        `${(event.clientX - bounds.left) / bounds.width - 0.5}`,
      );
      hero.style.setProperty(
        '--pointer-y',
        `${(event.clientY - bounds.top) / bounds.height - 0.5}`,
      );
    }

    updateWaves();
    window.addEventListener('scroll', scheduleWaves, { passive: true });
    window.addEventListener('resize', scheduleWaves);
    reducedMotion.addEventListener('change', scheduleWaves);
    finePointer.addEventListener('change', resetPointer);
    hero?.addEventListener('pointermove', movePointer, { passive: true });
    hero?.addEventListener('pointerleave', resetPointer);
    return () => {
      window.cancelAnimationFrame(waveFrame);
      window.removeEventListener('scroll', scheduleWaves);
      window.removeEventListener('resize', scheduleWaves);
      reducedMotion.removeEventListener('change', scheduleWaves);
      root.style.removeProperty('--wave-progress');
      finePointer.removeEventListener('change', resetPointer);
      hero?.removeEventListener('pointermove', movePointer);
      hero?.removeEventListener('pointerleave', resetPointer);
      resetPointer();
    };
  }, [rootRef]);

  return rootRef;
}
