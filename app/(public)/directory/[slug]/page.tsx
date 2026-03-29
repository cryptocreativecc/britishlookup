export const dynamic = "force-dynamic";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ClaimButton } from "@/components/directory/claim-button";
import { ContactCard } from "@/components/directory/contact-card";
import { ReviewsSection } from "@/components/directory/reviews-section";
import { ApprovedSeal } from "@/components/ui/approved-seal";
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

function displayDomain(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
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
  const anchorText = biz.anchor_text || (biz.website ? displayDomain(biz.website) : "");
  const siteUrl = process.env.SITE_URL || "https://britishlookup.co.uk";

  // Schema.org LocalBusiness JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: biz.name,
    description: biz.description,
    ...(biz.website ? { url: biz.website } : {}),
    ...(biz.phone ? { telephone: biz.phone } : {}),
    ...(biz.email ? { email: biz.email } : {}),
    ...(biz.logo
      ? { image: `https://pb.britishlookup.co.uk/api/files/businesses/${biz.id}/${biz.logo}` }
      : {}),
    ...(biz.address || biz.town
      ? {
          address: {
            "@type": "PostalAddress",
            ...(biz.address ? { streetAddress: biz.address } : {}),
            ...(biz.town ? { addressLocality: biz.town } : {}),
            ...(biz.postcode ? { postalCode: biz.postcode } : {}),
            addressCountry: "GB",
          },
        }
      : {}),
    ...(biz.lat && biz.lng
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: biz.lat,
            longitude: biz.lng,
          },
        }
      : {}),
    ...(categoryName ? { "@id": `${siteUrl}/directory/${biz.slug}` } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div
          className="flex flex-col lg:flex-row gap-8"
          itemScope
          itemType="https://schema.org/LocalBusiness"
        >
          <div className="flex-1">
            <div className="flex items-center gap-4">
              {biz.logo ? (
                <img
                  src={`https://pb.britishlookup.co.uk/api/files/businesses/${biz.id}/${biz.logo}`}
                  alt={biz.name}
                  itemProp="image"
                  className="w-24 h-24 rounded-[var(--radius-card)] object-contain bg-white border border-border"
                />
              ) : (
                <div className="w-24 h-24 rounded-[var(--radius-card)] bg-brand-light flex items-center justify-center text-brand font-bold text-3xl">
                  {initial}
                </div>
              )}
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-text flex items-center gap-2">
                  <span itemProp="name">{biz.name}</span>
                  <ApprovedSeal className="w-6 h-6 text-brand shrink-0" />
                </h1>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  {categoryName && <Badge variant="brand">{categoryName}</Badge>}
                  {biz.is_verified && <Badge variant="outline">✓ Verified</Badge>}
                  {biz.is_featured && (
                    <Badge className="bg-purple-100 text-purple-800">★ Featured</Badge>
                  )}
                  {biz.town && (
                    <span className="text-sm text-text-muted" itemProp="addressLocality">
                      {biz.town}
                    </span>
                  )}
                  {regionName && (
                    <span className="text-sm text-text-muted">· {regionName}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 prose max-w-none text-text" itemProp="description">
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
            <ContactCard
              address={biz.address}
              town={biz.town}
              postcode={biz.postcode}
              phone={biz.phone}
              email={biz.email}
              website={biz.website}
              anchorText={anchorText}
            />

            {tags.length > 0 && (
              <Card>
                <CardContent>
                  <h3 className="font-semibold text-text mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag: string) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
