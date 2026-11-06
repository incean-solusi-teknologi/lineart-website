import { Hero } from './sections/Hero';
import { PrintingOverview } from './sections/PrintingOverview';
import { BoxQuestions } from './sections/BoxQuestions';
import { BrandDetails } from './sections/BrandDetails';
import { usePrintMotion } from './hooks/usePrintMotion';
import { PrintWaves } from './sections/PrintWaves';

export default function Home() {
  const motionRef = usePrintMotion();
  return (
    <main className="print-home" ref={motionRef}>
      <PrintWaves />
      <Hero />
      <PrintingOverview />
      <div className="container print-home-bottom">
        <BoxQuestions />
        <BrandDetails />
      </div>
    </main>
  );
}
