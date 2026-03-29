export const dynamic = "force-dynamic";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { createAdminPb } from "@/lib/pb";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const pb = await createAdminPb();
  try {
    const article = await pb.collection("articles").getFirstListItem(`slug="${slug}"`, { expand: "category" });
    return {
      title: article.seo_title || `${article.title} — BritishLookup Blog`,
      description: article.seo_description || article.excerpt || article.body?.replace(/<[^>]*>/g, "").slice(0, 160),
    };
  } catch {
    return { title: "Article — BritishLookup Blog" };
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pb = await createAdminPb();

  let article;
  try {
    article = await pb.collection("articles").getFirstListItem(`slug="${slug}"`, { expand: "category,author" });
  } catch {
    notFound();
  }

  const categoryName = article.expand?.category?.name || "";
  const publishedAt = article.published_at || article.created;
  const dateStr = publishedAt ? new Date(publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "";
  const coverUrl = article.cover_image
    ? `https://pb.britishlookup.co.uk/api/files/articles/${article.id}/${article.cover_image}`
    : "";

  // Get author avatar and linked business
  const authorUser = article.expand?.author;
  const avatarUrl = authorUser?.avatar
    ? `https://pb.britishlookup.co.uk/api/files/users/${authorUser.id}/${authorUser.avatar}`
    : "";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let authorBusiness: Record<string, any> | null = null;
  if (authorUser) {
    try {
      authorBusiness = await pb.collection("businesses").getFirstListItem(
        `owner="${authorUser.id}" && (status="approved" || status="featured")`
      );
    } catch { /* no linked business */ }
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-2 mb-4">
        {categoryName && <Badge variant="brand">{categoryName}</Badge>}
        {article.read_time && <span className="text-sm text-text-muted">{article.read_time} min read</span>}
        {dateStr && <span className="text-sm text-text-muted">· {dateStr}</span>}
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-text">{article.title}</h1>

      {article.excerpt && (
        <p className="mt-3 text-lg text-text-muted">{article.excerpt}</p>
      )}

      {coverUrl && (
        <div className="mt-6 rounded-lg overflow-hidden border border-border">
          <img src={coverUrl} alt={article.title} className="w-full h-auto object-cover" />
        </div>
      )}

      <div
        className="mt-8 prose prose-lg max-w-none post-content"
        dangerouslySetInnerHTML={{ __html: article.body }}
      />

      {/* Author bio */}
      {(article.author_name || article.author_bio) && (
        <Card className="mt-10">
          <CardContent>
            <div className="flex items-start gap-4">
              {avatarUrl ? (
                <img src={avatarUrl} alt={article.author_name} className="w-14 h-14 rounded-full object-cover border border-border shrink-0" />
              ) : (
                <div className="w-14 h-14 rounded-full bg-brand-light flex items-center justify-center text-brand font-bold text-xl shrink-0">
                  {(article.author_name || "A").charAt(0).toUpperCase()}
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <p className="font-semibold text-text">{article.author_name}</p>
                  {authorBusiness && (
                    <>
                      <span className="text-text-muted">@</span>
                      <a href={`/directory/${authorBusiness.slug}`} className="font-semibold text-brand hover:text-brand-dark">
                        {authorBusiness.name}
                      </a>
                    </>
                  )}
                </div>
                {article.author_bio && (
                  <p className="text-sm text-text-muted mt-1">{article.author_bio}</p>
                )}
                {article.author_website && (
                  <a href={article.author_website} target="_blank" rel="noopener" className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-[var(--radius-btn)] bg-brand text-white text-sm font-medium hover:bg-brand-dark transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    Visit website
                  </a>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </article>
  );
}
