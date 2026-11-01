import { productHead } from '@/features/product/seo';
import { createFileRoute, notFound, redirect } from '@tanstack/react-router';
import { getProduct } from '@/data';
import ProductDetail from '@/features/product';
export const Route = createFileRoute('/produk/$slug')({
  loader: ({ params }) => {
    if (params.slug === 'box-produk-brand')
      throw redirect({ href: '/produk/box-parfum', statusCode: 301 });
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => productHead(loaderData),
  component: ProductRoute,
});
function ProductRoute() {
  const product = Route.useLoaderData();
  return <ProductDetail key={product.slug} product={product} />;
}
