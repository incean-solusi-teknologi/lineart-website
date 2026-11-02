import { Hero } from './sections/Hero';
import { BoxNeeds } from './sections/BoxNeeds';
import { BoxGuide } from './sections/BoxGuide';
import { BoxQuestions } from './sections/BoxQuestions';
import { Collections } from './sections/Collections';
import { BrandDetails } from './sections/BrandDetails';
import { OrderSteps } from './sections/OrderSteps';
export default function Home() {
  return (
    <main className="container">
      <Hero />
      <BoxNeeds />
      <BoxGuide />
      <BrandDetails />
      <OrderSteps />
      <BoxQuestions />
      <Collections />
    </main>
  );
}
