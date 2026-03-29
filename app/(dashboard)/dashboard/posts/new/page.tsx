"use client";

import { useState, lazy, Suspense } from "react";
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Title *</label>
              <input name="title" required className={inputClass} />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Content *</label>
              <Suspense fallback={<div className="h-[250px] border border-border rounded-lg animate-pulse bg-gray-50" />}>
                <TipTapEditor onChange={setBody} />
              </Suspense>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Short Bio</label>
              <textarea
                name="author_bio"
                rows={2}
                className="w-full px-4 py-3 rounded-[var(--radius-btn)] border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
                placeholder="A short bio about yourself"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">Company</label>
                <input name="author_company" className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">Website</label>
                <input name="author_website" type="url" className={inputClass} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Cover Image</label>
              <input name="cover_image" type="file" accept="image/*" className="text-sm" />
            </div>

            <Button type="submit" size="lg" disabled={loading}>
              {loading ? "Submitting…" : "Submit Post"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
