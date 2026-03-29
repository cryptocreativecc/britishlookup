import Link from "next/link";
import { SearchBar } from "@/components/ui/search-bar";
import { Button } from "@/components/ui/button";
import { BusinessCard } from "@/components/directory/business-card";
import { ArticleCard } from "@/components/blog/article-card";
import { websiteJsonLd, organizationJsonLd } from "@/lib/jsonld";
import { createAdminPb } from "@/lib/pb";

const POPULAR_CATEGORIES = [
  "Builders", "Electricians", "Restaurants", "Accountants", "Web Design", "Plumbers", "Salons", "Solicitors",
];

const STATS = [
  { label: "Business Categories", value: "49" },
  { label: "UK Regions", value: "53" },
  { label: "Free Listings", value: "100%" },
  { label: "Dofollow Backlinks", value: "✓" },
];

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const pb = await createAdminPb();

  // Fetch featured/recent approved businesses
  let businesses: { name: string; slug: string; category: string; town: string; description: string; isFeatured?: boolean; isVerified?: boolean }[] = [];
  try {
    const result = await pb.collection("businesses").getList(1, 4, {
      filter: 'status = "approved"',
      sort: "-is_featured,-created",
      expand: "category",
    });
    businesses = result.items.map((b) => ({
      name: b.name,
      slug: b.slug,
      category: b.expand?.category?.name || "",
      town: b.town,
      description: b.description,
      isFeatured: b.is_featured || false,
      isVerified: b.is_verified || false,
    }));
  } catch { /* */ }

  // Fetch recent published articles
  let articles: { title: string; slug: string; excerpt: string; category: string; authorName: string; readTime: number; publishedAt: string }[] = [];
  try {
    const result = await pb.collection("articles").getList(1, 3, {
      filter: 'status = "published"',
      sort: "-published_at",
    });
    articles = result.items.map((a) => ({
      title: a.title,
      slug: a.slug,
      excerpt: a.excerpt || a.body?.slice(0, 200) || "",
      category: "",
      authorName: a.author_name || "",
      readTime: a.read_time || 3,
      publishedAt: a.published_at || a.created,
    }));
  } catch { /* */ }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-light/50 to-white py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text">
            Find &amp; list{" "}
            <span className="text-brand">UK businesses</span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-text-muted max-w-2xl mx-auto">
            The free UK business directory. From local tradespeople to restaurants,
            tech companies to wedding venues — discover and connect with businesses
            across Britain.
          </p>
          <form action="/directory" method="GET" className="mt-8 max-w-xl mx-auto">
            <SearchBar />
          </form>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-text-muted">
            <span>Popular:</span>
            {POPULAR_CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={`/directory?q=${encodeURIComponent(cat.toLowerCase())}`}
                className="px-3 py-1 bg-white border border-border rounded-full hover:border-brand hover:text-brand transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-text">
                Featured Businesses
              </h2>
              <p className="mt-1 text-text-muted">
                Discover businesses across every industry and region
              </p>
            </div>
            <Link
              href="/directory"
              className="hidden sm:inline-flex text-sm font-semibold text-brand hover:text-brand-dark transition-colors"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {businesses.length > 0 ? (
              businesses.map((biz) => (
                <BusinessCard key={biz.slug} {...biz} />
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-text-muted">
                <p>No businesses listed yet. <Link href="/submit" className="text-brand hover:underline">Be the first!</Link></p>
              </div>
            )}
          </div>
          <div className="mt-6 text-center sm:hidden">
            <Link href="/directory" className="text-sm font-semibold text-brand">
              View all businesses →
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-brand py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl sm:text-4xl font-bold">{stat.value}</div>
                <div className="mt-1 text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Articles */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-text">
                Latest Articles
              </h2>
              <p className="mt-1 text-text-muted">
                Guides, tips, and insights for UK businesses and consumers
              </p>
            </div>
            <Link
              href="/blog"
              className="hidden sm:inline-flex text-sm font-semibold text-brand hover:text-brand-dark transition-colors"
            >
              Read more →
            </Link>
          </div>
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {articles.map((article) => (
                <ArticleCard key={article.slug} {...article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-text-muted">
              <p>No articles yet. <Link href="/write-for-us" className="text-brand hover:underline">Write the first one!</Link></p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-text">
            List your business for free
          </h2>
          <p className="mt-3 text-text-muted max-w-xl mx-auto">
            Whatever your industry, wherever you&apos;re based in the UK — get a
            free listing with a dofollow backlink to your website. No catch,
            no subscription.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/submit">
              <Button size="lg">Submit Your Business</Button>
            </Link>
            <Link href="/write-for-us">
              <Button variant="outline" size="lg">
                Write For Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
