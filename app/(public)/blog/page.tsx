import { ArticleCard } from "@/components/blog/article-card";
import { createAdminPb } from "@/lib/pb";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog — Business Guides & Insights",
  description: "Guides, tips, and expert insights for UK businesses and consumers. Written by industry professionals.",
};

export default async function BlogPage() {
  const pb = await createAdminPb();

  let articles: {
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    authorName: string;
    readTime: number;
    publishedAt: string;
  }[] = [];

  try {
    const result = await pb.collection("articles").getFullList({
      filter: 'status = "published"',
      sort: "-id",
      expand: "category",
    });
    articles = result.map((a) => ({
      title: a.title,
      slug: a.slug,
      excerpt: a.excerpt || a.body?.slice(0, 200) || "",
      category: a.expand?.category?.name || "",
      authorName: a.author_name || "",
      readTime: a.read_time || 3,
      publishedAt: a.published_at || a.created,
    }));
  } catch { /* */ }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-text">Blog</h1>
      <p className="mt-2 text-text-muted">
        Guides, tips, and expert insights for UK businesses and consumers
      </p>

      <div className="mt-8">
        {articles.length === 0 ? (
          <div className="text-center py-16 bg-surface rounded-[var(--radius-card)]">
            <p className="text-text-muted mb-2">No articles published yet.</p>
            <p className="text-sm text-text-muted">
              Want to contribute?{" "}
              <a href="/write-for-us" className="text-brand hover:underline">Write for us</a>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.map((article) => (
              <ArticleCard key={article.slug} {...article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
