import type { CSSProperties } from 'react';
import type { Product } from '@/data';
import { WhatsAppIcon } from '@/shared/Icons';
import { useProductConfiguration } from '../hooks/useProductConfiguration';
export function ProductConfiguration({ product }: { product: Product }) {
  const { color, setColor, submit, hydrated } = useProductConfiguration(product);
  return (
    <div className="configuration">
      <h2>Sesuaikan pesananmu</h2>
      <form onSubmit={submit}>
        <fieldset className="option-group">
          <legend>Warna</legend>
          <div className="color-choices">
            {product.colors.map((item) => (
              <label
                key={item.label}
                className="color-choice"
                style={{ '--swatch': item.hex } as CSSProperties}
              >
                <input
                  type="radio"
                  name="color"
                  value={item.label}
                  aria-label={`Warna ${item.label}`}
                  checked={color === item.label}
                  onChange={() => setColor(item.label)}
                />
                <span />
              </label>
            ))}
            <span className="color-name">{color}</span>
          </div>
        </fieldset>
        <section className="quote-summary" aria-label="Konsultasi pesanan">
          <button className="button wide" type="submit" disabled={!hydrated}>
            <WhatsAppIcon />
            Konsultasi pesanan via WhatsApp
          </button>
          <p className="quote-notice">Harga dinegosiasikan bersama tim sesuai kebutuhan pesanan.</p>
        </section>
      </form>
      <noscript>
        <p>
          Aktifkan JavaScript untuk konfigurator, atau <a href="/kontak">buka halaman konsultasi</a>
          .
        </p>
      </noscript>
    </div>
  );
}
