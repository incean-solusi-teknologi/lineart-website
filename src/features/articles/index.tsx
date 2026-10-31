import { articles, type Article } from '@/data';
import { Breadcrumbs } from '@/shared/Breadcrumbs';
import { ArticleCard } from './components/ArticleCard';
export default function Articles({ article }: { article?: Article }) {
  return (
    <main className="container">
      <Breadcrumbs
        items={
          article
            ? [{ label: 'Artikel', href: '/artikel' }, { label: article.title }]
            : [{ label: 'Artikel' }]
        }
      />
      {article ? (
        <>
          <article className="article-detail">
            <header>
              <h1>{article.title}</h1>
              <p>{article.excerpt}</p>
            </header>
            <figure>
              <img
                src={article.src}
                alt={article.alt}
                width="1200"
                height="900"
                fetchPriority="high"
              />
            </figure>
            <div className="article-body">
              {article.sections.map((section) => (
                <section key={section.title}>
                  <h2>{section.title}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </section>
              ))}
              <div className="article-cta">
                <h2>Siap membahas kebutuhan cetak?</h2>
                <p>
                  Siapkan ukuran, jumlah, dan referensi desain agar tim kami dapat membantu memilih
                  spesifikasi.
                </p>
                <a className="button" href="/kategori/packaging">
                  Lihat packaging custom
                </a>
              </div>
            </div>
          </article>
          <section className="article-related">
            <h2>Artikel lainnya</h2>
            <div className="article-grid">
              {articles
                .filter((item) => item.slug !== article.slug)
                .slice(0, 2)
                .map((item) => (
                  <ArticleCard key={item.slug} article={item} />
                ))}
            </div>
          </section>
        </>
      ) : (
        <>
          <section className="articles-intro">
            <h1>Artikel &amp; panduan cetak</h1>
            <p>Ide dan panduan untuk menyiapkan packaging serta kebutuhan cetak Anda.</p>
          </section>
          <div className="article-grid">
            {articles.map((item) => (
              <ArticleCard key={item.slug} article={item} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
