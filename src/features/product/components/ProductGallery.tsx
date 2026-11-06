import { useRef, useState, type KeyboardEvent } from 'react';
import type { Product } from '@/data';
export function ProductGallery({ product }: { product: Product }) {
  const images = product.gallery.length > 0 ? product.gallery : [product.image];
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const multiple = images.length > 1;

  function showImage(index: number) {
    setActiveIndex((index + images.length) % images.length);
    setZoomed(false);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (!multiple || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showImage(activeIndex + (event.key === 'ArrowRight' ? 1 : -1));
    }
  }

  return (
    <section
      className="product-gallery"
      aria-label={`Galeri foto ${product.name}`}
      aria-roledescription={multiple ? 'carousel' : undefined}
    >
      <div
        className={`zoom-frame${zoomed ? ' is-zoomed' : ''}`}
        onTouchStart={(event) => {
          touchStart.current =
            event.touches.length === 1
              ? { x: event.touches[0].clientX, y: event.touches[0].clientY }
              : null;
        }}
        onTouchCancel={() => {
          touchStart.current = null;
        }}
        onTouchEnd={(event) => {
          const start = touchStart.current;
          touchStart.current = null;
          if (!start || zoomed || !multiple || !event.changedTouches[0]) return;
          const dx = event.changedTouches[0].clientX - start.x;
          const dy = event.changedTouches[0].clientY - start.y;
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
            showImage(activeIndex + (dx < 0 ? 1 : -1));
          }
        }}
        onPointerMove={(event) => {
          if (event.pointerType === 'touch') return;
          const bounds = event.currentTarget.getBoundingClientRect();
          event.currentTarget.style.setProperty(
            '--zx',
            `${((event.clientX - bounds.left) / bounds.width) * 100}%`,
          );
          event.currentTarget.style.setProperty(
            '--zy',
            `${((event.clientY - bounds.top) / bounds.height) * 100}%`,
          );
        }}
      >
        <div className="gallery-track" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
          {images.map((src, index) => (
            <figure
              className="gallery-slide"
              key={src}
              aria-roledescription="slide"
              aria-label={`${index + 1} dari ${images.length}`}
              aria-hidden={activeIndex !== index}
            >
              <img
                id={activeIndex === index ? 'main-photo' : undefined}
                src={src}
                alt={`${product.name} — foto ${index + 1} dari ${images.length}`}
                width="800"
                height="800"
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                draggable={false}
              />
            </figure>
          ))}
        </div>
        <button
          className="zoom-toggle"
          type="button"
          aria-pressed={zoomed}
          onKeyDown={handleKeyDown}
          onClick={() => setZoomed((value) => !value)}
        >
          {zoomed ? 'Kecilkan foto' : 'Perbesar foto'}
        </button>
      </div>
      {multiple && (
        <>
          <div className="gallery-navigation">
            <button
              type="button"
              aria-label="Foto sebelumnya"
              onKeyDown={handleKeyDown}
              onClick={() => showImage(activeIndex - 1)}
            >
              <span aria-hidden="true">←</span>
            </button>
            <span aria-live="polite" aria-atomic="true">
              Foto {activeIndex + 1} / {images.length}
            </span>
            <button
              type="button"
              aria-label="Foto berikutnya"
              onKeyDown={handleKeyDown}
              onClick={() => showImage(activeIndex + 1)}
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
          <div className="gallery-thumbs">
            {images.map((src, index) => (
              <button
                key={src}
                type="button"
                aria-label={`Lihat foto ${index + 1} dari ${images.length}`}
                aria-pressed={activeIndex === index}
                onKeyDown={handleKeyDown}
                onClick={() => showImage(index)}
              >
                <img src={src} alt="" width="70" height="70" loading="lazy" />
              </button>
            ))}
          </div>
          <p className="gallery-hint">
            Geser foto atau gunakan tombol panah untuk melihat sudut lainnya.
          </p>
        </>
      )}
      <div className="gallery-caption">
        <span>
          <i />
          Custom desain &amp; logo
        </span>
      </div>
    </section>
  );
}
