"use client";

import { useState, useEffect, lazy, Suspense } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const TipTapEditor = lazy(() =>
  import("@/components/ui/tiptap-editor").then((m) => ({ default: m.TipTapEditor }))
);

export default function NewPostPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [body, setBody] = useState("");
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    fetch("/api/lookup/categories")
      .then((r) => r.json())
      .then((d) => setCategories(Array.isArray(d) ? d : d.categories || []))
      .catch(() => {});
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!body || body === "<p></p>") {
      setError("Content is required");
      return;
    }
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    form.set("body", body);
    try {
      const res = await fetch("/api/submit-article", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      router.push("/dashboard/posts");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  const inputClass = "w-full h-11 px-4 rounded-[var(--radius-btn)] border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand";

  return (
    <div>
      <h1 className="text-2xl font-bold text-text mb-6">Write a Post</h1>

      <Card>
        <CardContent className="pt-6">
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 text-red-700 p-3 text-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">Full Name *</label>
                <input name="author_name" required className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">Email *</label>
                <input name="email" type="email" required className={inputClass} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">Business / Publication</label>
                <input name="author_company" className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">Website URL</label>
                <input name="author_website" placeholder="https://" className={inputClass} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Title *</label>
              <input name="title" required className={inputClass} />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Category *</label>
              <select name="category" required className={inputClass}>
                <option value="">Select a category</option>
                {categories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Content *</label>
              <Suspense fallback={<div className="h-[250px] border border-border rounded-lg animate-pulse bg-gray-50" />}>
                <TipTapEditor onChange={setBody} />
              </Suspense>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Author Bio *</label>
              <textarea
                name="author_bio"
                required
                rows={2}
                maxLength={200}
                className="w-full px-4 py-3 rounded-[var(--radius-btn)] border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand resize-none"
                placeholder="Short bio shown at the end of your article (max 200 chars)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Cover Image</label>
              <input name="cover_image" type="file" accept="image/jpeg,image/png" className="w-full text-sm text-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-[var(--radius-btn)] file:border-0 file:text-sm file:font-semibold file:bg-brand-light file:text-brand hover:file:bg-brand-light/80" />
              <p className="text-xs text-text-muted mt-1">JPG or PNG, max 4MB</p>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Submitting…" : "Submit Post"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
