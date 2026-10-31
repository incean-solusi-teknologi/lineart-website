import type { ErrorComponentProps } from '@tanstack/react-router';
export function ContentLoading() {
  return (
    <main className="container status-page">
      <output>Memuat halaman…</output>
    </main>
  );
}
export function ErrorComponent({ reset }: ErrorComponentProps) {
  return (
    <main className="container status-page">
      <h1>Halaman belum dapat dimuat.</h1>
      <p>Coba muat ulang beberapa saat lagi.</p>
      <button type="button" className="button" onClick={reset}>
        Coba lagi
      </button>
    </main>
  );
}
export function NotFound() {
  return (
    <main className="container status-page">
      <h1>Halaman tidak ditemukan.</h1>
      <p>Alamat mungkin berubah atau produk belum tersedia.</p>
      <a className="button" href="/">
        Kembali ke beranda
      </a>
    </main>
  );
}
