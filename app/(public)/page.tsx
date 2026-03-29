import Link from "next/link";
import { SearchBar } from "@/components/ui/search-bar";
import { Button } from "@/components/ui/button";
import { BusinessCard } from "@/components/directory/business-card";
import { ArticleCard } from "@/components/blog/article-card";
import { websiteJsonLd, organizationJsonLd } from "@/lib/jsonld";

const PLACEHOLDER_BUSINESSES = [
  { name: "Thompson & Sons Builders", slug: "thompson-sons-builders", category: "Building & Construction", town: "Manchester", description: "Family-run building company specialising in extensions, renovations, and new builds across Greater Manchester.", isFeatured: true, isVerified: true },
  { name: "Bloom & Wild Florists", slug: "bloom-wild-florists", category: "Florists & Gifts", town: "Edinburgh", description: "Beautiful floral arrangements for weddings, events, and everyday occasions. Same-day delivery available.", isFeatured: true },
  { name: "CloudNine Digital", slug: "cloudnine-digital", category: "Marketing & Media", town: "Bristol", description: "Full-service digital marketing agency. SEO, social media, PPC, and web design for growing businesses.", isVerified: true },
  { name: "The Green Kitchen", slug: "the-green-kitchen", category: "Food & Drink", town: "Leeds", description: "Award-winning vegetarian café and catering company. Fresh, locally sourced ingredients since 2018." },
];

const PLACEHOLDER_ARTICLES = [
  { title: "How to Choose the Right Business Directory for Your Company", slug: "choose-right-business-directory", excerpt: "Not all directories are created equal. Here's what to look for when listing your business online in 2026.", category: "Business", authorName: "BritishLookup Editorial", readTime: 5, publishedAt: "2026-03-25" },
  { title: "10 Ways Small Businesses Can Boost Local Visibility", slug: "boost-local-visibility", excerpt: "From Google Business Profile to local directories, discover proven strategies to get more customers through your door.", category: "Marketing", authorName: "James Harper", readTime: 7, publishedAt: "2026-03-20" },
  { title: "The Benefits of a Verified Business Listing", slug: "benefits-verified-listing", excerpt: "A verified listing builds trust with potential customers. Here's why it matters and how to get one.", category: "Business", authorName: "Sarah Mitchell", readTime: 4, publishedAt: "2026-03-18" },
];

const POPULAR_CATEGORIES = [
  "Builders", "Electricians", "Restaurants", "Accountants", "Web Design", "Plumbers", "Salons", "Solicitors",
];

const STATS = [
  { label: "Business Categories", value: "49" },
  { label: "UK Regions", value: "53" },
  { label: "Free Listings", value: "100%" },
  { label: "Dofollow Backlinks", value: "✓" },
];

export default function HomePage() {
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
          <div className="mt-8 max-w-xl mx-auto">
            <SearchBar />
          </div>
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
            {PLACEHOLDER_BUSINESSES.map((biz) => (
              <BusinessCard key={biz.slug} {...biz} />
            ))}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PLACEHOLDER_ARTICLES.map((article) => (
              <ArticleCard key={article.slug} {...article} />
            ))}
          </div>
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
