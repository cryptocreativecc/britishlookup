"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function ArticleActions({ id, currentStatus }: { id: string; currentStatus: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  async function handleAction(action: string) {
    setLoading(action);
    try {
      await fetch(`/api/admin/articles/${id}/${action}`, { method: "POST" });
      router.refresh();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="flex gap-1">
      {currentStatus !== "published" && (
        <Button size="sm" onClick={() => handleAction("publish")} disabled={loading !== null}>
          {loading === "publish" ? "…" : "Publish"}
        </Button>
      )}
      {currentStatus !== "rejected" && (
        <Button size="sm" variant="outline" onClick={() => handleAction("reject")} disabled={loading !== null} className="text-red-600">
          {loading === "reject" ? "…" : "✕"}
        </Button>
      )}
      <Button size="sm" variant="outline" onClick={() => handleAction("delete")} disabled={loading !== null} className="text-red-600">
        {loading === "delete" ? "…" : "🗑"}
      </Button>
    </div>
  );
}
