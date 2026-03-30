"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ListingActions({ id, slug, currentStatus }: { id: string; slug: string; currentStatus: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  async function handleAction(action: string) {
    if (action === "delete" && !confirm("Are you sure you want to delete this listing?")) return;
    setLoading(action);
    try {
      await fetch(`/api/admin/listings/${id}/${action}`, { method: "POST" });
      router.refresh();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="flex gap-1">
      {slug && (
        <Link href={`/business/${slug}`} target="_blank">
          <Button size="sm" variant="outline" title="Preview">👁</Button>
        </Link>
      )}
      <Link href={`/admin/listings/${id}/edit`}>
        <Button size="sm" variant="outline" title="Edit">✎</Button>
      </Link>
      {currentStatus !== "approved" && (
        <Button size="sm" onClick={() => handleAction("approve")} disabled={loading !== null}>
          {loading === "approve" ? "…" : "✓"}
        </Button>
      )}
      {currentStatus !== "featured" && currentStatus !== "rejected" && (
        <Button size="sm" variant="outline" onClick={() => handleAction("feature")} disabled={loading !== null}>
          {loading === "feature" ? "…" : "★"}
        </Button>
      )}
      {currentStatus !== "rejected" && (
        <Button size="sm" variant="outline" onClick={() => handleAction("reject")} disabled={loading !== null} className="text-red-600 hover:text-red-700">
          {loading === "reject" ? "…" : "✕"}
        </Button>
      )}
      <Button size="sm" variant="outline" onClick={() => handleAction("delete")} disabled={loading !== null} className="text-red-600 hover:text-red-700">
        {loading === "delete" ? "…" : "🗑"}
      </Button>
    </div>
  );
}
