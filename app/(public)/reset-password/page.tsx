"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { resetPasswordAction } from "@/lib/actions/auth";

export default function ResetPasswordPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    await resetPasswordAction(formData);
    setSent(true);
    setLoading(false);
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <h1 className="text-2xl font-bold text-text mb-2">Reset Password</h1>

          {sent ? (
            <div>
              <p className="text-text-muted mb-4">
                If an account exists with that email, we&apos;ve sent a reset link.
              </p>
              <Link href="/login" className="text-brand hover:underline text-sm">Back to Sign In</Link>
            </div>
          ) : (
            <>
              <p className="text-sm text-text-muted mb-4">
                Enter your email and we&apos;ll send you a link to reset your password.
              </p>
              <form action={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">Email</label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full h-11 px-4 rounded-[var(--radius-btn)] border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full" disabled={loading}>
                  {loading ? "Sending…" : "Send Reset Link"}
                </Button>
              </form>
              <div className="mt-4 text-center">
                <Link href="/login" className="text-sm text-text-muted hover:text-brand">Back to Sign In</Link>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
