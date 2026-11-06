import { Hero } from './sections/Hero';
import { PrintingOverview } from './sections/PrintingOverview';
import { BoxQuestions } from './sections/BoxQuestions';
import { BrandDetails } from './sections/BrandDetails';

export default function Home() {
  return (
    <main className="print-home">
      <Hero />
      <PrintingOverview />
      <div className="container print-home-bottom">
        <BoxQuestions />
        <BrandDetails />
      </div>
    </main>
  );
}
