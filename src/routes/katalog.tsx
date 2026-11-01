import { seoHead } from '@/lib/seo';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import Catalog from '@/features/catalog';
const searchSchema = z.object({ q: z.string().max(120).catch('').default('') });
export const Route = createFileRoute('/katalog')({
  loaderDeps: ({ search }) => ({ q: search.q }),
  loader: ({ deps }) => deps,
  headers: () => ({ 'Cache-Control': 'private, no-store' }),
  head: ({ loaderData }) =>
    seoHead({
      title: loaderData?.q
        ? `Hasil pencarian ${loaderData.q}`
        : 'Katalog Box Packaging, Cetak Digital & Kalender Jakarta',
      description:
        'Jelajahi box packaging custom, banner, spanduk, backdrop, serta kalender meja dan dinding dari Line Art Media di Jakarta Pusat.',
      path: '/katalog',
      noindex: Boolean(loaderData?.q),
    }),
  validateSearch: searchSchema,
  component: CatalogRoute,
});
function CatalogRoute() {
  const { q } = Route.useSearch();
  return <Catalog key={q} initialQuery={q} />;
}
