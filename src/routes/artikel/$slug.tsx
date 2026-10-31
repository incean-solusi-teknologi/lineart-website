import { articleHead } from '@/features/articles/seo';
import { createFileRoute, notFound } from '@tanstack/react-router';
import Articles from '@/features/articles';
import { getArticle } from '@/data';
export const Route = createFileRoute('/artikel/$slug')({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return article;
  },
  head: ({ loaderData }) => articleHead(loaderData),
  component: ArticleRoute,
});
function ArticleRoute() {
  return <Articles article={Route.useLoaderData()} />;
}
