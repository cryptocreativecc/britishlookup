import { Card, CardContent } from "@/components/ui/card";
import { SubmitBusinessForm } from "@/components/forms/submit-business-form";
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
        <CardContent>
          <SubmitBusinessForm />
        </CardContent>
      </Card>
    </div>
  );
}
