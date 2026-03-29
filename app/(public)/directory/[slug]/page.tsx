export const dynamic = "force-dynamic";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ClaimButton } from "@/components/directory/claim-button";
import { ContactCard } from "@/components/directory/contact-card";
import { ReviewsSection } from "@/components/directory/reviews-section";
import { ApprovedSeal } from "@/components/ui/approved-seal";
import { ServicesDisplay } from "@/components/directory/services-display";
import { createAdminPb } from "@/lib/pb";
import { listingMeta } from "@/lib/seo";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const pb = await createAdminPb();
    const biz = await pb.collection("businesses").getFirstListItem(`slug="${slug}"`, { expand: "category,region" });
    return listingMeta({ name: biz.name, category: biz.expand?.category?.name || "", town: biz.town, description: biz.description, slug: biz.slug });
  } catch { return { title: "Business Listing — BritishLookup" }; }
}

function displayDomain(url: string) {
  try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return url; }
}

function parseJSON<T>(val: unknown, fallback: T): T {
  if (!val) return fallback;
  if (typeof val === "object") return val as T;
  try { return JSON.parse(val as string); } catch { return fallback; }
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function SocialIcon({ platform, url }: { platform: string; url: string }) {
  if (!url) return null;
  const icons: Record<string, string> = {
    facebook: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
    twitter: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    instagram: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
    linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    youtube: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z",
    tiktok: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
  };
  const d = icons[platform];
  if (!d) return null;
  return (
    <a href={url} target="_blank" className="text-text-muted hover:text-brand transition-colors" aria-label={platform}>
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d={d} /></svg>
    </a>
  );
}

export default async function ListingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let biz;
  try {
    const pb = await createAdminPb();
    biz = await pb.collection("businesses").getFirstListItem(`slug="${slug}"`, { expand: "category,region" });
  } catch { notFound(); }

  const categoryName = biz.expand?.category?.name || "";
  const regionName = biz.expand?.region?.name || "";
  const initial = biz.name?.charAt(0)?.toUpperCase() || "?";
  const anchorText = biz.anchor_text || (biz.website ? displayDomain(biz.website) : "");
  const siteUrl = process.env.SITE_URL || "https://britishlookup.co.uk";
  const services = parseJSON<{ title: string; description: string; url: string }[]>(biz.services, []);
  const rawHours = parseJSON<Record<string, Record<string, unknown>>>(biz.opening_hours, {});
  // Normalise: support both {enabled,is24h} and {closed,is24} shapes
  const openingHours = Object.fromEntries(
    Object.entries(rawHours).map(([day, d]) => {
      const enabled = d.enabled !== undefined ? !!d.enabled : d.closed !== undefined ? !d.closed : false;
      const is24h = !!(d.is24h ?? d.is24);
      const slots = (Array.isArray(d.slots) ? d.slots : [{ open: "09:00", close: "17:00" }]) as { open: string; close: string }[];
      return [day, { enabled, is24h, slots }];
    })
  );
  const socialLinks = parseJSON<Record<string, string>>(biz.social_links, {});
  const amenities = parseJSON<string[]>(biz.amenities, []);
  const hasSocials = Object.values(socialLinks).some((v) => !!v);
  const hasHours = Object.values(openingHours).some((d) => d?.enabled);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: biz.name,
    description: biz.description,
    ...(biz.website ? { url: biz.website } : {}),
    ...(biz.phone ? { telephone: biz.phone } : {}),
    ...(biz.email ? { email: biz.email } : {}),
    ...(biz.logo ? { image: `https://pb.britishlookup.co.uk/api/files/businesses/${biz.id}/${biz.logo}` } : {}),
    ...(biz.address || biz.town ? {
      address: { "@type": "PostalAddress", ...(biz.address ? { streetAddress: biz.address } : {}), ...(biz.town ? { addressLocality: biz.town } : {}), ...(biz.postcode ? { postalCode: biz.postcode } : {}), addressCountry: "GB" },
    } : {}),
    ...(biz.lat && biz.lng ? { geo: { "@type": "GeoCoordinates", latitude: biz.lat, longitude: biz.lng } } : {}),
    "@id": `${siteUrl}/directory/${biz.slug}`,
  };

  const today = new Date().toLocaleDateString("en-GB", { weekday: "long" });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8" itemScope itemType="https://schema.org/LocalBusiness">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-4">
              {biz.logo ? (
                <img src={`https://pb.britishlookup.co.uk/api/files/businesses/${biz.id}/${biz.logo}`} alt={biz.name} itemProp="image" className="w-24 h-24 rounded-[var(--radius-card)] object-contain bg-white border border-border" />
              ) : (
                <div className="w-24 h-24 rounded-[var(--radius-card)] bg-brand-light flex items-center justify-center text-brand font-bold text-3xl">{initial}</div>
              )}
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-text flex items-center gap-2">
                  <span itemProp="name">{biz.name}</span>
                  <ApprovedSeal className="w-6 h-6 text-brand shrink-0" />
                </h1>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  {categoryName && <Badge variant="brand">{categoryName}</Badge>}
                  {biz.is_verified && <Badge variant="outline">✓ Verified</Badge>}
                  {biz.is_featured && <Badge className="bg-purple-100 text-purple-800">★ Featured</Badge>}
                  {biz.town && <span className="text-sm text-text-muted" itemProp="addressLocality">{biz.town}</span>}
                  {regionName && <span className="text-sm text-text-muted">· {regionName}</span>}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold text-text mb-2">About</h2>
            </div>
            <div className="prose max-w-none text-text" itemProp="description">
              {biz.full_description ? (
                <div dangerouslySetInnerHTML={{ __html: biz.full_description }} />
              ) : (
                <p>{biz.description}</p>
              )}
            </div>

            {/* Services */}
            {services.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-text mb-3">Services</h2>
                <ServicesDisplay services={services} />
              </div>
            )}

            {/* Reviews */}
            <ReviewsSection businessId={biz.id} />

            {/* Claim */}
            {!biz.claimed && (
              <div className="mt-8 bg-surface rounded-[var(--radius-card)] p-5 border border-border">
                <h3 className="font-semibold text-text mb-1">Is this your business?</h3>
                <p className="text-sm text-text-muted mb-3">Claim this listing to update your details and manage your presence on BritishLookup.</p>
                <ClaimButton businessId={biz.id} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 shrink-0 space-y-4">
            {/* Banner/Logo */}
            {biz.banner && (
              <img
                src={`https://pb.britishlookup.co.uk/api/files/businesses/${biz.id}/${biz.banner}`}
                alt={`${biz.name} logo`}
                className="w-full rounded-[var(--radius-card)] border border-border object-contain bg-white p-4"
              />
            )}

            {/* Contact */}
            <ContactCard address={biz.address} town={biz.town} postcode={biz.postcode} phone={biz.phone} email={biz.email} website={biz.website} anchorText={anchorText} />

            {/* Social Links */}
            {hasSocials && (
              <Card>
                <CardContent>
                  <h3 className="font-semibold text-text mb-3">Follow Us</h3>
                  <div className="flex gap-3">
                    {Object.entries(socialLinks).map(([platform, url]) => (
                      <SocialIcon key={platform} platform={platform} url={url} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Opening Hours */}
            {hasHours && (
              <Card>
                <CardContent>
                  <h3 className="font-semibold text-text mb-3">Opening Hours</h3>
                  <div className="space-y-1.5 text-sm">
                    {DAYS.map((day) => {
                      const d = openingHours[day];
                      const isToday = day === today;
                      if (!d?.enabled) {
                        return (
                          <div key={day} className={`flex justify-between ${isToday ? "font-semibold text-brand" : "text-text-muted"}`}>
                            <span>{day}</span>
                            <span>Closed</span>
                          </div>
                        );
                      }
                      return (
                        <div key={day} className={`flex justify-between ${isToday ? "font-semibold text-brand" : "text-text"}`}>
                          <span>{day}</span>
                          <span>{d.is24h ? "24 hours" : d.slots?.map((s) => `${s.open}–${s.close}`).join(", ")}</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Amenities */}
            {amenities.length > 0 && (
              <Card>
                <CardContent>
                  <h3 className="font-semibold text-text mb-3">Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {amenities.map((a) => (
                      <span key={a} className="inline-flex items-center gap-1 px-2.5 py-1 text-xs bg-brand-light text-brand-dark rounded-full">
                        ✓ {a}
                      </span>
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
