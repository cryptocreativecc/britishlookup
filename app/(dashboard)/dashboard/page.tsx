import { requireAuth } from "@/lib/auth";
import { createAdminPb } from "@/lib/pb";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard — British Lookup" };

export default async function DashboardPage() {
  const auth = await requireAuth();
  const pb = await createAdminPb();

  let listingCount = 0;
  let postCount = 0;
  try {
    const listings = await pb.collection("businesses").getList(1, 1, {
      filter: `owner="${auth.user.id}"`,
    });
    listingCount = listings.totalItems;
  } catch { /* collection may not exist yet */ }

  try {
    const posts = await pb.collection("articles").getList(1, 1, {
      filter: `author="${auth.user.id}"`,
    });
    postCount = posts.totalItems;
  } catch { /* collection may not exist yet */ }

  return (
    <div>
      <h1 className="text-2xl font-bold text-text mb-6">
        Welcome, {auth.user.name || "there"}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-brand">{listingCount}</div>
            <p className="text-sm text-text-muted mt-1">Your Listings</p>
            <Link href="/dashboard/listings" className="text-sm text-brand hover:underline mt-2 inline-block">
              Manage →
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-brand">{postCount}</div>
            <p className="text-sm text-text-muted mt-1">Your Posts</p>
            <Link href="/dashboard/posts" className="text-sm text-brand hover:underline mt-2 inline-block">
              Manage →
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/dashboard/listings/new"
          className="block p-4 bg-white rounded-lg border border-border hover:border-brand transition-colors"
        >
          <span className="text-lg">🏢</span>
          <h3 className="font-semibold text-text mt-1">Submit a Business</h3>
          <p className="text-sm text-text-muted">Add your business to the directory</p>
        </Link>
        <Link
          href="/dashboard/posts/new"
          className="block p-4 bg-white rounded-lg border border-border hover:border-brand transition-colors"
        >
          <span className="text-lg">✍️</span>
          <h3 className="font-semibold text-text mt-1">Write a Post</h3>
          <p className="text-sm text-text-muted">Contribute an article to our blog</p>
        </Link>
      </div>
    </div>
  );
}
