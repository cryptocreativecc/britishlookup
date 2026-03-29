export const dynamic = "force-dynamic";
import { createAdminPb } from "@/lib/pb";
import { Badge } from "@/components/ui/badge";
import { ArticleActions } from "./article-actions";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Articles — Admin" };

export default async function AdminArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status: filterStatus } = await searchParams;
  const pb = await createAdminPb();

  const filter = filterStatus ? `status="${filterStatus}"` : "";

  let articles: {
    id: string;
    title: string;
    slug: string;
    author_name: string;
    status: string;
    created: string;
  }[] = [];

  try {
    const result = await pb.collection("articles").getFullList({
      sort: "-id",
      filter,
    });
    articles = result.map((r) => ({
      id: r.id,
      title: r.title,
      slug: r.slug || "",
      author_name: r.author_name || "",
      status: r.status || "pending",
      created: r.created,
    }));
  } catch { /* collection may not exist */ }

  const statusColor: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    published: "bg-blue-100 text-blue-800",
    rejected: "bg-red-100 text-red-800",
  };

  const filters = [
    { label: "All", value: "" },
    { label: "Pending", value: "pending" },
    { label: "Published", value: "published" },
    { label: "Rejected", value: "rejected" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-text mb-6">Articles ({articles.length})</h1>

      <div className="flex gap-2 mb-4">
        {filters.map((f) => (
          <a
            key={f.value}
            href={f.value ? `/admin/articles?status=${f.value}` : "/admin/articles"}
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

      {articles.length === 0 ? (
        <p className="text-text-muted py-8 text-center">No articles found.</p>
      ) : (
        <div className="space-y-3">
          {articles.map((article) => (
            <div key={article.id} className="flex items-center justify-between bg-white p-4 rounded-lg border border-border">
              <div>
                <h3 className="font-medium text-text">{article.title}</h3>
                <p className="text-sm text-text-muted">
                  by {article.author_name || "Unknown"} · {article.created ? new Date(article.created).toLocaleDateString("en-GB") : "—"}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge className={statusColor[article.status] || ""}>{article.status}</Badge>
                <ArticleActions id={article.id} slug={article.slug} currentStatus={article.status} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
