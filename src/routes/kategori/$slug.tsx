import { categoryHead } from '@/features/catalog/seo';
import { createFileRoute, notFound } from '@tanstack/react-router';
import Catalog from '@/features/catalog';
import { getCategory } from '@/data';
export const Route = createFileRoute('/kategori/$slug')({
  loader: ({ params }) => {
    const category = getCategory(params.slug);
    if (!category) throw notFound();
    return category;
  },
  head: ({ loaderData }) => categoryHead(loaderData),
  component: CategoryRoute,
});
function CategoryRoute() {
  const category = Route.useLoaderData();
  return <Catalog key={category.slug} category={category} />;
}
