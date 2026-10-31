(() => {
  if (!Element.prototype.animate) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const easing = 'cubic-bezier(.22,1,.36,1)';
  const active = new Set();
  function play(element, keyframes, options = {}) {
    if (!element || reducedMotion.matches) return null;
    const animation = element.animate(keyframes, { duration: 620, easing, fill: 'backwards', ...options });
    active.add(animation);
    const release = () => active.delete(animation);
    animation.addEventListener('finish', release);
    animation.addEventListener('cancel', release);
    return animation;
  }
  reducedMotion.addEventListener('change', event => {
    if (event.matches) [...active].forEach(animation => animation.finish());
  });

  // One pass, like a printed sheet arriving. Content stays visible without JavaScript.
  const reveals = document.querySelectorAll(`
    .hero-copy > *, .hero-photo a, .hero-calendar, .section-head, .collection,
    .clients-section h2, .client-logos > svg, .finish-copy, .finish-item,
    .consult-band, .home-order h2, .step, .category-banner, .product-card,
    .product-info > h1, .product-description, .starting-price,
    .company-intro > h1, .company-identity > *, .company-cover,
    .company-story > *, .company-purpose > h2, .company-vision > *,
    .company-mission > h3, .mission-columns > section, .company-production > *,
    .company-principles > h2, .principle-list > article, .company-scope > h2,
    .scope-list > article, .company-contact, .articles-intro > *, .article-card,
    .article-detail > header, .article-detail > figure, .article-cta,
    .faq-intro > *, .faq-group > h2
  `);
  const delays = new WeakMap();
  document.querySelectorAll('.category-grid, .catalog-grid, .related-grid, .article-grid, .finish-grid, .client-logos, .steps, .mission-columns, .principle-list, .scope-list, .hero-copy').forEach(group => {
    const columns = Math.max(1, getComputedStyle(group).gridTemplateColumns.split(' ').length);
    [...group.children].forEach((child, index) => delays.set(child, Math.min(index % (group.matches('.hero-copy') ? 3 : columns), 3) * 65));
  });
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const element = entry.target;
        observer.unobserve(element);
        // Don't replay content above a restored scroll position or deep link.
        if (reducedMotion.matches || entry.boundingClientRect.bottom < 140) return;
        if (element.matches('.hero-photo a, .company-cover, .article-detail > figure')) {
          play(element, [{ clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0 0 0 0)' }], { duration: 850, delay: 90 });
        } else {
          play(element, [{ opacity: 0, transform: 'translate3d(0,18px,0)' }, { opacity: 1, transform: 'translate3d(0,0,0)' }], { delay: delays.get(element) || 0 });
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
    reveals.forEach(element => observer.observe(element));
  }

  // Keep native details semantics and keyboard behavior, including rapid reversals.
  document.querySelectorAll('.faq-answer').forEach(details => {
    const summary = details.querySelector('summary');
    let animation;
    let expanded = details.open;
    summary.addEventListener('click', event => {
      if (reducedMotion.matches) return;
      event.preventDefault();
      const start = details.getBoundingClientRect().height;
      if (animation) animation.cancel();
      expanded = !expanded;
      details.open = true;
      details.style.height = '';
      const end = expanded ? details.getBoundingClientRect().height : summary.getBoundingClientRect().height + 1;
      details.style.overflow = 'hidden';
      animation = play(details, [{ height: start + 'px' }, { height: end + 'px' }], { duration: 280 });
      animation.onfinish = () => {
        details.open = expanded;
        details.style.overflow = '';
        animation = null;
      };
    });
    details.addEventListener('toggle', () => {
      if (!animation) expanded = details.open;
    });
  });

  const form = document.getElementById('configuration-form');
  let quoteAnimation;
  const refreshQuote = () => {
    if (quoteAnimation) quoteAnimation.cancel();
    quoteAnimation = play(document.querySelector('.quote-total'), [{ opacity: 0.45, transform: 'translateY(4px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 260 });
  };
  if (form) {
    form.addEventListener('change', refreshQuote);
    form.addEventListener('click', event => {
      if (event.target.closest('[data-quantity]')) refreshQuote();
    });
  }

  const photo = document.getElementById('main-photo');
  if (photo) photo.addEventListener('load', () => play(photo, [{ opacity: 0.35 }, { opacity: 1 }], { duration: 300 }));
})();
