import { useState, type FormEvent } from 'react';
import { useNavigate, useHydrated } from '@tanstack/react-router';
import { type Product } from '@/data';
import { calculateQuote, type QuoteOptions } from '../utils/calculateQuote';
export function useProductConfiguration(product: Product) {
  const navigate = useNavigate();
  const hydrated = useHydrated();
  const [options, setOptions] = useState<QuoteOptions>({
    quantity: product.moq,
    size: 'standard',
    dimensions: product.size.match(/[\d.]+/g)!.map(Number),
    material: 0,
    finish: 0,
    insert: 0,
  });
  const [color, setColor] = useState(product.colors[0].label);
  function update<K extends keyof QuoteOptions>(key: K, value: QuoteOptions[K]) {
    setOptions((previous) => ({ ...previous, [key]: value }));
  }
  const quote = calculateQuote(product, options);
  const sizeLabel =
    options.size === 'custom'
      ? `Custom ${options.dimensions.join(' × ')} cm`
      : (product.sizes.find((size) => size.id === options.size)?.label ?? '');
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!quote.valid) return;
    const message = [
      `Halo LINE · Art media, saya ingin konsultasi ${product.name}.`,
      `Ukuran: ${sizeLabel}`,
      `Bahan: ${product.materials[options.material].label}`,
      `Finishing: ${product.finishes[options.finish].label}`,
      `${product.kind === 'calendar' ? 'Isi kalender' : 'Insert'}: ${product.inserts[options.insert].label}`,
      `Warna: ${color}`,
      `Jumlah: ${options.quantity} pcs`,
      '',
      'Mohon informasi harga final dan jadwal produksinya.',
    ].join('\n');
    await navigate({ to: '/kontak', search: { pesan: message, kembali: product.slug } });
  }
  return { options, update, color, setColor, quote, sizeLabel, submit, hydrated };
}
