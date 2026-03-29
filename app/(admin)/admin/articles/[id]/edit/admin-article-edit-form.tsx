"use client";

import { useState, lazy, Suspense } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const TipTapEditor = lazy(() =>
  import("@/components/ui/tiptap-editor").then((m) => ({ default: m.TipTapEditor }))
);

const inputClass = "w-full h-11 px-4 rounded-[var(--radius-btn)] border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  article: Record<string, any>;
  categories: { id: string; name: string }[];
}

export function AdminArticleEditForm({ article, categories }: Props) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [body, setBody] = useState(article.body || "");
  const [category, setCategory] = useState(article.category || "");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!body || body === "<p></p>") {
      setError("Content is required");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess(false);

    const fd = new FormData(e.currentTarget);
    const payload = new FormData();
    payload.set("title", fd.get("title") as string);
    payload.set("body", body);
    payload.set("category", category);
    payload.set("author_name", fd.get("author_name") as string || "");
    payload.set("author_bio", fd.get("author_bio") as string || "");
    payload.set("author_website", fd.get("author_website") as string || "");
    payload.set("author_company", fd.get("author_company") as string || "");
    payload.set("seo_title", fd.get("seo_title") as string || "");
    payload.set("seo_description", fd.get("seo_description") as string || "");

    const cover = fd.get("cover_image") as File;
    if (cover && cover.size > 0) payload.set("cover_image", cover);

    try {
      const res = await fetch(`/api/admin/articles/${article.id}/update`, {
        method: "POST",
        body: payload,
      });
      if (!res.ok) throw new Error((await res.json()).error || "Update failed");
      setSuccess(true);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        {error && <div className="mb-4 rounded-lg bg-red-50 text-red-700 p-3 text-sm">{error}</div>}
        {success && <div className="mb-4 rounded-lg bg-green-50 text-green-700 p-3 text-sm">Article updated successfully.</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Title *</label>
            <input name="title" required defaultValue={article.title} className={inputClass} />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass}>
              <option value="">Select a category</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Content *</label>
            <Suspense fallback={<div className="h-[250px] border border-border rounded-lg animate-pulse bg-gray-50" />}>
              <TipTapEditor content={body} onChange={setBody} />
            </Suspense>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Author Name</label>
              <input name="author_name" defaultValue={article.author_name} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Author Company</label>
              <input name="author_company" defaultValue={article.author_company} className={inputClass} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Author Website</label>
            <input name="author_website" defaultValue={article.author_website} className={inputClass} />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Author Bio</label>
            <textarea name="author_bio" defaultValue={article.author_bio} rows={2} maxLength={200} className="w-full px-4 py-3 rounded-[var(--radius-btn)] border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand resize-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Cover Image</label>
            <input type="file" name="cover_image" accept="image/jpeg,image/png" className="w-full text-sm text-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-[var(--radius-btn)] file:border-0 file:text-sm file:font-semibold file:bg-brand-light file:text-brand hover:file:bg-brand-light/80" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">SEO Title</label>
              <input name="seo_title" defaultValue={article.seo_title} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">SEO Description</label>
              <input name="seo_description" defaultValue={article.seo_description} className={inputClass} />
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? "Saving…" : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
