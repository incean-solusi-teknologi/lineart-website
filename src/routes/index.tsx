import { seoHead, businessSchema } from '@/lib/seo';
import { createFileRoute } from '@tanstack/react-router';
import Home from '@/features/home';
export const Route = createFileRoute('/')({
  head: () =>
    seoHead({
      title: 'Percetakan Umum di Jakarta Pusat',
      description:
        'Percetakan di Jakarta Pusat untuk cetak digital, offset, banner, kalender, buku, dan packaging custom. Konsultasikan kebutuhan Anda bersama LINE · Art media.',
      path: '/',
      image: '/media/home-reference/hero.jpg',
      schemas: [businessSchema()],
    }),
  component: Home,
});
