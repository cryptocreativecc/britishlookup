import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Manage Articles" };

const ARTICLES = [
  { id: "1", title: "How to Choose a Reliable Roofer in 2026", author: "BritishLookup Editorial", category: "Roofing", status: "published", created: "2026-03-25" },
  { id: "2", title: "The Complete Guide to Guttering Maintenance", author: "James Harper", category: "Guttering", status: "published", created: "2026-03-20" },
  { id: "3", title: "Why Every UK Trade Business Needs an Online Presence", author: "Sarah Mitchell", category: "Business", status: "pending", created: "2026-03-27" },
  { id: "4", title: "Flat Roof vs Pitched Roof: Pros and Cons", author: "Tom Richardson", category: "Roofing", status: "pending", created: "2026-03-28" },
];

const statusColor: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  approved: "bg-blue-100 text-blue-800",
  published: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

export default function AdminArticlesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text">Manage Articles</h1>
          <p className="text-text-muted text-sm">{ARTICLES.length} articles</p>
        </div>
        <Link href="/admin" className="text-sm text-brand hover:text-brand-dark">← Dashboard</Link>
      </div>

      <div className="space-y-3">
        {ARTICLES.map((article) => (
          <Link key={article.id} href={`/admin/articles/${article.id}`}>
            <Card className="hover:border-brand/30">
              <CardContent>
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-semibold text-text truncate">{article.title}</p>
                    <p className="text-sm text-text-muted">{article.author} · {article.category} · {article.created}</p>
                  </div>
                  <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full shrink-0 ${statusColor[article.status]}`}>
                    {article.status}
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
