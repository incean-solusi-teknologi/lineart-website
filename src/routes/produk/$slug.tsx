import { createFileRoute, notFound } from '@tanstack/react-router';
import { getProduct } from '@/data';
import ProductDetail from '@/features/product';
export const Route = createFileRoute('/produk/$slug')({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return product;
  },
  component: ProductRoute,
});
function ProductRoute() {
  const product = Route.useLoaderData();
  return <ProductDetail key={product.slug} product={product} />;
}
