import type { Product } from '@/data';
import { calculateQuote } from '../utils/calculateQuote';
import { formatPrice } from '@/utils/format';
export function ProductSpecifications({ product }: { product: Product }) {
  return (
    <section className="detail-lower">
      <div className="product-facts">
        <div>
          <h2>Detail produk</h2>
          <dl className="facts">
            {[
              ['Model', product.name],
              ['Ukuran standar', product.size],
              ['Kustomisasi', 'Desain, logo, ukuran & warna'],
              ['File desain', 'PDF / AI siap cetak'],
            ].map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h2>Gambaran harga per jumlah</h2>
          <table className="price-table">
            <thead>
              <tr>
                <th>Jumlah pesanan</th>
                <th>Harga / pcs</th>
              </tr>
            </thead>
            <tbody>
              {[product.moq, 250, 500].map((quantity, index) => {
                const quote = calculateQuote(product, {
                  quantity,
                  size: 'standard',
                  dimensions: [],
                  material: 0,
                  finish: 0,
                  insert: 0,
                });
                return (
                  <tr key={quantity}>
                    <td>
                      {index === 0
                        ? `${product.moq}–249 pcs`
                        : index === 1
                          ? '250–499 pcs'
                          : '500 pcs atau lebih'}
                    </td>
                    <td>
                      {quote.valid && quote.unit !== null
                        ? formatPrice(quote.unit)
                        : 'Minta penawaran'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="fine">Harga contoh untuk simulasi, belum merupakan penawaran final.</p>
        </div>
      </div>
    </section>
  );
}
