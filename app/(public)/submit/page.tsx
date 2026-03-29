import { Card, CardContent } from "@/components/ui/card";
import { SubmitBusinessForm } from "@/components/forms/submit-business-form";
import { createAdminPb } from "@/lib/pb";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Submit Your Business — Get Listed on BritishLookup",
  description: "Add your business to BritishLookup for free. Get a verified listing with a dofollow backlink to your website.",
};

export default async function SubmitPage() {
  let categories: { id: string; name: string }[] = [];
  let regions: { id: string; name: string }[] = [];

  try {
    const pb = await createAdminPb();
    const [cats, regs] = await Promise.all([
      pb.collection("categories").getFullList({ sort: "name" }),
      pb.collection("regions").getFullList({ sort: "name" }),
    ]);
    categories = cats.map((c) => ({ id: c.id, name: c.name }));
    regions = regs.map((r) => ({ id: r.id, name: r.name }));
  } catch (e) {
    console.error("Failed to load categories/regions:", e);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-text">Submit Your Business</h1>
      <p className="mt-2 text-text-muted">
        Get a free, verified listing on BritishLookup with a dofollow backlink to your website.
        We aim to review submissions within 3–5 working days.
      </p>

      <Card className="mt-8">
        <CardContent>
          <SubmitBusinessForm categories={categories} regions={regions} />
        </CardContent>
      </Card>
    </div>
  );
}
