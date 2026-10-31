import { masterData } from '@/data';
export function Hero() {
  return (
    <section className="hero" aria-label="Koleksi utama">
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
          <a className="button" href="#katalog">
            Lihat pilihan box
          </a>
        </div>
        <figure className="hero-photo" style={{ margin: 0 }}>
          <a href="/kategori/gift-box">
            <img
              src="/media/blue.jpg"
              alt="Gift box navy dengan bukaan dua pintu"
              width="500"
              height="600"
              fetchPriority="high"
            />
            <figcaption>Gift box · Custom logo &amp; ukuran</figcaption>
          </a>
        </figure>
      </div>
      <a className="hero-calendar" href="/kategori/kalender">
        <div className="copy">
          <h2>
            {masterData.home.calendarTitle[0]}
            <br />
            {masterData.home.calendarTitle[1]}
          </h2>
          <p>{masterData.home.calendarDescription}</p>
        </div>
        <img src="/media/calendar-yellow.jpg" alt="Kalender meja custom" width="400" height="400" />
        <span className="calendar-label">Lihat kalender</span>
      </a>
    </section>
  );
}
