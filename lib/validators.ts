import { z } from "zod";

const UK_POSTCODE = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;

export const businessSchema = z.object({
  name: z.string().min(2, "Business name is required").max(200),
  category: z.string().min(1, "Category is required"),
  region: z.string().min(1, "Region is required"),
  town: z.string().min(1, "Town is required").max(100),
  postcode: z.string().regex(UK_POSTCODE, "Enter a valid UK postcode"),
  address: z.string().max(300).optional().or(z.literal("")),
  phone: z.string().max(20).optional().or(z.literal("")),
  email: z.string().email("Enter a valid email address"),
  website: z.string().url("Enter a valid URL").or(z.literal("")),
  anchor_text: z.string().max(100).optional().or(z.literal("")),
  description: z.string().min(20, "Description must be at least 20 characters").max(2400),
  services: z.string().optional().or(z.literal("")),
  social_links: z.string().optional().or(z.literal("")),
  opening_hours: z.string().optional().or(z.literal("")),
  amenities: z.string().optional().or(z.literal("")),
});

export const articleSchema = z.object({
  author_name: z.string().min(2, "Name is required").max(100),
  email: z.string().email("Enter a valid email address"),
  author_company: z.string().max(100).optional(),
  author_website: z.string().url("Enter a valid URL").startsWith("http").or(z.literal("")).optional(),
  title: z.string().min(5, "Article title is required").max(200),
  category: z.string().min(1, "Category is required"),
  body: z.string().min(100, "Article must be at least 100 characters"),
  author_bio: z.string().min(10, "Bio is required").max(200),
});

export type BusinessFormData = z.infer<typeof businessSchema>;
export type ArticleFormData = z.infer<typeof articleSchema>;
