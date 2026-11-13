import { seoHead, breadcrumbSchema } from '@/lib/seo';
import { createFileRoute } from '@tanstack/react-router';
import Faq from '@/features/faq';
export const Route = createFileRoute('/faq')({
  head: () =>
    seoHead({
      title: 'FAQ Pemesanan Percetakan & Packaging',
      description:
        'Panduan pemesanan cetak digital, kalender, banner, dan packaging. Informasi desain, harga, produksi, serta pengiriman ke seluruh Indonesia.',
      path: '/faq',
      schemas: [breadcrumbSchema([{ label: 'FAQ', path: '/faq' }])],
    }),
  component: Faq,
});
