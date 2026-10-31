import type { CSSProperties } from 'react';
import { masterData, type Product } from '@/data';
import { WhatsAppIcon } from '@/shared/Icons';
import { formatPrice } from '@/utils/format';
import { useProductConfiguration } from '../hooks/useProductConfiguration';
export function ProductConfiguration({ product }: { product: Product }) {
  const { options, update, color, setColor, quote, sizeLabel, submit, hydrated } =
    useProductConfiguration(product);
  return (
    <div className="configuration">
      <h2>Sesuaikan pesananmu</h2>
      <form onSubmit={submit}>
        <fieldset className="option-group">
          <legend>
            Ukuran <span>· panjang × lebar{product.kind === 'calendar' ? '' : ' × tinggi'}</span>
          </legend>
          <div className="choice-row">
            {product.sizes.map((size) => (
              <label className="choice" key={size.id} aria-label={size.label}>
                <input
                  type="radio"
                  name="size"
                  value={size.id}
                  checked={options.size === size.id}
                  onChange={() => update('size', size.id)}
                />
                <span>
                  <strong>{size.label.split(' · ')[0]}</strong>
                  <small>
                    {size.id === 'custom' ? 'Ukuran sendiri' : size.label.split(' · ')[1]}
                  </small>
                </span>
              </label>
            ))}
          </div>
          <div className="custom-dimensions" hidden={options.size !== 'custom'}>
            {options.dimensions.map((dimension, index) => (
              <label key={index}>
                {['Panjang', 'Lebar', 'Tinggi'][index]} (cm)
                <input
                  type="number"
                  min="1"
                  max={masterData.quoteRules.maxDimensionCm}
                  step="0.1"
                  disabled={options.size !== 'custom'}
                  value={Number.isFinite(dimension) ? dimension : ''}
                  onChange={(event) =>
                    update(
                      'dimensions',
                      options.dimensions.map((value, position) =>
                        position === index ? event.target.valueAsNumber : value,
                      ),
                    )
                  }
                />
              </label>
            ))}
          </div>
        </fieldset>
        <div className="option-group">
          <label className="field-label" htmlFor="material">
            {product.kind === 'calendar' ? 'Bahan kertas' : 'Bahan box'}
          </label>
          <select
            id="material"
            className="select-field"
            value={options.material}
            onChange={(event) => update('material', Number(event.target.value))}
          >
            {product.materials.map((material, index) => (
              <option value={index} key={material.label}>
                {material.label}
              </option>
            ))}
          </select>
        </div>
        {(['finish', 'insert'] as const).map((field) => (
          <fieldset className="option-group" key={field}>
            <legend>
              {field === 'finish'
                ? 'Finishing'
                : product.kind === 'calendar'
                  ? 'Isi kalender'
                  : 'Insert bagian dalam'}
            </legend>
            <div className="choice-row">
              {(field === 'finish' ? product.finishes : product.inserts).map((item, index) => (
                <label className="choice" key={item.label} aria-label={item.label}>
                  <input
                    type="radio"
                    name={field}
                    value={index}
                    checked={options[field] === index}
                    onChange={() => update(field, index)}
                  />
                  <span>
                    <strong>{item.label}</strong>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}
        <fieldset className="option-group">
          <legend>{product.kind === 'calendar' ? 'Warna dudukan' : 'Warna pelapis'}</legend>
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
        <div className="option-group">
          <label className="field-label" htmlFor="quantity">
            Jumlah pesanan
          </label>
          <div className="quantity-line">
            <input
              className="quantity-input"
              id="quantity"
              type="number"
              min={product.moq}
              max={masterData.quoteRules.maxQuantity}
              step="1"
              value={Number.isFinite(options.quantity) ? options.quantity : ''}
              onChange={(event) => update('quantity', event.target.valueAsNumber)}
              required
            />
            <div className="quantity-presets">
              {[...new Set([product.moq, 250, 500])].map((quantity) => (
                <button type="button" key={quantity} onClick={() => update('quantity', quantity)}>
                  {quantity} pcs
                </button>
              ))}
            </div>
          </div>
          {!quote.valid && (
            <p className="validation-error" role="alert">
              {quote.error}
            </p>
          )}
        </div>
        <section className="quote-summary" aria-label="Ringkasan pesanan">
          <h3>Ringkasan pesanan</h3>
          <div className="quote-lines">
            <div>
              <span>Ukuran</span>
              <b>{sizeLabel}</b>
            </div>
            <div>
              <span>Jumlah</span>
              <b>{Number.isFinite(options.quantity) ? options.quantity : '—'} pcs</b>
            </div>
            <div>
              <span>Harga per pcs</span>
              <b>
                {quote.valid
                  ? quote.unit === null
                    ? 'Minta penawaran'
                    : formatPrice(quote.unit)
                  : '—'}
              </b>
            </div>
          </div>
          <div className="quote-total">
            <span>Estimasi total</span>
            <div>
              <strong aria-live="polite">
                {quote.valid
                  ? quote.total === null
                    ? 'Minta penawaran'
                    : formatPrice(quote.total)
                  : '—'}
              </strong>
            </div>
          </div>
          <button className="button wide" type="submit" disabled={!hydrated || !quote.valid}>
            <WhatsAppIcon />
            Konsultasi pesanan via WhatsApp
          </button>
          <p className="quote-notice">
            Simulasi memakai harga contoh. Harga final dan jadwal dikonfirmasi bersama tim.
          </p>
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
