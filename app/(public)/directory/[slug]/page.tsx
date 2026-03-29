export const dynamic = "force-dynamic";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ClaimButton } from "@/components/directory/claim-button";
import { ReviewsSection } from "@/components/directory/reviews-section";
import { createAdminPb } from "@/lib/pb";
import { listingMeta } from "@/lib/seo";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const pb = await createAdminPb();
    const biz = await pb.collection("businesses").getFirstListItem(`slug="${slug}"`, {
      expand: "category,region",
    });
    return listingMeta({
      name: biz.name,
      category: biz.expand?.category?.name || "",
      town: biz.town,
      description: biz.description,
      slug: biz.slug,
    });
  } catch {
    return { title: "Business Listing — BritishLookup" };
  }
}

export default async function ListingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let biz;

  try {
    const pb = await createAdminPb();
    biz = await pb.collection("businesses").getFirstListItem(`slug="${slug}"`, {
      expand: "category,region",
    });
  } catch {
    notFound();
  }

  const categoryName = biz.expand?.category?.name || "";
  const regionName = biz.expand?.region?.name || "";
  const tags = Array.isArray(biz.tags) ? biz.tags : [];
  const initial = biz.name?.charAt(0)?.toUpperCase() || "?";

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-4">
            {biz.logo ? (
              <img
                src={`https://pb.britishlookup.co.uk/api/files/businesses/${biz.id}/${biz.logo}`}
                alt={biz.name}
                className="w-24 h-24 rounded-[var(--radius-card)] object-contain bg-white border border-border"
              />
            ) : (
              <div className="w-24 h-24 rounded-[var(--radius-card)] bg-brand-light flex items-center justify-center text-brand font-bold text-3xl">
                {initial}
              </div>
            )}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-text">{biz.name}</h1>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                {categoryName && <Badge variant="brand">{categoryName}</Badge>}
                {biz.is_verified && <Badge variant="outline">✓ Verified</Badge>}
                {biz.is_featured && <Badge className="bg-purple-100 text-purple-800">★ Featured</Badge>}
                {biz.town && <span className="text-sm text-text-muted">{biz.town}</span>}
                {regionName && <span className="text-sm text-text-muted">· {regionName}</span>}
              </div>
            </div>
          </div>

          <div className="mt-6 prose max-w-none text-text">
            {biz.full_description ? (
              <div dangerouslySetInnerHTML={{ __html: biz.full_description }} />
            ) : (
              <p>{biz.description}</p>
            )}
          </div>

          {/* Reviews */}
          <ReviewsSection businessId={biz.id} />

          {/* Claim section */}
          {!biz.claimed && (
            <div className="mt-8 bg-surface rounded-[var(--radius-card)] p-5 border border-border">
              <h3 className="font-semibold text-text mb-1">Is this your business?</h3>
              <p className="text-sm text-text-muted mb-3">
                Claim this listing to update your details and manage your presence on BritishLookup.
              </p>
              <ClaimButton businessId={biz.id} />
            </div>
          )}
        </div>

        <div className="lg:w-80 shrink-0 space-y-4">
          <Card>
            <CardContent>
              <h3 className="font-semibold text-text mb-3">Contact Details</h3>
              <div className="space-y-2 text-sm text-text-muted">
                {biz.address && <p>📍 {biz.address}{biz.postcode ? `, ${biz.postcode}` : ""}</p>}
                {!biz.address && biz.town && <p>📍 {biz.town}{biz.postcode ? `, ${biz.postcode}` : ""}</p>}
                {biz.phone && <p>📞 {biz.phone}</p>}
                {biz.email && <p>✉️ {biz.email}</p>}
              </div>
              {biz.website && (
                <a href={biz.website} target="_blank" rel="noopener noreferrer" className="mt-4 block">
                  <Button className="w-full">Visit Website</Button>
                </a>
              )}
            </CardContent>
          </Card>

          {tags.length > 0 && (
            <Card>
              <CardContent>
                <h3 className="font-semibold text-text mb-2">Tags</h3>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag: string) => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
