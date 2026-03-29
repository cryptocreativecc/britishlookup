"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function ClaimButton({ businessId }: { businessId: string }) {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success?: boolean; error?: string } | null>(null);

  useEffect(() => {
    setLoggedIn(document.cookie.includes("bl_auth="));
  }, []);

  async function handleClaim() {
    if (!loggedIn) {
      router.push(`/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
      return;
    }
    setShowForm(true);
  }

  async function submitClaim() {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/claims/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessId, message }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult({ success: true });
      } else {
        setResult({ error: data.error || "Failed to submit claim" });
      }
    } catch {
      setResult({ error: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  }

  if (result?.success) {
    return (
      <div className="text-sm text-green-700 bg-green-50 p-3 rounded-lg">
        ✓ Claim submitted! We&apos;ll review it and get back to you.
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="space-y-3">
        {result?.error && (
          <div className="text-sm text-red-700 bg-red-50 p-3 rounded-lg">{result.error}</div>
        )}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us how you're connected to this business (optional)"
          rows={3}
          className="w-full px-3 py-2 text-sm rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-brand/30"
        />
        <div className="flex gap-2">
          <Button onClick={submitClaim} disabled={loading}>
            {loading ? "Submitting…" : "Submit Claim"}
          </Button>
          <Button variant="outline" onClick={() => setShowForm(false)}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Button variant="outline" onClick={handleClaim}>
      Claim This Business
    </Button>
  );
}
