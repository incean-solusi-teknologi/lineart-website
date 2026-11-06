import { useState, type CSSProperties } from 'react';
import { whatsappLink, type Product } from '@/data';
import { WhatsAppIcon } from '@/shared/Icons';
export function ProductConfiguration({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors[0]?.label ?? '');
  const isCalendar = product.kind === 'calendar';
  const isBox = product.kind === 'packaging';
  const message = [
    `Halo LINE · Art media, saya tertarik dengan ${product.name}.`,
    ...(isBox && color ? [`Warna pilihan: ${color}`] : []),
    '',
    'Boleh minta informasi harga, minimum pemesanan, dan estimasi waktu produksinya? Terima kasih.',
  ].join('\n');
  return (
    <div className="configuration">
      <h2>{isBox ? 'Warna untuk box kamu' : isCalendar ? 'Tentang kalender' : 'Tentang produk'}</h2>
      {!isBox ? (
        <p className="product-description">{product.description}</p>
      ) : (
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
                  aria-label={'Warna ' + item.label}
                  checked={color === item.label}
                  onChange={() => setColor(item.label)}
                />
                <span />
              </label>
            ))}
            <span className="color-name">{color}</span>
          </div>
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
