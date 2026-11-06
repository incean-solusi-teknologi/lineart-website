import type { Product } from '@/data';
export function ProductSpecifications({ product }: { product: Product }) {
  const facts = [
    ...(product.modelLabel && product.modelLabel.toLowerCase() !== product.name.toLowerCase()
      ? [['Referensi model', product.modelLabel]]
      : []),
    ...(product.useCase ? [['Cocok untuk', product.useCase]] : []),
    ...(product.size ? [['Ukuran', product.size]] : []),
  ];
  return (
    <section className="detail-lower">
      <div className="product-facts">
        <div>
          <h2>Detail produk</h2>
          <dl className="facts">
            {facts.map(([label, value]) => (
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
