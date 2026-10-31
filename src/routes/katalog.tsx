import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import Catalog from '@/features/catalog';
const searchSchema = z.object({ q: z.string().max(120).catch('').default('') });
export const Route = createFileRoute('/katalog')({
  validateSearch: searchSchema,
  component: CatalogRoute,
});
function CatalogRoute() {
  const { q } = Route.useSearch();
  return <Catalog key={q} initialQuery={q} />;
}
