import { masterData, whatsappLink } from '@/data';
import { WhatsAppIcon } from '@/shared/Icons';

export function BrandDetails() {
  return (
    <section className="consult-band print-consult" aria-labelledby="print-consult-title">
      <div>
        <p className="print-consult-eyebrow">Konsultasi percetakan</p>
        <h2 id="print-consult-title">Ada kebutuhan cetak?</h2>
        <p>{masterData.home.printing.consultDescription}</p>
      </div>
      <a
        className="button print-whatsapp"
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
      >
        <WhatsAppIcon /> Konsultasi sekarang <span aria-hidden="true">→</span>
      </a>
    </section>
  );
}
