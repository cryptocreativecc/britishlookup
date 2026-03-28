import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Write For Us — Contribute to BritishLookup",
  description: "Write a guest article for BritishLookup and get a dofollow backlink to your website. We accept expert articles on trades, building, and home improvement.",
};

export default function WriteForUsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-text">Write For Us</h1>
      <p className="mt-2 text-text-muted">
        Contribute an expert article and get a dofollow backlink to your website in your author bio.
      </p>

      {/* Guidelines */}
      <Card className="mt-6">
        <CardContent>
          <h2 className="font-semibold text-text mb-3">Submission Guidelines</h2>
          <ul className="space-y-2 text-sm text-text-muted">
            <li>✅ Articles must be original and not published elsewhere</li>
            <li>✅ Minimum 800 words, well-structured with headings</li>
            <li>✅ Topics: roofing, guttering, building, trades, home improvement, business advice</li>
            <li>✅ One dofollow link in your author bio (additional links nofollow)</li>
            <li>✅ Include a short author bio (max 200 characters)</li>
            <li>❌ No AI-generated content without significant human editing</li>
            <li>❌ No purely promotional content — provide genuine value</li>
          </ul>
        </CardContent>
      </Card>

      {/* Form */}
      <Card className="mt-6">
        <CardContent className="space-y-5">
          <h2 className="font-semibold text-text">Submit Your Article</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Full Name *</label>
              <input type="text" className="w-full h-11 px-4 rounded-[var(--radius-btn)] border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Email *</label>
              <input type="email" className="w-full h-11 px-4 rounded-[var(--radius-btn)] border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Business / Publication</label>
              <input type="text" className="w-full h-11 px-4 rounded-[var(--radius-btn)] border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Website URL *</label>
              <input type="url" className="w-full h-11 px-4 rounded-[var(--radius-btn)] border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand" placeholder="https://" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Article Title *</label>
            <input type="text" className="w-full h-11 px-4 rounded-[var(--radius-btn)] border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand" />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Category *</label>
            <select className="w-full h-11 px-4 rounded-[var(--radius-btn)] border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand">
              <option value="">Select a category</option>
              <option>Roofing</option>
              <option>Guttering</option>
              <option>Building</option>
              <option>Business</option>
              <option>Trades Tips</option>
              <option>Home Improvement</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Article Content *</label>
            <textarea rows={8} className="w-full px-4 py-3 rounded-[var(--radius-btn)] border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand resize-none" placeholder="Paste your article content or a link to your Google Doc" />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Author Bio *</label>
            <textarea rows={2} className="w-full px-4 py-3 rounded-[var(--radius-btn)] border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand resize-none" placeholder="Short bio displayed at the end of your article (max 200 chars)" />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1.5">Cover Image</label>
            <input type="file" accept="image/jpeg,image/png" className="w-full text-sm text-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-[var(--radius-btn)] file:border-0 file:text-sm file:font-semibold file:bg-brand-light file:text-brand hover:file:bg-brand-light/80" />
            <p className="text-xs text-text-muted mt-1">JPG or PNG, max 4MB</p>
          </div>

          <Button size="lg" className="w-full">Submit Article</Button>
        </CardContent>
      </Card>
    </div>
  );
}
