import { seoHead, breadcrumbSchema } from '@/lib/seo';
import { createFileRoute } from '@tanstack/react-router';
import Faq from '@/features/faq';
export const Route = createFileRoute('/faq')({
  head: () =>
    seoHead({
      title: 'FAQ Pemesanan Box, Kalender & Cetak Digital',
      description:
        'Panduan pemesanan box packaging, kalender, banner, dan spanduk. Informasi desain, harga, jumlah pesanan, produksi, serta pengiriman di Jabodetabek.',
      path: '/faq',
      schemas: [breadcrumbSchema([{ label: 'FAQ', path: '/faq' }])],
    }),
  component: Faq,
});
