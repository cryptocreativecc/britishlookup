"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function UserDeleteButton({ userId, userName }: { userId: string; userName: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm(`Delete user "${userName}"? This cannot be undone.`)) return;
    setLoading(true);
    try {
      await fetch(`/api/admin/users/${userId}/delete`, { method: "POST" });
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button size="sm" variant="outline" onClick={handleDelete} disabled={loading} className="text-red-600 hover:text-red-700">
      {loading ? "…" : "🗑"}
    </Button>
  );
}
