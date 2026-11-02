import type { Product } from '@/data';
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
      </div>
    </section>
  );
}
