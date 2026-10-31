import { createFileRoute, notFound, redirect } from '@tanstack/react-router';
import { legacyDestination } from '@/data/paths';
import { seoHead } from '@/lib/seo';
export const Route = createFileRoute('/$')({
  loader: ({ location }) => {
    const destination = legacyDestination(location.pathname);
    if (destination) throw redirect({ href: destination + location.searchStr, statusCode: 301 });
    throw notFound();
  },
  head: () =>
    seoHead({
      title: 'Halaman tidak ditemukan',
      description: 'Halaman yang Anda cari belum tersedia.',
      noindex: true,
    }),
});
