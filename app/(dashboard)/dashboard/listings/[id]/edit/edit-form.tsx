"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  listing: {
    id: string;
    name: string;
    description: string;
    phone: string;
    email: string;
    website: string;
    address: string;
    town: string;
    postcode: string;
    tags: string[];
  };
}

export function EditListingForm({ listing }: Props) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch(`/api/listings/${listing.id}/update`, {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");
      setSuccess(true);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const inputClass = "w-full h-11 px-4 rounded-[var(--radius-btn)] border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand";

  return (
    <div>
      <h1 className="text-2xl font-bold text-text mb-6">Edit: {listing.name}</h1>

      <Card>
        <CardContent className="pt-6">
          {error && <div className="mb-4 rounded-lg bg-red-50 text-red-700 p-3 text-sm">{error}</div>}
          {success && <div className="mb-4 rounded-lg bg-green-50 text-green-700 p-3 text-sm">Listing updated!</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">Business Name</label>
                <input name="name" defaultValue={listing.name} required className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">Email</label>
                <input name="email" type="email" defaultValue={listing.email} required className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">Phone</label>
                <input name="phone" type="tel" defaultValue={listing.phone} className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">Website</label>
                <input name="website" type="url" defaultValue={listing.website} className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">Town</label>
                <input name="town" defaultValue={listing.town} required className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">Postcode</label>
                <input name="postcode" defaultValue={listing.postcode} required className={inputClass} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Address</label>
              <input name="address" defaultValue={listing.address} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Description</label>
              <textarea
                name="description"
                defaultValue={listing.description}
                required
                rows={4}
                className="w-full px-4 py-3 rounded-[var(--radius-btn)] border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Tags (comma-separated)</label>
              <input name="tags" defaultValue={(listing.tags || []).join(", ")} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">New Logo</label>
              <input name="logo" type="file" accept="image/*" className="text-sm" />
            </div>
            <Button type="submit" size="lg" disabled={loading}>
              {loading ? "Saving…" : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
