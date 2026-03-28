"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function AdminArticleDetailPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/admin/articles" className="text-sm text-brand hover:text-brand-dark">← Back to articles</Link>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text">How to Choose a Reliable Roofer in 2026</h1>
          <div className="mt-1 flex items-center gap-2">
            <Badge variant="brand">Roofing</Badge>
            <span className="text-sm text-text-muted">by BritishLookup Editorial</span>
            <span className="text-sm text-text-muted">· 5 min read</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={() => alert("Approve & Publish — will call PB API")}>Publish</Button>
          <Button size="sm" variant="destructive" onClick={() => alert("Reject — will call PB API")}>Reject</Button>
        </div>
      </div>

      <Card className="mt-6">
        <CardContent>
          <h3 className="font-semibold text-text mb-3">Author Details</h3>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-text-muted">Name</dt>
              <dd className="text-text font-medium">BritishLookup Editorial</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-text-muted">Website</dt>
              <dd><a href="https://britishlookup.co.uk" className="text-brand hover:underline">britishlookup.co.uk</a></dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-text-muted">Bio</dt>
              <dd className="text-text text-right max-w-xs">The BritishLookup editorial team writes guides for UK homeowners.</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardContent>
          <h3 className="font-semibold text-text mb-3">Article Preview</h3>
          <div className="prose max-w-none text-sm">
            <p>When it comes to roofing work, choosing the right contractor can mean the difference between a job that lasts decades and one that causes problems within months.</p>
            <h3>Check credentials and insurance</h3>
            <p>Any reputable roofer should be able to provide proof of public liability insurance and membership of a recognised trade body such as the NFRC.</p>
            <h3>Get multiple quotes</h3>
            <p>Always get at least three written quotes for comparison. Be wary of any quote that seems significantly cheaper than the others.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
