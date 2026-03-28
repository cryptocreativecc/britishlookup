import { type ClassValue, clsx } from "clsx";
import slugifyLib from "slugify";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function slugify(text: string): string {
  return slugifyLib(text, { lower: true, strict: true });
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trimEnd() + "…";
}
