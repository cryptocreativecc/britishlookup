import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Check Your Email — British Lookup" };

export default function ThankYouPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-md text-center">
        <CardContent className="pt-8 pb-8">
          <div className="text-4xl mb-4">📧</div>
          <h1 className="text-2xl font-bold text-text mb-2">Check Your Email</h1>
          <p className="text-text-muted mb-6">
            We&apos;ve sent a verification link to your email. Click the link to activate your account.
          </p>
          <Link href="/login" className="text-brand hover:underline text-sm font-medium">
            Back to Sign In
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
