import { FaqAnswer } from '@/shared/FaqAnswer';
import { masterData } from '@/data';

export function BoxQuestions() {
  return (
    <section className="section box-questions" aria-labelledby="box-questions-title">
      <div className="section-head">
        <div>
          <h2 id="box-questions-title">Sebelum memesan</h2>
        </div>
        <a className="text-link" href="/faq">
          Panduan pemesanan lengkap
        </a>
      </div>
      <div className="faq-group">
        {masterData.home.boxQuestions.map((item) => (
          <FaqAnswer key={item.question} question={item.question} answer={item.answer} />
        ))}
      </div>
    </section>
  );
}
