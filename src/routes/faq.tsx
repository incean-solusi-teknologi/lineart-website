import { seoHead, breadcrumbSchema } from '@/lib/seo';
import { createFileRoute } from '@tanstack/react-router';
import Faq from '@/features/faq';
export const Route = createFileRoute('/faq')({
  head: () =>
    seoHead({
      title: 'FAQ Packaging Custom Jakarta',
      description:
        'Jawaban tentang pemesanan packaging custom, bahan, desain, finishing, dan pengiriman LINE · Art media di Jakarta.',
      path: '/faq',
      schemas: [breadcrumbSchema([{ label: 'FAQ', path: '/faq' }])],
    }),
  component: Faq,
});
