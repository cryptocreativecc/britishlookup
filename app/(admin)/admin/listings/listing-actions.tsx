"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function ListingActions({ id, currentStatus }: { id: string; currentStatus: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  async function handleAction(action: string) {
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
