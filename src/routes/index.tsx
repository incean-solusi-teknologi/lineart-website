import { seoHead, businessSchema } from '@/lib/seo';
import { createFileRoute } from '@tanstack/react-router';
import Home from '@/features/home';
export const Route = createFileRoute('/')({
  head: () =>
    seoHead({
      title: 'Percetakan Umum & Packaging Custom Jakarta',
      description:
        'Layanan percetakan dan packaging Jakarta: box custom, cetak digital, banner, spanduk, serta kalender. Konsultasikan kebutuhan cetak bersama LINE · Art media.',
      path: '/',
      image: '/media/home-reference/hero.jpg',
      schemas: [businessSchema()],
    }),
  component: Home,
});
