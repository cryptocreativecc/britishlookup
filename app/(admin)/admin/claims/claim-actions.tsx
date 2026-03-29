"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function ClaimActions({ claimId }: { claimId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  async function handleAction(action: "approve" | "reject") {
    setLoading(action);
    try {
      await fetch(`/api/claims/${claimId}/${action}`, { method: "POST" });
      router.refresh();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        onClick={() => handleAction("approve")}
        disabled={loading !== null}
      >
        {loading === "approve" ? "…" : "Approve"}
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => handleAction("reject")}
        disabled={loading !== null}
      >
        {loading === "reject" ? "…" : "Reject"}
      </Button>
    </div>
  );
}
