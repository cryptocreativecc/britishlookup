import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Manage Listings" };

// Placeholder data — will be replaced with PocketBase query
const LISTINGS = [
  { id: "1", name: "Thompson Roofing", category: "Roofing", town: "Manchester", status: "approved", is_verified: true, created: "2026-03-20" },
  { id: "2", name: "Castle Guttering", category: "Guttering", town: "Leeds", status: "pending", is_verified: false, created: "2026-03-25" },
  { id: "3", name: "Greenfield Builders", category: "Building", town: "Bristol", status: "approved", is_verified: true, created: "2026-03-18" },
  { id: "4", name: "Spark Electrical", category: "Electrical", town: "London", status: "pending", is_verified: false, created: "2026-03-27" },
  { id: "5", name: "Dodgy Dave Roofing", category: "Roofing", town: "Stoke", status: "rejected", is_verified: false, created: "2026-03-22" },
];

const statusColor: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  featured: "bg-purple-100 text-purple-800",
};

export default function AdminListingsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text">Manage Listings</h1>
          <p className="text-text-muted text-sm">{LISTINGS.length} listings</p>
        </div>
        <Link href="/admin" className="text-sm text-brand hover:text-brand-dark">← Dashboard</Link>
      </div>

      <div className="space-y-3">
        {LISTINGS.map((listing) => (
          <Link key={listing.id} href={`/admin/listings/${listing.id}`}>
            <Card className="hover:border-brand/30">
              <CardContent>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-[var(--radius-btn)] bg-brand-light flex items-center justify-center text-brand font-bold shrink-0">
                      {listing.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-text truncate">{listing.name}</p>
                      <p className="text-sm text-text-muted">{listing.category} · {listing.town}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {listing.is_verified && <Badge variant="outline">✓ Verified</Badge>}
                    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${statusColor[listing.status]}`}>
                      {listing.status}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
