import type { Product } from '@/data';
export function ProductSpecifications({ product }: { product: Product }) {
  return (
    <section className="detail-lower">
      <div className="product-facts">
        <div>
          <h2>Detail produk</h2>
          <dl className="facts">
            {[
              ['Referensi model', product.modelLabel],
              ...(product.useCase ? [['Cocok untuk', product.useCase]] : []),
              ['Ukuran', product.size],
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
