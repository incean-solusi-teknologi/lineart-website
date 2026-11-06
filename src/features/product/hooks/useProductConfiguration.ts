import { useState, type FormEvent } from 'react';
import { useNavigate, useHydrated } from '@tanstack/react-router';
import { type Product } from '@/data';
export function useProductConfiguration(product: Product) {
  const navigate = useNavigate();
  const hydrated = useHydrated();
  const [color, setColor] = useState(product.colors[0]?.label ?? '');
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = [
      `Halo LINE · Art media, saya ingin konsultasi ${product.name}.`,
      ...(color ? [`Warna: ${color}`] : []),
      '',
      'Saya ingin membahas kebutuhan pesanan, negosiasi harga, dan jadwal produksi.',
    ].join('\n');
    await navigate({ to: '/kontak', search: { pesan: message, kembali: product.slug } });
  }
  return { color, setColor, submit, hydrated };
}
