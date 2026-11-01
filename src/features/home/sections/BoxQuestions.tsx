import { masterData } from '@/data';

export function BoxQuestions() {
  return (
    <section className="section box-questions" aria-labelledby="box-questions-title">
      <div className="section-head">
        <div>
          <h2 id="box-questions-title">Sebelum memesan box custom</h2>
          <p>Bahas biaya, jumlah, dan jadwal sejak awal agar rencana pesananmu lebih jelas.</p>
        </div>
        <a className="text-link" href="/faq">
          Panduan pemesanan lengkap
        </a>
      </div>
      <div className="faq-group">
        {masterData.home.boxQuestions.map((item) => (
          <details className="faq-answer" key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
