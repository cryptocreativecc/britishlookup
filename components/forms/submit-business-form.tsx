"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const CATEGORIES = ["Roofing", "Guttering", "Building", "Plumbing", "Electrical", "Painting", "Landscaping", "Joinery", "Carpentry", "Plastering", "Fencing", "Tiling", "Flooring", "Windows & Doors", "Heating", "Other"];
const REGIONS = ["North West", "North East", "Yorkshire", "West Midlands", "East Midlands", "South East", "South West", "London", "East of England", "Scotland", "Wales", "Northern Ireland"];

const inputClass = "w-full h-11 px-4 rounded-[var(--radius-btn)] border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand";

export function SubmitBusinessForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});
    setErrorMsg("");

    const form = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/submit-business", { method: "POST", body: form });
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
        <h2 className="text-xl font-bold text-brand-dark">Submission received!</h2>
        <p className="mt-2 text-text-muted">We&apos;ll review your listing within 3–5 working days and email you once it&apos;s live.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errorMsg && (
        <div className="bg-red-50 text-red-700 text-sm p-3 rounded-[var(--radius-btn)]">
          {errorMsg}
        </div>
      )}

      <Field label="Business Name" name="name" required errors={errors.name} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-text mb-1.5">Category *</label>
          <select name="category" required className={inputClass}>
            <option value="">Select a category</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <FieldError errors={errors.category} />
        </div>
        <div>
          <label className="block text-sm font-medium text-text mb-1.5">Region *</label>
          <select name="region" required className={inputClass}>
            <option value="">Select a region</option>
            {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
          <FieldError errors={errors.region} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Town / City" name="town" required errors={errors.town} />
        <Field label="Postcode" name="postcode" required placeholder="e.g. M1 1AA" errors={errors.postcode} />
      </div>

      <Field label="Full Address" name="address" placeholder="123 Example Street" errors={errors.address} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Phone Number" name="phone" type="tel" errors={errors.phone} />
        <Field label="Email Address" name="email" type="email" required errors={errors.email} />
      </div>

      <Field label="Website URL" name="website" type="url" required placeholder="https://example.com" errors={errors.website} />

      <div>
        <label className="block text-sm font-medium text-text mb-1.5">Business Description *</label>
        <textarea name="description" required rows={4} maxLength={1200} className="w-full px-4 py-3 rounded-[var(--radius-btn)] border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand resize-none" placeholder="Tell us about your business (max 1200 characters)" />
        <FieldError errors={errors.description} />
      </div>

      <Field label="Tags" name="tags" placeholder="roofing, flat roof, repairs (comma-separated)" errors={errors.tags} />

      <div>
        <label className="block text-sm font-medium text-text mb-1.5">Logo Upload</label>
        <input type="file" name="logo" accept="image/jpeg,image/png" className="w-full text-sm text-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-[var(--radius-btn)] file:border-0 file:text-sm file:font-semibold file:bg-brand-light file:text-brand hover:file:bg-brand-light/80" />
        <p className="text-xs text-text-muted mt-1">JPG or PNG, max 2MB</p>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting…" : "Submit Business"}
      </Button>

      <p className="text-xs text-text-muted text-center">
        By submitting, you confirm the information is accurate and you are authorised to list this business.
      </p>
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
