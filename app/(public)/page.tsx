import Link from "next/link";
import { SearchBar } from "@/components/ui/search-bar";
import { Button } from "@/components/ui/button";
import { BusinessCard } from "@/components/directory/business-card";
import { ArticleCard } from "@/components/blog/article-card";
import { websiteJsonLd, organizationJsonLd } from "@/lib/jsonld";

const PLACEHOLDER_BUSINESSES = [
  { name: "Thompson Roofing", slug: "thompson-roofing", category: "Roofing", town: "Manchester", description: "Professional roofing services across Greater Manchester. Flat roofs, pitched roofs, repairs and maintenance.", isFeatured: true, isVerified: true },
  { name: "T Roofing Supplies", slug: "t-roofing-supplies", category: "Roofing Supplies", town: "Birmingham", description: "Quality roofing materials and supplies delivered across the UK. Trade accounts welcome.", isFeatured: true },
  { name: "Castle Guttering", slug: "castle-guttering", category: "Guttering", town: "Leeds", description: "Guttering installation, cleaning and repair. UPVC, aluminium and cast iron specialists.", isVerified: true },
  { name: "Greenfield Builders", slug: "greenfield-builders", category: "Building", town: "Bristol", description: "Family-run building company. Extensions, renovations, and new builds with a 10-year guarantee." },
];

const PLACEHOLDER_ARTICLES = [
  { title: "How to Choose a Reliable Roofer in 2026", slug: "choose-reliable-roofer-2026", excerpt: "Finding a trustworthy roofer doesn't have to be stressful. Here's what to look for and the questions to ask before hiring.", category: "Roofing", authorName: "BritishLookup Editorial", readTime: 5, publishedAt: "2026-03-25" },
  { title: "The Complete Guide to Guttering Maintenance", slug: "guttering-maintenance-guide", excerpt: "Regular guttering maintenance prevents costly damage. Learn when to clean, repair, and replace your gutters.", category: "Guttering", authorName: "James Harper", readTime: 7, publishedAt: "2026-03-20" },
  { title: "Why Every UK Trade Business Needs an Online Presence", slug: "uk-trade-business-online-presence", excerpt: "If you're a tradesperson without a website, you're leaving money on the table. Here's why digital visibility matters.", category: "Business", authorName: "Sarah Mitchell", readTime: 4, publishedAt: "2026-03-18" },
];

const STATS = [
  { label: "Businesses Listed", value: "500+" },
  { label: "Articles Published", value: "120+" },
  { label: "Categories", value: "50+" },
  { label: "UK Regions", value: "12" },
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
            Find trusted{" "}
            <span className="text-brand">UK businesses</span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-text-muted max-w-2xl mx-auto">
            Your directory for verified tradespeople, suppliers, and local
            services across Britain.
          </p>
          <div className="mt-8 max-w-xl mx-auto">
            <SearchBar />
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-text-muted">
            <span>Popular:</span>
            {["Roofing", "Guttering", "Building", "Plumbing", "Electrical"].map(
              (cat) => (
                <Link
                  key={cat}
                  href={`/directory?category=${cat.toLowerCase()}`}
                  className="px-3 py-1 bg-white border border-border rounded-full hover:border-brand hover:text-brand transition-colors"
                >
                  {cat}
                </Link>
              )
            )}
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
                Verified and trusted businesses across the UK
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
                Guides, tips, and insights for UK trades and homeowners
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
            Get your business listed for free
          </h2>
          <p className="mt-3 text-text-muted max-w-xl mx-auto">
            Join hundreds of UK businesses on BritishLookup. Get a verified
            listing page with a dofollow backlink to your website — completely
            free.
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
