import { Card, CardContent } from "@/components/ui/card";
import { SubmitArticleForm } from "@/components/forms/submit-article-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Write For Us — Contribute to BritishLookup",
  description: "Write a guest article for BritishLookup and get a dofollow backlink to your website.",
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
        <CardContent>
          <h2 className="font-semibold text-text mb-4">Submit Your Article</h2>
          <SubmitArticleForm />
        </CardContent>
      </Card>
    </div>
  );
}
