import type { Metadata } from "next";

const BASE_URL = "https://britishlookup.co.uk";
const SITE_NAME = "BritishLookup";
const DEFAULT_DESC =
  "Find trusted UK businesses — your directory for tradespeople, suppliers, and local services across Britain.";

export const baseMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `${SITE_NAME} — UK Business Directory & Trades Guide`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESC,
  icons: {
    icon: "/British-Lookup-Favicon.svg",
    shortcut: "/British-Lookup-Favicon.svg",
    apple: "/British-Lookup-Favicon.svg",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_GB",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export function listingMeta(listing: {
  name: string;
  category: string;
  town: string;
  description: string;
  slug: string;
  logo_url?: string;
}): Metadata {
  const title = `${listing.name} — ${listing.category} in ${listing.town}`;
  return {
    title,
    description: listing.description,
    alternates: { canonical: `${BASE_URL}/directory/${listing.slug}` },
    openGraph: {
      title: listing.name,
      description: listing.description,
      ...(listing.logo_url ? { images: [listing.logo_url] } : {}),
    },
  };
}

export function articleMeta(article: {
  title: string;
  excerpt: string;
  slug: string;
  cover_url?: string;
}): Metadata {
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `${BASE_URL}/blog/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      ...(article.cover_url ? { images: [article.cover_url] } : {}),
    },
  };
}
