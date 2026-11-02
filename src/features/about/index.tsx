import { business, masterData } from '@/data';
import { Breadcrumbs } from '@/shared/Breadcrumbs';
export default function About() {
  const content = masterData.about;
  return (
    <main className="container">
      <Breadcrumbs items={[{ label: 'Tentang kami' }]} />
      <section className="company-intro" aria-labelledby="about-title">
        <h1 id="about-title">Tentang kami.</h1>
        <div className="company-identity">
          <h2>
            LINE <span>·</span> Art media
          </h2>
          <p>{content.intro}</p>
        </div>
        <figure className="company-cover">
          <img
            src="/media/mesin-lipat.jpg"
            alt="Mesin lipat kertas Horizon PF40L untuk finishing hasil cetak"
            width="1600"
            height="1200"
            fetchPriority="high"
          />
          <figcaption>
            <span>
              Di balik setiap <br />
              hasil cetak.
            </span>
            <p>Mesin lipat kertas Horizon PF40L</p>
          </figcaption>
        </figure>
      </section>
      <section className="company-story" aria-labelledby="story-title">
        <h2 id="story-title">{content.storyTitle}</h2>
        <div>
          {content.story.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
      <section className="company-purpose" aria-labelledby="purpose-title">
        <h2 id="purpose-title">Visi &amp; misi</h2>
        <div className="company-vision">
          <h3>Visi kami</h3>
          <p>{content.vision}</p>
        </div>
        <div className="company-mission">
          <h3>Misi kami</h3>
          <div className="mission-columns">
            {content.missions.map((mission) => (
              <section key={mission.title}>
                <h4>{mission.title}</h4>
                <ul>
                  {mission.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>
      <section className="company-production" aria-labelledby="production-title">
        <figure>
          <img
            src="/media/cutting-plotter.jpg"
            alt="Cutting plotter untuk memotong pola dan stiker"
            width="600"
            height="600"
            loading="lazy"
          />
          <figcaption>Cutting plotter</figcaption>
        </figure>
        <div className="production-copy">
          <h2 id="production-title">
            Dari konsultasi
            <br />
            hingga finishing.
          </h2>
          <p>
            Setiap pekerjaan punya kebutuhan berbeda. Kami membantu membahas pilihannya sebelum
            masuk ke proses cetak.
          </p>
          <dl>
            {content.production.map((item) => (
              <div key={item.title}>
                <dt>{item.title}</dt>
                <dd>{item.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <section className="company-principles" aria-labelledby="principles-title">
        <h2 id="principles-title">Komitmen dalam bekerja</h2>
        <div className="principle-list">
          {content.principles.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="company-scope" aria-labelledby="scope-title">
        <h2 id="scope-title">Lingkup layanan</h2>
        <div className="scope-list">
          {content.services.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="company-location" id="lokasi" aria-labelledby="location-title">
        <div className="location-copy">
          <h2 id="location-title">
            Packaging Jakarta,
            <br />
            dekat Pasar Senen.
          </h2>
          <p>Temui LINE · Art media di kawasan Kalibaru Timur V, Bungur, Senen.</p>
          <address>{business.address}</address>
          <a
            className="button secondary"
            href={business.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Buka di Google Maps
          </a>
        </div>
        <iframe
          src={business.mapsEmbed}
          title="Peta lokasi LINE · Art media di Kalibaru Timur V, Bungur, Senen"
          width="800"
          height="420"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </section>
      <section className="company-contact" aria-labelledby="contact-title">
        <div>
          <h2 id="contact-title">Mari bicara langsung.</h2>
          <p>Bahas kebutuhan cetakmu bersama LINE · Art media.</p>
        </div>
        <a className="button" href="/kontak">
          Hubungi kami
        </a>
      </section>
    </main>
  );
}
