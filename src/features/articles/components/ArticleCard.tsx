import type { Article } from '@/data';
export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="article-card">
      <a href={`/artikel/${article.slug}`}>
        <img
          src={article.src}
          alt={article.alt}
          loading="lazy"
          width={article.width}
          height={article.height}
        />
        <div>
          <h2>{article.title}</h2>
          <p>{article.excerpt}</p>
          <span>Baca artikel</span>
        </div>
      </a>
    </article>
  );
}
