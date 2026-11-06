import { business, masterData, whatsappLink } from '@/data';
import { Breadcrumbs } from '@/shared/Breadcrumbs';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useAboutGallery } from './hooks/useAboutGallery';
export default function About() {
  const content = masterData.about;
  const pageRef = useScrollReveal<HTMLElement>('section');
  const { galleryRef, scrollGallery } = useAboutGallery();
  return (
    <main className="container" ref={pageRef}>
      <Breadcrumbs items={[{ label: 'Tentang kami' }]} />
      <section className="company-intro" aria-labelledby="about-title">
        <div className="company-headline">
          <p className="company-eyebrow">Tentang LINE · Art media</p>
          <h1 id="about-title">
            Cetak yang baik,
            <br />
            dimulai dari <span>memahami kebutuhanmu.</span>
          </h1>
        </div>
        <div className="company-vision">
          <h2>Visi kami</h2>
          <p>{content.vision}</p>
          <span className="vision-signature" aria-hidden="true">
            {/* LINE · Art media */}
          </span>
        </div>
      </section>
      <section className="company-purpose" aria-labelledby="purpose-title">
        <h2 id="purpose-title">Misi kami</h2>
        <div className="mission-columns">
          {content.missions.map((mission) => (
            <article key={mission.title}>
              <h3>{mission.title}</h3>
              <p>{mission.description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="company-identity" aria-labelledby="identity-title">
        <h2 id="identity-title">{content.storyTitle}</h2>
        <p>{content.intro}</p>
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
      <section className="company-gallery" aria-labelledby="gallery-title">
        <div className="gallery-heading">
          <div>
            <h2 id="gallery-title">Mesin Kami</h2>
            <p>Peralatan yang mendukung setiap detail.</p>
          </div>
          <div className="gallery-controls" aria-label="Navigasi galeri mesin">
            <button
              type="button"
              aria-label="Mesin sebelumnya"
              aria-controls="machine-gallery"
              onClick={() => scrollGallery(-1)}
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              aria-label="Mesin berikutnya"
              aria-controls="machine-gallery"
              onClick={() => scrollGallery(1)}
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
        <div className="machine-grid" id="machine-gallery" ref={galleryRef}>
          {content.machines.map((machine) => (
            <figure key={machine.image}>
              <img
                src={machine.image}
                alt={machine.name}
                width="1200"
                height="900"
                loading="lazy"
                decoding="async"
              />
              <figcaption>{machine.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>
      <section className="company-location" id="lokasi" aria-labelledby="location-title">
        <div className="location-copy">
          <h2 id="location-title">
            Percetakan Jakarta,
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
          <h2 id="contact-title">Ada yang ingin dicetak?</h2>
          <p>Yuk, ceritakan kebutuhanmu.</p>
        </div>
        <a className="button" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
          Konsultasi dulu
        </a>
      </section>
    </main>
  );
}
