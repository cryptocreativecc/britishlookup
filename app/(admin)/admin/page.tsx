import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin Dashboard" };

const stats = [
  { label: "Pending Listings", value: "12", href: "/admin/listings", color: "text-amber-600" },
  { label: "Pending Articles", value: "5", href: "/admin/articles", color: "text-amber-600" },
  { label: "Total Businesses", value: "487", href: "/admin/listings", color: "text-brand" },
  { label: "Total Articles", value: "118", href: "/admin/articles", color: "text-brand" },
];

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-text">Admin Dashboard</h1>
      <p className="mt-1 text-text-muted">Manage listings, articles, and submissions</p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="hover:border-brand/30">
              <CardContent>
                <p className="text-sm text-text-muted">{stat.label}</p>
                <p className={`text-3xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8 bg-surface rounded-[var(--radius-card)] p-6 text-sm text-text-muted">
        <p>⚡ This is a placeholder admin dashboard. Authentication and real data will be added in Phase 2–3.</p>
        <p className="mt-2">PocketBase admin is also available at <code className="bg-white px-1.5 py-0.5 rounded text-xs">pb.britishlookup.co.uk/_/</code></p>
      </div>
    </div>
  );
}
