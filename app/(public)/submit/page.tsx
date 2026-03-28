import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submit Your Business — Get Listed on BritishLookup",
  description: "Add your business to BritishLookup for free. Get a verified listing with a dofollow backlink to your website.",
};

export default function SubmitPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-text">Submit Your Business</h1>
      <p className="mt-2 text-text-muted">
        Get a free, verified listing on BritishLookup with a dofollow backlink to your website.
        We aim to review submissions within 3–5 working days.
      </p>

      <Card className="mt-8">
        <CardContent className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Business Name *</label>
            <input type="text" className="w-full h-11 px-4 rounded-[var(--radius-btn)] border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand" placeholder="e.g. Thompson Roofing" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Category *</label>
              <select className="w-full h-11 px-4 rounded-[var(--radius-btn)] border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand">
                <option value="">Select a category</option>
                <option>Roofing</option>
                <option>Guttering</option>
                <option>Building</option>
                <option>Plumbing</option>
                <option>Electrical</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Region *</label>
              <select className="w-full h-11 px-4 rounded-[var(--radius-btn)] border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand">
                <option value="">Select a region</option>
                <option>North West</option>
                <option>North East</option>
                <option>Yorkshire</option>
                <option>Midlands</option>
                <option>South East</option>
                <option>South West</option>
                <option>London</option>
                <option>Scotland</option>
                <option>Wales</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Town / City *</label>
              <input type="text" className="w-full h-11 px-4 rounded-[var(--radius-btn)] border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand" placeholder="e.g. Manchester" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Postcode *</label>
              <input type="text" className="w-full h-11 px-4 rounded-[var(--radius-btn)] border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand" placeholder="e.g. M1 1AA" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Full Address</label>
            <input type="text" className="w-full h-11 px-4 rounded-[var(--radius-btn)] border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand" placeholder="123 Example Street" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Phone Number</label>
              <input type="tel" className="w-full h-11 px-4 rounded-[var(--radius-btn)] border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand" placeholder="0161 123 4567" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Email Address *</label>
              <input type="email" className="w-full h-11 px-4 rounded-[var(--radius-btn)] border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand" placeholder="info@example.com" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Website URL *</label>
            <input type="url" className="w-full h-11 px-4 rounded-[var(--radius-btn)] border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand" placeholder="https://example.com" />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Business Description *</label>
            <textarea rows={4} className="w-full px-4 py-3 rounded-[var(--radius-btn)] border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand resize-none" placeholder="Tell us about your business (max 1200 characters)" />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Tags</label>
            <input type="text" className="w-full h-11 px-4 rounded-[var(--radius-btn)] border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand" placeholder="roofing, flat roof, repairs (comma-separated)" />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Logo Upload</label>
            <input type="file" accept="image/jpeg,image/png" className="w-full text-sm text-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-[var(--radius-btn)] file:border-0 file:text-sm file:font-semibold file:bg-brand-light file:text-brand hover:file:bg-brand-light/80" />
            <p className="text-xs text-text-muted mt-1">JPG or PNG, max 2MB</p>
          </div>

          <Button size="lg" className="w-full">Submit Business</Button>

          <p className="text-xs text-text-muted text-center">
            By submitting, you agree that the information is accurate and you are authorised to list this business.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
