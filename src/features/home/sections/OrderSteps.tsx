import { masterData } from '@/data';
export function OrderSteps() {
  return (
    <div className="home-order">
      <section id="cara-pesan" aria-labelledby="order-steps-title">
        <h2 id="order-steps-title">Cara pesan box custom</h2>
        <div className="steps">
          {masterData.home.steps.map((step, index) => (
            <div className="step" key={step.title}>
              <span className="step-number">{index + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
