export const dynamic = "force-dynamic";
import { createAdminPb } from "@/lib/pb";
import { redirect } from "next/navigation";
import { AdminArticleEditForm } from "./admin-article-edit-form";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edit Article — Admin" };

export default async function AdminEditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pb = await createAdminPb();

  let article;
  try {
    article = await pb.collection("articles").getOne(id);
  } catch {
    redirect("/admin/articles");
  }

  let categories: { id: string; name: string }[] = [];
  try {
    const cats = await pb.collection("categories").getFullList({ sort: "name" });
    categories = cats.map((c) => ({ id: c.id, name: c.name as string }));
  } catch {}

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link href="/admin/articles" className="text-sm text-brand hover:text-brand-dark">← Back to articles</Link>
      <h1 className="text-2xl font-bold text-text mt-4 mb-6">Edit: {article.title}</h1>
      <AdminArticleEditForm article={article} categories={categories} />
    </div>
  );
}
