export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "business_owner" | "admin";
  avatar: string;
  verified: boolean;
  verification_token: string;
  reset_token: string;
  reset_token_expiry: string;
  created: string;
  updated: string;
}

export interface Business {
  id: string;
  name: string;
  slug: string;
  description: string;
  full_description: string;
  category: string;
  region: string;
  town: string;
  postcode: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  logo: string;
  tags: string[];
  status: "pending" | "approved" | "rejected" | "featured";
  is_verified: boolean;
  is_featured: boolean;
  claimed: boolean;
  owner: string;
  rating_avg: number;
  rating_count: number;
  lat: number;
  lng: number;
  created: string;
  updated: string;
  expand?: {
    category?: Category;
    region?: Region;
    owner?: User;
  };
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  category: string;
  author: string;
  author_name: string;
  author_bio: string;
  author_website: string;
  author_company: string;
  cover_image: string;
  read_time: number;
  status: "pending" | "approved" | "rejected" | "published";
  is_editorial: boolean;
  seo_title: string;
  seo_description: string;
  published_at: string;
  created: string;
  updated: string;
  expand?: {
    category?: Category;
    author?: User;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
}

export interface Region {
  id: string;
  name: string;
  slug: string;
  county: string;
}

export interface Review {
  id: string;
  business: string;
  rating: number;
  comment: string;
  author_name: string;
  status: "pending" | "approved" | "rejected";
  created: string;
}

export interface Claim {
  id: string;
  business: string;
  user: string;
  status: "pending" | "approved" | "rejected";
  message: string;
  created: string;
  updated: string;
  expand?: {
    business?: Business;
    user?: User;
  };
}

export interface BusinessSubmission {
  name: string;
  category: string;
  region: string;
  town: string;
  postcode: string;
  address?: string;
  phone?: string;
  email: string;
  website: string;
  description: string;
  tags?: string;
  logo?: File;
}

export interface ArticleSubmission {
  author_name: string;
  email: string;
  author_company?: string;
  author_website: string;
  title: string;
  category: string;
  body: string;
  author_bio: string;
  cover_image?: File;
}
