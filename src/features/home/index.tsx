import { Hero } from './sections/Hero';
import { Collections } from './sections/Collections';
import { BrandDetails } from './sections/BrandDetails';
import { OrderSteps } from './sections/OrderSteps';
export default function Home() {
  return (
    <main className="container">
      <Hero />
      <Collections />
      <BrandDetails />
      <OrderSteps />
    </main>
  );
}
