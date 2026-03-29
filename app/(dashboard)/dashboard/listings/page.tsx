export const dynamic = "force-dynamic";
import { requireAuth } from "@/lib/auth";
import { createAdminPb } from "@/lib/pb";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "My Listings — British Lookup" };

export default async function MyListingsPage() {
  const auth = await requireAuth();
  const pb = await createAdminPb();

  let listings: { id: string; name: string; status: string; slug: string; created: string }[] = [];
  try {
    const result = await pb.collection("businesses").getFullList({
      filter: `owner="${auth.user.id}"`,
      sort: "-id",
    });
    listings = result.map((r) => ({
      id: r.id,
      name: r.name,
      status: r.status,
      slug: r.slug,
      created: r.created,
    }));
  } catch { /* collection may not exist yet */ }

  const statusColor: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    featured: "bg-purple-100 text-purple-800",
    rejected: "bg-red-100 text-red-800",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text">My Listings</h1>
        <Link href="/dashboard/listings/new">
          <Button>+ Add Listing</Button>
        </Link>
      </div>

      {listings.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-border">
          <p className="text-text-muted mb-4">You haven&apos;t submitted any listings yet.</p>
          <Link href="/dashboard/listings/new">
            <Button>Submit Your First Business</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {listings.map((listing) => (
            <div key={listing.id} className="flex items-center justify-between bg-white p-4 rounded-lg border border-border">
              <div>
                <h3 className="font-medium text-text">{listing.name}</h3>
                <p className="text-xs text-text-muted">
                  {listing.created ? `Added ${new Date(listing.created).toLocaleDateString("en-GB")}` : ""}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge className={statusColor[listing.status] || ""}>{listing.status}</Badge>
                <Link href={`/dashboard/listings/${listing.id}/edit`} className="text-sm text-brand hover:underline">
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
