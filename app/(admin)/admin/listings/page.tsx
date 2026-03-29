import { createAdminPb } from "@/lib/pb";
import { Badge } from "@/components/ui/badge";
import { ListingActions } from "./listing-actions";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Listings — Admin" };

export default async function AdminListingsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status: filterStatus } = await searchParams;
  const pb = await createAdminPb();

  const filter = filterStatus ? `status="${filterStatus}"` : "";

  let listings: {
    id: string;
    name: string;
    town: string;
    email: string;
    status: string;
    claimed: boolean;
    ownerName: string;
    created: string;
  }[] = [];

  try {
    const result = await pb.collection("businesses").getFullList({
      sort: "-created",
      filter,
      expand: "owner",
    });
    listings = result.map((r) => ({
      id: r.id,
      name: r.name,
      town: r.town || "",
      email: r.email || "",
      status: r.status || "pending",
      claimed: r.claimed || false,
      ownerName: r.expand?.owner?.name || "",
      created: r.created,
    }));
  } catch { /* collection may not exist */ }

  const statusColor: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    featured: "bg-purple-100 text-purple-800",
    rejected: "bg-red-100 text-red-800",
  };

  const filters = [
    { label: "All", value: "" },
    { label: "Pending", value: "pending" },
    { label: "Approved", value: "approved" },
    { label: "Featured", value: "featured" },
    { label: "Rejected", value: "rejected" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text">Listings ({listings.length})</h1>
      </div>

      <div className="flex gap-2 mb-4">
        {filters.map((f) => (
          <a
            key={f.value}
            href={f.value ? `/admin/listings?status=${f.value}` : "/admin/listings"}
            className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
              (filterStatus || "") === f.value
                ? "bg-brand text-white border-brand"
                : "bg-white text-text-muted border-border hover:border-brand"
            }`}
          >
            {f.label}
          </a>
        ))}
      </div>

      {listings.length === 0 ? (
        <p className="text-text-muted py-8 text-center">No listings found.</p>
      ) : (
        <div className="space-y-3">
          {listings.map((listing) => (
            <div key={listing.id} className="bg-white p-4 rounded-lg border border-border">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="font-medium text-text">{listing.name}</h3>
                  <p className="text-sm text-text-muted">
                    {listing.town}{listing.email ? ` · ${listing.email}` : ""}
                  </p>
                  {listing.claimed && listing.ownerName && (
                    <p className="text-xs text-brand mt-0.5">Claimed by {listing.ownerName}</p>
                  )}
                  <p className="text-xs text-text-muted mt-0.5">
                    {new Date(listing.created).toLocaleDateString("en-GB")}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge className={statusColor[listing.status] || ""}>{listing.status}</Badge>
                  <ListingActions id={listing.id} currentStatus={listing.status} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
