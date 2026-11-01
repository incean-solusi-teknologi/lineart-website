import { seoHead, businessSchema } from '@/lib/seo';
import { getProduct } from '@/data';
import { createFileRoute } from '@tanstack/react-router';
import Home from '@/features/home';
export const Route = createFileRoute('/')({
  head: () =>
    seoHead({
      title: 'Box Packaging Custom untuk Produk dan Hadiah',
      description:
        'Box packaging custom untuk produk, hampers, dan hadiah perusahaan di Jakarta, Bogor, Depok, Tangerang, dan Bekasi. Berlokasi di Senen, Jakarta Pusat.',
      path: '/',
      image: getProduct('box-hadiah-perusahaan')!.image,
      schemas: [businessSchema()],
    }),
  component: Home,
});
