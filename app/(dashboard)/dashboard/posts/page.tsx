export const dynamic = "force-dynamic";
import { requireAuth } from "@/lib/auth";
import { createAdminPb } from "@/lib/pb";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "My Posts — British Lookup" };

export default async function MyPostsPage() {
  const auth = await requireAuth();
  const pb = await createAdminPb();

  let posts: { id: string; title: string; status: string; slug: string; created: string }[] = [];
  try {
    const result = await pb.collection("articles").getFullList({
      filter: `author="${auth.user.id}"`,
      sort: "-id",
    });
    posts = result.map((r) => ({
      id: r.id,
      title: r.title,
      status: r.status,
      slug: r.slug,
      created: r.created,
    }));
  } catch { /* collection may not exist yet */ }

  const statusColor: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    published: "bg-blue-100 text-blue-800",
    rejected: "bg-red-100 text-red-800",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text">My Posts</h1>
        <Link href="/dashboard/posts/new">
          <Button>+ New Post</Button>
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-border">
          <p className="text-text-muted mb-4">You haven&apos;t written any posts yet.</p>
          <Link href="/dashboard/posts/new">
            <Button>Write Your First Post</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post.id} className="flex items-center justify-between bg-white p-4 rounded-lg border border-border">
              <div>
                <h3 className="font-medium text-text">{post.title}</h3>
                <p className="text-xs text-text-muted">
                  {new Date(post.created).toLocaleDateString("en-GB")}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge className={statusColor[post.status] || ""}>{post.status}</Badge>
                <Link href={`/dashboard/posts/${post.id}/edit`} className="text-sm text-brand hover:underline">
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
