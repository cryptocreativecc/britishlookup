import { BusinessCard } from "@/components/directory/business-card";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const name = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: `${name} Businesses — UK Directory`,
    description: `Browse trusted businesses in ${name}. Find local tradespeople, suppliers, and services.`,
  };
}

const SAMPLE = [
  { name: "Thompson Roofing", slug: "thompson-roofing", category: "Roofing", town: "Manchester", description: "Professional roofing services across Greater Manchester.", isVerified: true },
  { name: "Castle Guttering", slug: "castle-guttering", category: "Guttering", town: "Leeds", description: "Guttering installation and repair specialists." },
];

export default async function RegionPage({ params }: Props) {
  const { slug } = await params;
  const name = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-text">Businesses in {name}</h1>
      <p className="mt-2 text-text-muted">
        Find trusted businesses and tradespeople in {name}
      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SAMPLE.map((biz) => (
          <BusinessCard key={biz.slug} {...biz} />
        ))}
      </div>
    </div>
  );
}
