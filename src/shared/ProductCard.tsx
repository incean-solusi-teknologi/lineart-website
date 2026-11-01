import type { Product } from '@/data';
export function ProductCard({ product }: { product: Product }) {
  const href = `/produk/${product.slug}`;
  return (
    <article className="product-card">
      <a href={href}>
        <div className="card-photo">
          <img src={product.image} alt={product.name} loading="lazy" width="400" height="400" />
        </div>
      </a>
      <div className="card-info">
        <h3>
          <a href={href}>{product.name}</a>
        </h3>
        {product.generatedIllustration && <p className="prototype-note">Ilustrasi konsep</p>}
        <p className="card-size">{product.useCase || product.size}</p>
        <a className="button secondary wide" href={href}>
          Lihat detail
        </a>
      </div>
    </article>
  );
}
