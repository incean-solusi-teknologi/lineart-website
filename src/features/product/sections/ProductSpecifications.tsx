import type { Product } from '@/data';
export function ProductSpecifications({ product }: { product: Product }) {
  const facts = [
    ...(product.modelLabel && product.modelLabel.toLowerCase() !== product.name.toLowerCase()
      ? [['Referensi model', product.modelLabel]]
      : []),
    ...(product.useCase ? [['Cocok untuk', product.useCase]] : []),
    ...product.specifications.map(({ label, value }) => [label, value]),
    ...(product.size ? [['Ukuran', product.size]] : []),
  ];
  return (
    <section className="detail-lower">
      <div className="product-facts">
        <div>
          <h2>Detail produk</h2>
          <dl className="facts">
            {facts.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h2>Detail pemesanan</h2>
          <p>
            Foto menampilkan contoh model dan desain. Warna, bahan, serta kelengkapan pesanan
            disepakati sesuai kebutuhan.
          </p>
          <p>
            {product.kind === 'packaging'
              ? 'Siapkan ukuran panjang, lebar, dan tinggi isi, jumlah barang, serta kebutuhan sekat atau penahan.'
              : product.kind === 'calendar'
                ? 'Siapkan tahun kalender, ukuran, jumlah lembar, logo, serta foto dan susunan halaman yang diinginkan.'
                : product.kind === 'merchandise'
                  ? 'Siapkan referensi model, warna, serta logo atau file desain. Sebutkan ukuran, kapasitas, dan kelengkapan yang dibutuhkan sesuai jenis merchandise.'
                  : 'Siapkan ukuran cetak, lokasi pemasangan, file desain, serta kebutuhan rangka atau penyangga.'}
          </p>
          <p>
            Sertakan jumlah pesanan dan tanggal kebutuhan. Harga, minimum pemesanan, spesifikasi
            bahan, kelengkapan, dan waktu pengerjaan dikonfirmasi saat konsultasi.
          </p>
        </div>
      </div>
    </section>
  );
}
