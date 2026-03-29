"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { registerAction } from "@/lib/actions/auth";

export default function RegisterPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");
    const result = await registerAction(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-text">Create Account</h1>
            <p className="text-sm text-text-muted mt-1">Join British Lookup</p>
          </div>

          {error && (
            <div className="mb-4 rounded-lg bg-red-50 text-red-700 p-3 text-sm">{error}</div>
          )}

          <form action={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Full Name</label>
              <input
                name="name"
                type="text"
                required
                className="w-full h-11 px-4 rounded-[var(--radius-btn)] border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Email</label>
              <input
                name="email"
                type="email"
                required
                className="w-full h-11 px-4 rounded-[var(--radius-btn)] border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">I am a…</label>
              <select
                name="role"
                className="w-full h-11 px-4 rounded-[var(--radius-btn)] border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
              >
                <option value="user">General User</option>
                <option value="business_owner">Business Owner</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Password</label>
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
              {loading ? "Creating account…" : "Create Account"}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-text-muted">
            Already have an account?{" "}
            <Link href="/login" className="text-brand hover:underline">Sign in</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
