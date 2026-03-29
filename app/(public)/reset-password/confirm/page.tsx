"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { confirmResetPasswordAction } from "@/lib/actions/auth";
import { Suspense } from "react";

function ConfirmForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");
    formData.set("token", token);
    formData.set("email", email);
    const result = await confirmResetPasswordAction(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <h1 className="text-2xl font-bold text-text mb-4">Set New Password</h1>

          {error && (
            <div className="mb-4 rounded-lg bg-red-50 text-red-700 p-3 text-sm">{error}</div>
          )}

          <form action={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">New Password</label>
              <input
                name="password"
                type="password"
                required
                minLength={8}
                className="w-full h-11 px-4 rounded-[var(--radius-btn)] border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Confirm Password</label>
              <input
                name="passwordConfirm"
                type="password"
                required
                minLength={8}
                className="w-full h-11 px-4 rounded-[var(--radius-btn)] border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
              />
            </div>
            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Resetting…" : "Reset Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ConfirmResetPage() {
  return (
    <Suspense>
      <ConfirmForm />
    </Suspense>
  );
}
