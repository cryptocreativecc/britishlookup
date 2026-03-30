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
    { url: `${BASE}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];

  try {
    const pb = await createAdminPb();

    // Categories
    const categories = await pb.collection("categories").getFullList();
    const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
      url: `${BASE}/categories/${c.slug}`,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    // Businesses
    const businesses = await pb.collection("businesses").getFullList({
      filter: 'status="approved" || status="featured"',
    });
    const businessRoutes: MetadataRoute.Sitemap = businesses.map((b) => ({
      url: `${BASE}/business/${b.slug}`,
      lastModified: new Date(b.updated),
      changeFrequency: "weekly",
      priority: b.is_featured ? 0.9 : 0.7,
    }));

    // Articles
    const articles = await pb.collection("articles").getFullList({
      filter: 'status="published"',
    });
    const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
      url: `${BASE}/guides/${a.slug}`,
      lastModified: new Date(a.updated),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

    return [...staticRoutes, ...categoryRoutes, ...businessRoutes, ...articleRoutes];
  } catch {
    return staticRoutes;
  }
}
