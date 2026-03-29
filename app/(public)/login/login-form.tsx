"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { loginAction, resendVerificationAction } from "@/lib/actions/auth";

export function LoginForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const [resendSent, setResendSent] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const verified = searchParams.get("verified") === "true";
  const resetDone = searchParams.get("reset") === "true";
  const tokenError = searchParams.get("error") === "invalid-token";

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");
    setShowResend(false);
    const result = await loginAction(formData);
    if (result?.error) {
      setError(result.error);
      if (result.error.includes("verify your email")) setShowResend(true);
      setLoading(false);
    }
  }

  async function handleResend(formData: FormData) {
    setResendLoading(true);
    await resendVerificationAction(formData);
    setResendSent(true);
    setResendLoading(false);
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-text">Sign In</h1>
            <p className="text-sm text-text-muted mt-1">Welcome back to British Lookup</p>
          </div>

          {verified && (
            <div className="mb-4 rounded-lg bg-green-50 text-green-700 p-3 text-sm">
              Your email has been verified. You can now sign in.
            </div>
          )}
          {resetDone && (
            <div className="mb-4 rounded-lg bg-green-50 text-green-700 p-3 text-sm">
              Your password has been reset. Sign in with your new password.
            </div>
          )}
          {tokenError && (
            <div className="mb-4 rounded-lg bg-red-50 text-red-700 p-3 text-sm">
              Invalid or expired verification link.
            </div>
          )}
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 text-red-700 p-3 text-sm">
              {error}
            </div>
          )}

          <form action={handleSubmit} className="space-y-4">
            <input type="hidden" name="callbackUrl" value={callbackUrl} />
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
              <label className="block text-sm font-medium text-text mb-1.5">Password</label>
              <input
                name="password"
                type="password"
                required
                className="w-full h-11 px-4 rounded-[var(--radius-btn)] border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
              />
            </div>
            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Signing in…" : "Sign In"}
            </Button>
          </form>

          {showResend && (
            <div className="mt-4 rounded-lg border border-border bg-gray-50 p-4">
              {resendSent ? (
                <p className="text-sm text-text-muted">Verification email sent. Check your inbox.</p>
              ) : (
                <form action={handleResend} className="flex gap-2">
                  <input
                    name="email"
                    type="email"
                    placeholder="Your email"
                    required
                    className="flex-1 h-10 px-3 rounded-[var(--radius-btn)] border border-border text-sm"
                  />
                  <Button type="submit" variant="outline" disabled={resendLoading}>
                    {resendLoading ? "Sending…" : "Resend"}
                  </Button>
                </form>
              )}
            </div>
          )}

          <div className="mt-4 text-center text-sm text-text-muted">
            <Link href="/reset-password" className="hover:text-brand">Forgot password?</Link>
            {" · "}
            <Link href={`/register${callbackUrl !== "/dashboard" ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ""}`} className="hover:text-brand">Create account</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
