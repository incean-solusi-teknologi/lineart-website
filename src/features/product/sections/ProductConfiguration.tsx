import { useState, type CSSProperties } from 'react';
import { Link } from '@tanstack/react-router';
import type { Product } from '@/data';
import { WhatsAppIcon } from '@/shared/Icons';
export function ProductConfiguration({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors[0]?.label ?? '');
  const isCalendar = product.kind === 'calendar';
  const isBox = product.kind === 'packaging';
  const message = [
    'Halo LINE Art media, saya ingin konsultasi ' + product.name + '.',
    ...(isBox && color ? ['Warna: ' + color] : []),
    'Saya ingin membahas kebutuhan pesanan, negosiasi harga, dan jadwal produksi.',
  ].join('\n');
  return (
    <div className="configuration">
      <h2>
        {isBox
          ? 'Warna kemasan kamu'
          : isCalendar
            ? 'Custom kalender kamu'
            : 'Custom kebutuhan cetak'}
      </h2>
      {!isBox ? (
        <p className="product-description">
          {isCalendar
            ? 'Konsultasikan tahun, desain halaman, logo, ukuran, dan jumlah kalender yang dibutuhkan.'
            : 'Konsultasikan desain, ukuran, lokasi pemasangan, dan kelengkapan display yang dibutuhkan.'}
        </p>
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
      <Link className="button wide" to="/kontak" search={{ pesan: message, kembali: product.slug }}>
        <WhatsAppIcon />
        Konsultasi produk via WhatsApp
      </Link>
      <p className="quote-notice">Harga dinegosiasikan bersama tim sesuai kebutuhan pesanan.</p>
    </div>
  );
}
