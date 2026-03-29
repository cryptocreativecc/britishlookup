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

  try {
    const listing = await pb.collection("businesses").getOne(id);
    // Only owner or admin can edit
    if (listing.owner !== auth.user.id && auth.user.role !== "admin") {
      notFound();
    }
    return <EditListingForm listing={JSON.parse(JSON.stringify(listing))} />;
  } catch {
    notFound();
  }
}
