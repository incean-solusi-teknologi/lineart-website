import { seoHead, businessSchema } from '@/lib/seo';
import { createFileRoute } from '@tanstack/react-router';
import Home from '@/features/home';
export const Route = createFileRoute('/')({
  head: () =>
    seoHead({
      title: 'Packaging Jakarta, Custom Box Kali Baru',
      description:
        'Packaging custom di Kali Baru, dekat Pasar Senen, Jakarta Pusat. Pilih gift box, box hampers, box perhiasan, dan kalender untuk kebutuhan brand Anda.',
      path: '/',
      schemas: [businessSchema()],
    }),
  component: Home,
});
