"use client";

import { useState, lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";

const TipTapEditor = lazy(() =>
  import("@/components/ui/tiptap-editor").then((m) => ({ default: m.TipTapEditor }))
);

const inputClass = "w-full h-11 px-4 rounded-[var(--radius-btn)] border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand";

interface Props {
  categories: { id: string; name: string }[];
}

export function SubmitArticleForm({ categories }: Props) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [errorMsg, setErrorMsg] = useState("");
  const [body, setBody] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});
    setErrorMsg("");

    if (!body || body === "<p></p>") {
      setErrorMsg("Article content is required");
      setStatus("error");
      return;
    }
    const form = new FormData(e.currentTarget);
    form.set("body", body);

    try {
      const res = await fetch("/api/submit-article", { method: "POST", body: form });
      const data = await res.json();

      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        setErrorMsg(data.error || "Something went wrong");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMsg("Network error — please try again");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-brand-light rounded-[var(--radius-card)] p-8 text-center">
        <div className="text-4xl mb-3">✅</div>
        <h2 className="text-xl font-bold text-brand-dark">Article submitted!</h2>
        <p className="mt-2 text-text-muted">Our editorial team will review your article within 5–7 working days. You&apos;ll receive an email once it&apos;s published.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errorMsg && (
        <div className="bg-red-50 text-red-700 text-sm p-3 rounded-[var(--radius-btn)]">{errorMsg}</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Full Name" name="author_name" required errors={errors.author_name} />
        <Field label="Email" name="email" type="email" required errors={errors.email} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Business / Publication" name="author_company" errors={errors.author_company} />
        <Field label="Website URL" name="author_website" type="url" required placeholder="https://" errors={errors.author_website} />
      </div>

      <Field label="Article Title" name="title" required errors={errors.title} />

      <div>
        <label className="block text-sm font-medium text-text mb-1.5">Category *</label>
        <select name="category" required className={inputClass}>
          <option value="">Select a category</option>
          {categories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
        </select>
        <FieldError errors={errors.category} />
      </div>

      <div>
        <label className="block text-sm font-medium text-text mb-1.5">Article Content *</label>
        <Suspense fallback={<div className="h-[250px] border border-border rounded-lg animate-pulse bg-gray-50" />}>
          <TipTapEditor onChange={setBody} />
        </Suspense>
        <FieldError errors={errors.body} />
      </div>

      <div>
        <label className="block text-sm font-medium text-text mb-1.5">Author Bio *</label>
        <textarea name="author_bio" required rows={2} maxLength={200} className="w-full px-4 py-3 rounded-[var(--radius-btn)] border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand resize-none" placeholder="Short bio shown at the end of your article (max 200 chars)" />
        <FieldError errors={errors.author_bio} />
      </div>

      <div>
        <label className="block text-sm font-medium text-text mb-1.5">Cover Image</label>
        <input type="file" name="cover_image" accept="image/jpeg,image/png" className="w-full text-sm text-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-[var(--radius-btn)] file:border-0 file:text-sm file:font-semibold file:bg-brand-light file:text-brand hover:file:bg-brand-light/80" />
        <p className="text-xs text-text-muted mt-1">JPG or PNG, max 4MB</p>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting…" : "Submit Article"}
      </Button>
    </form>
  );
}

function Field({ label, name, required, placeholder, type = "text", errors }: {
  label: string; name: string; required?: boolean; placeholder?: string; type?: string; errors?: string[];
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-text mb-1.5">{label}{required ? " *" : ""}</label>
      <input type={type} name={name} required={required} placeholder={placeholder} className={inputClass} />
      <FieldError errors={errors} />
    </div>
  );
}

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return <p className="text-xs text-red-600 mt-1">{errors[0]}</p>;
}
