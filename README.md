# LINE · Art media

Website marketing dan katalog packaging Jakarta berbasis TanStack Start, React, TypeScript, dan Bun. Visual v5 dipindahkan menjadi komponen React dengan struktur berdasarkan fitur. Target lokalnya adalah Kali Baru/Kalibaru, dekat Pasar Senen, Jakarta Pusat.

## Menjalankan project

Gunakan Bun 1.3.14 atau versi kompatibel yang lebih baru.

```sh
bun install --frozen-lockfile
cp .env.example .env.local
bun run dev
```

Buka `http://127.0.0.1:3000`. TanStack Router dan Query Devtools hanya dimuat saat development.

```sh
bun run build
HOST=127.0.0.1 PORT=4010 bun run start
```

Build dan preview dijalankan menggunakan Bun. Renderer untuk preset Bun memerlukan Bun saat dijalankan; jangan menjalankan output tersebut dengan Node.

## Master data

Edit [src/constants/data.json](src/constants/data.json) untuk mengubah profil bisnis, konten beranda, lima kategori, 24 produk beserta opsi konfigurasi dan harga simulasi, lima artikel, 31 jawaban FAQ, dan contoh logo klien. Seluruh data awal berasal dari prototipe dan ditandai sebagai dummy.

`src/data/index.ts` menyediakan akses dan type yang diturunkan dari JSON. `src/data/paths.ts` menggunakan dataset yang sama untuk daftar halaman, prerender, sitemap, dan pemetaan URL lama. Konten tidak diambil dari API; Hey API, API generator, dan TanStack Form ditunda.

Harga dan MOQ belum merupakan penawaran final. Nomor WhatsApp belum diisi: konsultasi menghasilkan pratinjau yang bisa disalin, tanpa mengirim pesan. Setelah nomor bisnis tersedia, isi `business.whatsapp` menggunakan angka internasional tanpa `+`, spasi, atau tanda baca, misalnya format `62…`.

## Struktur dan aset

- `src/routes`: konfigurasi route, loader, metadata, dan header HTTP.
- `src/features`: UI dan logika untuk home, catalog, product, articles, about, FAQ, serta contact.
- `src/shared` dan `src/layout`: komponen lintas fitur dan shell situs.
- `src/styles`: Tailwind CSS 4, semantic tokens, serta stylesheet visual yang dimigrasikan.
- `public/media`: gambar, font lokal, dan logo yang dipakai situs. `assets` menyimpan gambar asli yang diberikan sebelumnya.
- `tests`: pemeriksaan perhitungan dan audit HTML/HTTP produksi.

Konfigurasi shadcn tersedia dalam `components.json`. Folder form dan UI disediakan; komponen ditambahkan ketika diperlukan. `.agents/` diabaikan oleh Git. Versi HTML dan scripts lama disimpan dalam commit baseline, lalu dihapus dari working tree agar tidak menjadi halaman duplikat.

## Rendering, SEO, dan Vercel

Sebanyak **38 halaman** diprerender: beranda, kategori, produk, artikel, tentang kami, dan FAQ. `/katalog` memakai SSR agar pencarian berdasarkan query URL tersedia pada HTML awal. `/kontak` memakai SSR untuk pratinjau pesan. Kedua route memakai `private, no-store` agar respons berdasarkan query tidak masuk cache publik. Slug tidak valid menghasilkan HTTP 404; URL HTML lama dialihkan permanen melalui route fallback.

Setiap halaman memiliki judul/deskripsi spesifik. Canonical absolut, metadata gambar berbagi, dan JSON-LD diterbitkan setelah `VITE_SITE_URL` berisi origin yang valid. Harga dummy tidak dimasukkan sebagai `Offer`. Sitemap tersedia di `/sitemap.xml`; isinya kosong selama indexing belum diaktifkan. Robots tetap mengizinkan crawling agar tag `noindex` dapat dibaca.

Import repository ke Vercel dengan framework TanStack Start. `vercel.json` menetapkan Bun, instalasi dengan lockfile, build, dan kebijakan cache halaman konsultasi. Integrasi Vercel mengikuti dokumentasi resmi melalui Nitro. Adapter `nitro@3.0.261029-rc` saat ini merupakan rilis RC; versinya dipin untuk menjaga hasil build. Core framework dan tooling menggunakan rilis stable yang kompatibel.

**ISR belum diaktifkan pada konten repository yang statis.** Mengubah JSON tetap memerlukan build/deploy baru. Saat ada konten dari CMS/API yang dapat berubah saat runtime, pilih route yang memerlukan ISR, verifikasi dukungan adapter dan output prerender function Vercel, lalu tetapkan kebijakan revalidasi. Cache header biasa tidak sama dengan native ISR Vercel. Perilaku CDN dan ISR perlu diperiksa pada deployment sebenarnya.

## Mengaktifkan indexing produksi

1. Ganti atau hapus data contoh, termasuk harga/MOQ, informasi bisnis, dan logo klien fiktif. Pastikan isi artikel serta klaim perusahaan sudah ditinjau.
2. Set `status.dummy` ke `false` dan set `businessApproved`, `pricingApproved`, serta `clientsApproved` ke `true` setelah datanya benar.
3. Isi `VITE_SITE_URL` dengan origin domain produksi HTTPS dan set `VITE_SITE_INDEXABLE=true` pada environment Production Vercel.
4. Deploy ulang dan periksa HTML, canonical, JSON-LD, sitemap, robots, serta status HTTP.

Environment diturunkan dari `VERCEL_ENV`. Preview/development tetap `noindex`; `VITE_DEPLOYMENT_ENV` hanya diperlukan untuk simulasi lokal. Hasil pencarian internal dan pratinjau konsultasi selalu `noindex`. Tidak ada domain, jam buka, jarak, rating, penulis, atau tanggal publikasi yang dikarang untuk mengisi metadata.

## Pemeriksaan

```sh
bun run typecheck
bun run lint
bun run format:check
bun run test
```

Setelah build dan server produksi lokal di port 4010 berjalan:

```sh
bun run audit
```

Audit memeriksa 40 halaman, 38 file prerender, judul unik, HTML awal, metadata, tautan/aset internal, status 404, redirect, pencarian, serta keamanan dan cache pratinjau pesan. Audit ini mengharapkan data dummy masih `noindex`. Untuk audit build dengan domain pengujian, isi `AUDIT_SITE_ORIGIN` sesuai `VITE_SITE_URL` pada build tersebut.

Husky dan Nano Staged menjalankan Oxlint/Oxfmt pada file yang di-stage. Gunakan Conventional Commits per fitur/tahap. Build dan audit lokal tidak membuktikan indexing Google, ranking, performa pengguna nyata, atau perilaku CDN Vercel.
