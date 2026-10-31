import { seoHead, breadcrumbSchema } from '@/lib/seo';
import { createFileRoute } from '@tanstack/react-router';
import Articles from '@/features/articles';
export const Route = createFileRoute('/artikel/')({
  head: () =>
    seoHead({
      title: 'Artikel dan Panduan Packaging Custom',
      description:
        'Panduan memilih bahan, finishing, desain siap cetak, dan proses produksi packaging custom.',
      path: '/artikel',
      schemas: [breadcrumbSchema([{ label: 'Artikel', path: '/artikel' }])],
    }),
  component: () => <Articles />,
});
