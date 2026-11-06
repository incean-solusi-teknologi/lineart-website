import { seoHead, businessSchema, breadcrumbSchema } from '@/lib/seo';
import { createFileRoute } from '@tanstack/react-router';
import About from '@/features/about';
export const Route = createFileRoute('/tentang-kami')({
  head: () =>
    seoHead({
      title: 'Tentang Kami, Percetakan di Kali Baru Jakarta',
      description:
        'Kenali LINE · Art media, percetakan untuk kebutuhan cetak digital, offset, dan packaging di Bungur, Senen, dekat Pasar Senen, Jakarta Pusat.',
      path: '/tentang-kami',
      image: '/media/home-reference/products.png',
      schemas: [
        businessSchema(),
        breadcrumbSchema([{ label: 'Tentang kami', path: '/tentang-kami' }]),
      ],
    }),
  component: About,
});
