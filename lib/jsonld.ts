import type { Business, Article } from "./types";

const BASE = "https://britishlookup.co.uk";

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "BritishLookup",
    url: BASE,
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${BASE}/directory?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BritishLookup",
    url: BASE,
    description: "UK business directory for tradespeople, suppliers, and local services.",
  };
}

export function localBusinessJsonLd(biz: Business) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: biz.name,
    description: biz.description,
    url: `${BASE}/directory/${biz.slug}`,
    telephone: biz.phone || undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: biz.address || undefined,
      addressLocality: biz.town,
      postalCode: biz.postcode,
      addressCountry: "GB",
    },
    geo: biz.lat && biz.lng ? {
      "@type": "GeoCoordinates",
      latitude: biz.lat,
      longitude: biz.lng,
    } : undefined,
    ...(biz.rating_count > 0 ? {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: biz.rating_avg,
        reviewCount: biz.rating_count,
      },
    } : {}),
  };
}

export function articleJsonLd(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    url: `${BASE}/blog/${article.slug}`,
    datePublished: article.published_at,
    author: {
      "@type": "Person",
      name: article.author_name,
      url: article.author_website || undefined,
    },
    publisher: {
      "@type": "Organization",
      name: "BritishLookup",
      url: BASE,
    },
    ...(article.cover_image ? { image: article.cover_image } : {}),
  };
}

export function itemListJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.url,
    })),
  };
}
