import { createAdminPb } from "@/lib/pb";
import { Card, CardContent } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin — British Lookup" };

async function getCount(pb: Awaited<ReturnType<typeof createAdminPb>>, collection: string, filter?: string) {
  try {
    const result = await pb.collection(collection).getList(1, 1, { filter });
    return result.totalItems;
  } catch {
    return 0;
  }
}

export default async function AdminDashboard() {
  const pb = await createAdminPb();

  const [totalListings, pendingListings, totalArticles, pendingArticles, totalUsers, pendingClaims] =
    await Promise.all([
      getCount(pb, "businesses"),
      getCount(pb, "businesses", 'status="pending"'),
      getCount(pb, "articles"),
      getCount(pb, "articles", 'status="pending"'),
      getCount(pb, "users"),
      getCount(pb, "claims", 'status="pending"'),
    ]);

  const stats = [
    { label: "Total Listings", value: totalListings, color: "text-brand" },
    { label: "Pending Listings", value: pendingListings, color: "text-yellow-600" },
    { label: "Total Articles", value: totalArticles, color: "text-brand" },
    { label: "Pending Articles", value: pendingArticles, color: "text-yellow-600" },
    { label: "Users", value: totalUsers, color: "text-brand" },
    { label: "Pending Claims", value: pendingClaims, color: "text-yellow-600" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-text mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
              <p className="text-sm text-text-muted mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
