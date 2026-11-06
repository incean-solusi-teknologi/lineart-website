import { masterData } from '@/data';
import { WhatsAppIcon } from '@/shared/Icons';

export function BrandDetails() {
  return (
    <section className="consult-band print-consult" aria-labelledby="box-consult-title">
      <div>
        <p className="print-consult-eyebrow">Konsultasi box custom</p>
        <h2 id="box-consult-title">Sudah punya isi, belum punya box?</h2>
        <p>{masterData.home.printing.consultDescription}</p>
      </div>
      <a className="button print-whatsapp" href="/kontak">
        <WhatsAppIcon /> Konsultasi via WhatsApp <span aria-hidden="true">→</span>
      </a>
    </section>
  );
}
