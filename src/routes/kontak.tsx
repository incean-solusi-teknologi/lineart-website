import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import Contact from '@/features/contact';
const searchSchema = z.object({
  pesan: z.string().max(4000).catch('').default(''),
  kembali: z.string().max(120).catch('').default(''),
});
export const Route = createFileRoute('/kontak')({
  validateSearch: searchSchema,
  headers: () => ({ 'Cache-Control': 'private, no-store' }),
  component: ContactRoute,
});
function ContactRoute() {
  const { pesan, kembali } = Route.useSearch();
  return <Contact message={pesan} returnSlug={kembali} />;
}
