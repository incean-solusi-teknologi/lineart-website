import { business, masterData } from '@/data';
export function OrderSteps() {
  return (
    <div className="home-order">
      <section id="cara-pesan">
        <h2>Dari ide, jadi pesanan.</h2>
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
        <p className="prototype-note">
          Cari packaging Jakarta? Bahas kebutuhan custom box di {business.localArea}.
        </p>
      </section>
    </div>
  );
}
