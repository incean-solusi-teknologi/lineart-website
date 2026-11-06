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
              alt={getProduct('box-hadiah-perusahaan')!.name}
              width="500"
              height="600"
              fetchPriority="high"
            />
            <figcaption>Hard box gift set custom untuk hadiah perusahaan</figcaption>
          </a>
        </figure>
      </div>
    </section>
  );
}
