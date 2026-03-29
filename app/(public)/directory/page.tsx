export const dynamic = "force-dynamic";
import { SearchBar } from "@/components/ui/search-bar";
import { Badge } from "@/components/ui/badge";
import { BusinessCard } from "@/components/directory/business-card";
import { createAdminPb } from "@/lib/pb";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Directory — Find UK Businesses",
  description: "Browse UK businesses across every industry and region. Find trusted local services, from tradespeople to restaurants, tech companies to wedding venues.",
};

export default async function DirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; region?: string; page?: string }>;
}) {
  const { q, category, region, page } = await searchParams;
  const currentPage = parseInt(page || "1", 10);
  const perPage = 12;

  const pb = await createAdminPb();

  // Load categories and regions for filters
  let categories: { id: string; name: string; slug: string; icon: string }[] = [];
  let regions: { id: string; name: string; slug: string }[] = [];

  try {
    const catResult = await pb.collection("categories").getFullList({ sort: "name" });
    categories = catResult.map((c) => ({ id: c.id, name: c.name, slug: c.slug, icon: c.icon || "" }));
  } catch (e) { console.error("Directory categories error:", e); }

  try {
    const regResult = await pb.collection("regions").getFullList({ sort: "name" });
    regions = regResult.map((r) => ({ id: r.id, name: r.name, slug: r.slug }));
  } catch (e) { console.error("PB query error:", e); }

  // Build filter
  const filters: string[] = ['(status = "approved" || status = "featured")'];
  if (category) {
    const cat = categories.find((c) => c.slug === category);
    if (cat) filters.push(`category = "${cat.id}"`);
  }
  if (region) {
    const reg = regions.find((r) => r.slug === region);
    if (reg) filters.push(`region = "${reg.id}"`);
  }
  if (q) {
    filters.push(`(name ~ "${q}" || description ~ "${q}" || town ~ "${q}")`);
  }

  let businesses: {
    id: string;
    name: string;
    slug: string;
    description: string;
    town: string;
    categoryName: string;
    isFeatured: boolean;
    isVerified: boolean;
    logo: string;
    banner: string;
  }[] = [];
  let totalItems = 0;
  let totalPages = 1;

  try {
    const result = await pb.collection("businesses").getList(currentPage, perPage, {
      filter: filters.join(" && "),
      sort: "-is_featured,-id",
      expand: "category",
    });
    businesses = result.items.map((b) => ({
      id: b.id,
      name: b.name,
      slug: b.slug,
      description: b.description || "",
      town: b.town || "",
      categoryName: b.expand?.category?.name || "",
      isFeatured: b.status === "featured" || b.is_featured,
      isVerified: b.is_verified || false,
      logo: b.logo ? `https://pb.britishlookup.co.uk/api/files/businesses/${b.id}/${b.logo}` : "",
      banner: b.banner ? `https://pb.britishlookup.co.uk/api/files/businesses/${b.id}/${b.banner}` : "",
    }));
    totalItems = result.totalItems;
    totalPages = result.totalPages;
  } catch (e) { console.error("PB query error:", e); }

  // Build URL helper
  function buildUrl(params: Record<string, string | undefined>) {
    const sp = new URLSearchParams();
    if (params.q ?? q) sp.set("q", (params.q ?? q)!);
    if (params.category ?? category) sp.set("category", (params.category ?? category)!);
    if (params.region ?? region) sp.set("region", (params.region ?? region)!);
    if (params.page) sp.set("page", params.page);
    const str = sp.toString();
    return `/directory${str ? `?${str}` : ""}`;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-text">Business Directory</h1>
      <p className="mt-2 text-text-muted">
        Find UK businesses across every industry and region
      </p>

      <div className="mt-6">
        <form action="/directory" method="GET">
          {category && <input type="hidden" name="category" value={category} />}
          {region && <input type="hidden" name="region" value={region} />}
          <SearchBar />
        </form>
      </div>

      {/* Active filters */}
      {(q || category || region) && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-sm text-text-muted">Filters:</span>
          {q && (
            <Link href={buildUrl({ q: undefined })} className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-brand/10 text-brand rounded-full hover:bg-brand/20">
              &ldquo;{q}&rdquo; ✕
            </Link>
          )}
          {category && (
            <Link href={buildUrl({ category: undefined })} className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-brand/10 text-brand rounded-full hover:bg-brand/20">
              {categories.find((c) => c.slug === category)?.name || category} ✕
            </Link>
          )}
          {region && (
            <Link href={buildUrl({ region: undefined })} className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-brand/10 text-brand rounded-full hover:bg-brand/20">
              {regions.find((r) => r.slug === region)?.name || region} ✕
            </Link>
          )}
          <Link href="/directory" className="text-xs text-text-muted hover:text-brand">Clear all</Link>
        </div>
      )}

      {/* Category pills */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-text mb-2">Categories</h3>
        <div className="flex flex-wrap gap-1.5 max-h-24 overflow-hidden">
          {categories.slice(0, 20).map((cat) => (
            <Link key={cat.slug} href={buildUrl({ category: cat.slug === category ? undefined : cat.slug, page: undefined })}>
              <Badge
                variant={cat.slug === category ? "brand" : "outline"}
                className="cursor-pointer hover:border-brand"
              >
                {cat.icon} {cat.name}
              </Badge>
            </Link>
          ))}
          {categories.length > 20 && (
            <span className="text-xs text-text-muted self-center">+{categories.length - 20} more</span>
          )}
        </div>
      </div>

      {/* Region pills */}
      <div className="mt-4">
        <h3 className="text-sm font-semibold text-text mb-2">Regions</h3>
        <div className="flex flex-wrap gap-1.5 max-h-24 overflow-hidden">
          {regions.slice(0, 16).map((reg) => (
            <Link key={reg.slug} href={buildUrl({ region: reg.slug === region ? undefined : reg.slug, page: undefined })}>
              <Badge
                variant={reg.slug === region ? "brand" : "outline"}
                className="cursor-pointer hover:border-brand"
              >
                {reg.name}
              </Badge>
            </Link>
          ))}
          {regions.length > 16 && (
            <span className="text-xs text-text-muted self-center">+{regions.length - 16} more</span>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="mt-8">
        <p className="text-sm text-text-muted mb-4">
          {totalItems} {totalItems === 1 ? "business" : "businesses"} found
        </p>

        {businesses.length === 0 ? (
          <div className="text-center py-16 bg-surface rounded-[var(--radius-card)]">
            <p className="text-text-muted mb-2">No businesses found.</p>
            <p className="text-sm text-text-muted">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {businesses.map((biz) => (
              <BusinessCard
                key={biz.id}
                name={biz.name}
                slug={biz.slug}
                description={biz.description}
                town={biz.town}
                category={biz.categoryName}
                isFeatured={biz.isFeatured}
                isVerified={biz.isVerified}
                banner={biz.banner || biz.logo}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            {currentPage > 1 && (
              <Link
                href={buildUrl({ page: String(currentPage - 1) })}
                className="px-4 py-2 text-sm border border-border rounded-lg hover:border-brand transition-colors"
              >
                ← Previous
              </Link>
            )}
            <span className="px-4 py-2 text-sm text-text-muted">
              Page {currentPage} of {totalPages}
            </span>
            {currentPage < totalPages && (
              <Link
                href={buildUrl({ page: String(currentPage + 1) })}
                className="px-4 py-2 text-sm border border-border rounded-lg hover:border-brand transition-colors"
              >
                Next →
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
