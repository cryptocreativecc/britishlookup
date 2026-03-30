import type { MetadataRoute } from "next";
import { createAdminPb } from "@/lib/pb";

const BASE = "https://britishlookup.co.uk";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE}/directory`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/guides`, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE}/submit`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/write-for-us`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/about`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/contact`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/privacy`, changeFrequency: "monthly", priority: 0.2 },
    { url: `${BASE}/terms`, changeFrequency: "monthly", priority: 0.2 },
  ];

  let businessRoutes: MetadataRoute.Sitemap = [];
  let articleRoutes: MetadataRoute.Sitemap = [];
  let categoryRoutes: MetadataRoute.Sitemap = [];

  try {
    const pb = await createAdminPb();

    const businesses = await pb.collection("businesses").getFullList({
      filter: 'status="approved" || status="featured"',
      fields: "slug,updated,is_featured",
    });
    businessRoutes = businesses.map((b) => ({
      url: `${BASE}/business/${b.slug}`,
      lastModified: new Date(b.updated),
      changeFrequency: "weekly" as const,
      priority: b.is_featured ? 0.9 : 0.7,
    }));

    const articles = await pb.collection("articles").getFullList({
      filter: 'status="published"',
      fields: "slug,updated",
    });
    articleRoutes = articles.map((a) => ({
      url: `${BASE}/guides/${a.slug}`,
      lastModified: new Date(a.updated),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    const categories = await pb.collection("categories").getFullList({ fields: "slug" });
    categoryRoutes = categories.map((c) => ({
      url: `${BASE}/categories/${c.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  } catch {}

  return [...staticRoutes, ...businessRoutes, ...articleRoutes, ...categoryRoutes];
}
