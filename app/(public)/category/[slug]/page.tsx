import { BusinessCard } from "@/components/directory/business-card";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const name = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: `${name} Businesses — UK ${name} Directory`,
    description: `Find trusted ${name.toLowerCase()} businesses across the UK. Verified listings with reviews and contact details.`,
  };
}

const SAMPLE = [
  { name: "Thompson Roofing", slug: "thompson-roofing", category: "Roofing", town: "Manchester", description: "Professional roofing services across Greater Manchester.", isVerified: true },
  { name: "Apex Roofing", slug: "apex-roofing", category: "Roofing", town: "Birmingham", description: "Commercial and domestic roofing contractors in the Midlands." },
  { name: "Summit Roofing", slug: "summit-roofing", category: "Roofing", town: "London", description: "Specialist flat roofing and cladding for London properties." },
];

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const name = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-text">{name} Businesses</h1>
      <p className="mt-2 text-text-muted">
        Find trusted {name.toLowerCase()} businesses across the UK
      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SAMPLE.map((biz) => (
          <BusinessCard key={biz.slug} {...biz} />
        ))}
      </div>

      <div className="mt-8 bg-surface rounded-[var(--radius-card)] p-4 text-sm text-text-muted">
        Results will be dynamically loaded from PocketBase filtered by category.
      </div>
    </div>
  );
}
