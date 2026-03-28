"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function AdminListingDetailPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/admin/listings" className="text-sm text-brand hover:text-brand-dark">← Back to listings</Link>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text">Thompson Roofing</h1>
          <div className="mt-1 flex items-center gap-2">
            <Badge variant="brand">Roofing</Badge>
            <span className="text-sm text-text-muted">Manchester</span>
            <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-amber-100 text-amber-800">pending</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={() => alert("Approve action — will call PB API")}>Approve</Button>
          <Button size="sm" variant="outline" onClick={() => alert("Feature action — will call PB API")}>Feature</Button>
          <Button size="sm" variant="destructive" onClick={() => alert("Reject action — will call PB API")}>Reject</Button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent>
            <h3 className="font-semibold text-text mb-3">Business Details</h3>
            <dl className="space-y-2 text-sm">
              <Row label="Name" value="Thompson Roofing" />
              <Row label="Category" value="Roofing" />
              <Row label="Region" value="North West" />
              <Row label="Town" value="Manchester" />
              <Row label="Postcode" value="M1 1AA" />
              <Row label="Address" value="123 Example Street, Manchester" />
              <Row label="Phone" value="0161 123 4567" />
              <Row label="Email" value="info@thompsonroofing.co.uk" />
              <Row label="Website" value="https://thompsonroofing.co.uk" link />
              <Row label="Tags" value="roofing, flat roof, repairs, manchester" />
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="font-semibold text-text mb-3">Description</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              Professional roofing services across Greater Manchester. We specialise in flat roofs, pitched roofs, repairs and maintenance. With over 20 years of experience, we deliver quality workmanship with competitive pricing. All work comes with a written guarantee and we&apos;re fully insured.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 bg-surface rounded-[var(--radius-card)] p-4 text-sm text-text-muted">
        ⚡ Placeholder detail page. Approve/Reject/Feature actions will be wired to PocketBase API in production.
      </div>
    </div>
  );
}

function Row({ label, value, link }: { label: string; value: string; link?: boolean }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-text-muted">{label}</dt>
      <dd className="text-text font-medium text-right">
        {link ? (
          <a href={value} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">{value}</a>
        ) : value}
      </dd>
    </div>
  );
}
