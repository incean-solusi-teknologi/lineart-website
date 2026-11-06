import { useEffect, useRef } from 'react';

export function FaqAnswer({ question, answer }: { question: string; answer: string }) {
  const animationRef = useRef<Animation | null>(null);
  const closingRef = useRef(false);

  useEffect(() => () => animationRef.current?.cancel(), []);

  function toggle(event: React.MouseEvent<HTMLElement>) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    event.preventDefault();
    const details = event.currentTarget.parentElement as HTMLDetailsElement;
    const content = event.currentTarget.nextElementSibling as HTMLDivElement;
    const opening = !details.open || closingRef.current;
    const startHeight = details.open ? content.getBoundingClientRect().height : 0;
    animationRef.current?.cancel();
    details.open = true;
    closingRef.current = !opening;
    const animation = content.animate(
      [{ height: `${startHeight}px` }, { height: `${opening ? content.scrollHeight : 0}px` }],
      { duration: 550, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
    );
    animationRef.current = animation;
    animation.onfinish = () => {
      if (!opening) details.open = false;
      closingRef.current = false;
      animationRef.current = null;
    };
  }

  return (
    <details className="faq-answer">
      <summary onClick={toggle}>{question}</summary>
      <div className="faq-answer-content">
        <p>{answer}</p>
      </div>
    </details>
  );
}
