import { SearchBar } from "@/components/ui/search-bar";
import { Badge } from "@/components/ui/badge";
import { BusinessCard } from "@/components/directory/business-card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Directory — Find UK Tradespeople & Services",
  description: "Browse verified UK businesses by category and region. Find trusted tradespeople, suppliers, and local services near you.",
};

const CATEGORIES = ["Roofing", "Guttering", "Building", "Plumbing", "Electrical", "Painting", "Landscaping", "Joinery"];
const REGIONS = ["North West", "North East", "Yorkshire", "Midlands", "South East", "South West", "London", "Scotland", "Wales"];

const SAMPLE = [
  { name: "Thompson Roofing", slug: "thompson-roofing", category: "Roofing", town: "Manchester", description: "Professional roofing services across Greater Manchester.", isFeatured: true, isVerified: true },
  { name: "Castle Guttering", slug: "castle-guttering", category: "Guttering", town: "Leeds", description: "Guttering installation, cleaning and repair specialists.", isVerified: true },
  { name: "Greenfield Builders", slug: "greenfield-builders", category: "Building", town: "Bristol", description: "Family-run building company. Extensions, renovations, and new builds." },
  { name: "Spark Electrical", slug: "spark-electrical", category: "Electrical", town: "London", description: "NICEIC registered electricians for domestic and commercial work." },
  { name: "Apex Plumbing", slug: "apex-plumbing", category: "Plumbing", town: "Birmingham", description: "Emergency plumbing and heating engineers. Gas Safe registered." },
  { name: "Heritage Joinery", slug: "heritage-joinery", category: "Joinery", town: "Edinburgh", description: "Bespoke joinery and carpentry for period properties." },
];

export default function DirectoryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-text">Business Directory</h1>
      <p className="mt-2 text-text-muted">Find trusted UK businesses by category and region</p>

      <div className="mt-6">
        <SearchBar />
      </div>

      {/* Filters */}
      <div className="mt-6 space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-text mb-2">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <Badge key={cat} variant="brand" className="cursor-pointer hover:opacity-80">{cat}</Badge>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-text mb-2">Regions</h3>
          <div className="flex flex-wrap gap-2">
            {REGIONS.map((r) => (
              <Badge key={r} variant="outline" className="cursor-pointer hover:border-brand">{r}</Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SAMPLE.map((biz) => (
          <BusinessCard key={biz.slug} {...biz} />
        ))}
      </div>
    </div>
  );
}
