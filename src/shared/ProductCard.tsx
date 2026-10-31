import type { Product } from '@/data';
import { formatPrice } from '@/utils/format';
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
        <p className="card-size">{product.size} · Custom logo</p>
        <div className="card-price">
          Mulai dari
          <strong>
            {formatPrice(product.price)}
            <small> / pcs</small>
          </strong>
        </div>
        <p className="card-moq">Minimum {product.moq} pcs</p>
        <a className="button secondary wide" href={href}>
          Pilih spesifikasi
        </a>
      </div>
    </article>
  );
}
