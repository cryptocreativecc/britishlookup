import { Card, CardContent } from "@/components/ui/card";
import { SubmitBusinessForm } from "@/components/forms/submit-business-form";
import { createAdminPb } from "@/lib/pb";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Add Listing — Dashboard" };

export default async function NewListingPage() {
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
    <div>
      <h1 className="text-2xl font-bold text-text mb-6">Add a Listing</h1>
      <Card>
        <CardContent className="pt-6">
          <SubmitBusinessForm categories={categories} regions={regions} redirectTo="/dashboard/listings" />
        </CardContent>
      </Card>
    </div>
  );
}
