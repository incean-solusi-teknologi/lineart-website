import { useRef, useState } from 'react';
import { business, getProduct } from '@/data';
import { Breadcrumbs } from '@/shared/Breadcrumbs';
export function productReturnPath(slug: string) {
  return getProduct(slug) ? `/produk/${slug}` : '/';
}
export default function Contact({ message, returnSlug }: { message: string; returnSlug: string }) {
  const textarea = useRef<HTMLTextAreaElement>(null);
  const [status, setStatus] = useState('');
  const text = message || `Halo ${business.name}, saya ingin konsultasi packaging custom.`;
  const whatsapp = /^[1-9]\d{7,14}$/.test(business.whatsapp)
    ? `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`
    : null;
  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus('Pesan tersalin.');
    } catch {
      textarea.current?.focus();
      textarea.current?.select();
      setStatus('Pilih dan salin pesan di atas.');
    }
  }
  return (
    <main className="container">
      <Breadcrumbs items={[{ label: 'Konsultasi pesanan' }]} />
      <section className="preview-contact">
        <h1>Pesananmu sudah dirangkum.</h1>
        <p>Ukuran, bahan, finishing, dan jumlah yang dipilih akan ikut dalam pesan WhatsApp.</p>
        <label className="sr-only" htmlFor="wa-message">
          Pesan untuk WhatsApp
        </label>
        <textarea ref={textarea} id="wa-message" value={text} readOnly />
        {!whatsapp && (
          <p className="contact-note">
            Nomor WhatsApp bisnis belum diisi. Ini pratinjau pesan; belum ada pesan yang dikirim.
          </p>
        )}
        {whatsapp && (
          <a className="button" href={whatsapp} target="_blank" rel="noopener noreferrer">
            Buka WhatsApp
          </a>
        )}
        <button className="button" type="button" onClick={copyMessage}>
          Salin pesan
        </button>
        <a className="button secondary" href={productReturnPath(returnSlug)}>
          Kembali
        </a>
        <output className="copy-status" aria-live="polite">
          {status}
        </output>
      </section>
    </main>
  );
}
