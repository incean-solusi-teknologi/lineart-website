import { useState, type CSSProperties } from 'react';
import { whatsappLink, type Product } from '@/data';
import { WhatsAppIcon } from '@/shared/Icons';
export function ProductConfiguration({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors[0]?.label ?? '');
  const isBox = product.kind === 'packaging';
  const message = [
    `Halo LINE · Art media, saya tertarik dengan ${product.name}.`,
    ...(isBox && color
      ? [
          `Warna pilihan: ${color === 'Warna lainnya' ? 'Warna lainnya (ingin konsultasi warna custom)' : color}`,
        ]
      : []),
    '',
    'Boleh minta informasi harga, minimum pemesanan, dan estimasi waktu produksinya? Terima kasih.',
  ].join('\n');
  return (
    <div className="configuration">
      {isBox && product.colors.length > 0 && (
        <fieldset className="option-group">
          <legend>Warna kemasan</legend>
          <div className="color-choices">
            {product.colors.map((item) => (
              <label
                key={item.label}
                className="color-choice"
                style={{ '--swatch': item.hex } as CSSProperties}
                title={item.label}
              >
                <input
                  type="radio"
                  name="color"
                  value={item.label}
                  aria-label={'Warna ' + item.label}
                  checked={color === item.label}
                  onChange={() => setColor(item.label)}
                />
                <span />
              </label>
            ))}
            <label className="color-choice color-choice-custom">
              <input
                type="radio"
                name="color"
                value="Warna lainnya"
                aria-label="Warna lainnya"
                checked={color === 'Warna lainnya'}
                onChange={() => setColor('Warna lainnya')}
              />
              <span>Warna lainnya</span>
            </label>
          </div>
          <p className="color-name" aria-live="polite">
            {color === 'Warna lainnya' ? 'Warna khusus dibahas saat konsultasi.' : color}
          </p>
        </fieldset>
      )}
      <a
        className="button wide"
        href={whatsappLink(message)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <WhatsAppIcon />
        Konsultasi produk via WhatsApp
      </a>
      <p className="quote-notice">Harga dinegosiasikan bersama tim sesuai kebutuhan pesanan.</p>
    </div>
  );
}
