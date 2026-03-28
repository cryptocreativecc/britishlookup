import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return { title: "Business Listing — BritishLookup" };
}

export default function ListingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-[var(--radius-card)] bg-brand-light flex items-center justify-center text-brand font-bold text-2xl">
              T
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-text">Thompson Roofing</h1>
              <div className="mt-1 flex items-center gap-2">
                <Badge variant="brand">Roofing</Badge>
                <Badge variant="outline">✓ Verified</Badge>
                <span className="text-sm text-text-muted">Manchester</span>
              </div>
            </div>
          </div>

          <div className="mt-6 prose max-w-none">
            <p>Professional roofing services across Greater Manchester. We specialise in flat roofs, pitched roofs, repairs and maintenance. With over 20 years of experience, we deliver quality workmanship with competitive pricing.</p>
            <p>All work comes with a written guarantee and we&apos;re fully insured for your peace of mind.</p>
          </div>

          <div className="mt-6 bg-surface rounded-[var(--radius-card)] p-4 text-sm text-text-muted">
            <p>📍 This is a placeholder listing page. Real data will be loaded from PocketBase.</p>
          </div>
        </div>

        <div className="lg:w-80 shrink-0 space-y-4">
          <Card>
            <CardContent>
              <h3 className="font-semibold text-text mb-3">Contact Details</h3>
              <div className="space-y-2 text-sm text-text-muted">
                <p>📍 123 Example Street, Manchester, M1 1AA</p>
                <p>📞 0161 123 4567</p>
                <p>🌐 example.com</p>
              </div>
              <a href="#" className="mt-4 block">
                <Button className="w-full">Visit Website</Button>
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h3 className="font-semibold text-text mb-2">Tags</h3>
              <div className="flex flex-wrap gap-1.5">
                {["roofing", "flat roof", "repairs", "manchester"].map((tag) => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
