import { useState } from 'react';
import type { Product } from '@/data';
export function ProductGallery({ product }: { product: Product }) {
  const [image, setImage] = useState(product.gallery[0]);
  const [zoomed, setZoomed] = useState(false);
  return (
    <section className="product-gallery" aria-label="Galeri foto produk">
      <div
        className={`zoom-frame${zoomed ? ' is-zoomed' : ''}`}
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
        <img
          id="main-photo"
          src={image}
          alt={product.name}
          width="800"
          height="800"
          fetchPriority="high"
        />
        <button
          className="zoom-toggle"
          type="button"
          aria-pressed={zoomed}
          onClick={() => setZoomed((value) => !value)}
        >
          {zoomed ? 'Kecilkan foto' : 'Perbesar foto'}
        </button>
      </div>
      <div className="gallery-thumbs">
        {product.gallery.map((src, index) => (
          <button
            key={src}
            type="button"
            aria-label={`Lihat foto ${index + 1}`}
            aria-pressed={image === src}
            onClick={() => {
              setImage(src);
              setZoomed(false);
            }}
          >
            <img src={src} alt="" width="70" height="70" />
          </button>
        ))}
      </div>
      <div className="gallery-caption">
        <span>
          <i />
          Custom desain &amp; logo
        </span>
        <span>
          <i />
          Minimum {product.moq} pcs
        </span>
      </div>
    </section>
  );
}
