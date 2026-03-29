import { createAdminPb } from "@/lib/pb";
import { Badge } from "@/components/ui/badge";
import { ClaimActions } from "./claim-actions";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Claims — Admin" };

export default async function AdminClaimsPage() {
  const pb = await createAdminPb();

  let claims: {
    id: string;
    status: string;
    message: string;
    created: string;
    businessName: string;
    userName: string;
    userEmail: string;
  }[] = [];

  try {
    const result = await pb.collection("claims").getFullList({
      sort: "-created",
      expand: "business,user",
    });
    claims = result.map((c) => ({
      id: c.id,
      status: c.status,
      message: c.message || "",
      created: c.created,
      businessName: c.expand?.business?.name || "Unknown",
      userName: c.expand?.user?.name || "Unknown",
      userEmail: c.expand?.user?.email || "",
    }));
  } catch { /* collection may not exist */ }

  const statusColor: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-text mb-6">Claims ({claims.length})</h1>

      {claims.length === 0 ? (
        <p className="text-text-muted">No claims yet.</p>
      ) : (
        <div className="space-y-3">
          {claims.map((claim) => (
            <div key={claim.id} className="bg-white p-4 rounded-lg border border-border">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-medium text-text">{claim.businessName}</h3>
                  <p className="text-sm text-text-muted">
                    by {claim.userName} ({claim.userEmail})
                  </p>
                  {claim.message && (
                    <p className="text-sm text-text-muted mt-1 italic">&ldquo;{claim.message}&rdquo;</p>
                  )}
                  <p className="text-xs text-text-muted mt-1">
                    {new Date(claim.created).toLocaleDateString("en-GB")}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={statusColor[claim.status] || ""}>{claim.status}</Badge>
                  {claim.status === "pending" && <ClaimActions claimId={claim.id} />}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
