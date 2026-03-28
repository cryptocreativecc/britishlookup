import { ArticleCard } from "@/components/blog/article-card";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — UK Trades Guides & Business Insights",
  description: "Guides, tips, and expert insights for UK tradespeople and homeowners. Written by industry professionals.",
};

const CATEGORIES = ["All", "Roofing", "Guttering", "Building", "Business", "Trades Tips"];

const ARTICLES = [
  { title: "How to Choose a Reliable Roofer in 2026", slug: "choose-reliable-roofer-2026", excerpt: "Finding a trustworthy roofer doesn't have to be stressful. Here's what to look for.", category: "Roofing", authorName: "BritishLookup Editorial", readTime: 5, publishedAt: "2026-03-25" },
  { title: "The Complete Guide to Guttering Maintenance", slug: "guttering-maintenance-guide", excerpt: "Regular guttering maintenance prevents costly damage to your home.", category: "Guttering", authorName: "James Harper", readTime: 7, publishedAt: "2026-03-20" },
  { title: "Why Every UK Trade Business Needs an Online Presence", slug: "uk-trade-business-online-presence", excerpt: "If you're a tradesperson without a website, you're leaving money on the table.", category: "Business", authorName: "Sarah Mitchell", readTime: 4, publishedAt: "2026-03-18" },
  { title: "10 Questions to Ask Before Hiring a Builder", slug: "questions-before-hiring-builder", excerpt: "Don't start a building project without asking these essential questions first.", category: "Building", authorName: "Tom Richardson", readTime: 6, publishedAt: "2026-03-15" },
  { title: "Flat Roof vs Pitched Roof: Pros and Cons", slug: "flat-roof-vs-pitched-roof", excerpt: "Considering a new roof? Here's a detailed comparison of flat and pitched options.", category: "Roofing", authorName: "BritishLookup Editorial", readTime: 8, publishedAt: "2026-03-12" },
  { title: "How to Market Your Trade Business Locally", slug: "market-trade-business-locally", excerpt: "Practical marketing strategies that work for local tradespeople in 2026.", category: "Business", authorName: "Laura Chen", readTime: 5, publishedAt: "2026-03-10" },
];

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-text">Blog</h1>
      <p className="mt-2 text-text-muted">Guides, tips, and insights for UK trades and homeowners</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <Badge key={cat} variant={cat === "All" ? "brand" : "outline"} className="cursor-pointer hover:opacity-80">
            {cat}
          </Badge>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {ARTICLES.map((article) => (
          <ArticleCard key={article.slug} {...article} />
        ))}
      </div>
    </div>
  );
}
