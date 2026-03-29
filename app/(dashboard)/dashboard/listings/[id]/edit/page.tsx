export const dynamic = "force-dynamic";
import { requireAuth } from "@/lib/auth";
import { createAdminPb } from "@/lib/pb";
import { notFound } from "next/navigation";
import { EditListingForm } from "./edit-form";

export default async function EditListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const auth = await requireAuth();
  const pb = await createAdminPb();

  let categories: { id: string; name: string }[] = [];
  let regions: { id: string; name: string }[] = [];

  try {
    const [cats, regs] = await Promise.all([
      pb.collection("categories").getFullList({ sort: "name" }),
      pb.collection("regions").getFullList({ sort: "name" }),
    ]);
    categories = cats.map((c) => ({ id: c.id, name: c.name }));
    regions = regs.map((r) => ({ id: r.id, name: r.name }));
  } catch (e) {
    console.error("Failed to load categories/regions:", e);
  }

  try {
    const listing = await pb.collection("businesses").getOne(id);
    if (listing.owner !== auth.user.id && auth.user.role !== "admin") {
      notFound();
    }
    return (
      <EditListingForm
        listing={JSON.parse(JSON.stringify(listing))}
        categories={categories}
        regions={regions}
      />
    );
  } catch {
    notFound();
  }
}
