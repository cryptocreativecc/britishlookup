import type { MetadataRoute } from "next";

const BASE = "https://britishlookup.co.uk";

// Static routes
const staticRoutes = [
  { url: BASE, changeFrequency: "daily" as const, priority: 1.0 },
  { url: `${BASE}/directory`, changeFrequency: "daily" as const, priority: 0.9 },
  { url: `${BASE}/blog`, changeFrequency: "daily" as const, priority: 0.8 },
  { url: `${BASE}/submit`, changeFrequency: "monthly" as const, priority: 0.6 },
  { url: `${BASE}/write-for-us`, changeFrequency: "monthly" as const, priority: 0.6 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // TODO: Fetch approved businesses and published articles from PocketBase
  // const pb = createPb();
  // const businesses = await pb.collection("businesses").getFullList({ filter: 'status = "approved"' });
  // const articles = await pb.collection("articles").getFullList({ filter: 'status = "published"' });

  // const businessRoutes = businesses.map((b) => ({
  //   url: `${BASE}/directory/${b.slug}`,
  //   lastModified: new Date(b.updated),
  //   changeFrequency: "weekly" as const,
  //   priority: b.is_featured ? 0.9 : 0.7,
  // }));

  // const articleRoutes = articles.map((a) => ({
  //   url: `${BASE}/blog/${a.slug}`,
  //   lastModified: new Date(a.updated),
  //   changeFrequency: "monthly" as const,
  //   priority: 0.7,
  // }));

  return [
    ...staticRoutes,
    // ...businessRoutes,
    // ...articleRoutes,
  ];
}
