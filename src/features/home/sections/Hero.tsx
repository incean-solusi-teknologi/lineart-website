import { masterData, getProduct } from '@/data';
export function Hero() {
  return (
    <section className="hero hero-box" aria-label="Box packaging custom">
      <div className="hero-main">
        <div className="hero-copy">
          <h1>
            {masterData.home.heroTitle.lead} <br />
            <span>
              {masterData.home.heroTitle.lines[0]} <br />
              {masterData.home.heroTitle.lines[1]}
            </span>
          </h1>
          <p>{masterData.home.heroDescription}</p>
          <a className="button" href="#box-custom">
            Temukan box untukmu
          </a>
        </div>
        <figure className="hero-photo" style={{ margin: 0 }}>
          <a href="/kategori/hard-box">
            <img
              src={getProduct('box-hadiah-perusahaan')!.image}
              alt="Ilustrasi box hadiah perusahaan berisi tumbler, notebook, dan pena"
              width="500"
              height="600"
              fetchPriority="high"
            />
            <figcaption>Inspirasi hadiah perusahaan (ilustrasi konsep)</figcaption>
          </a>
        </figure>
      </div>
    </section>
  );
}
