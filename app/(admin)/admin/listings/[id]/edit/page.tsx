export const dynamic = "force-dynamic";
import { createAdminPb } from "@/lib/pb";
import { redirect } from "next/navigation";
import { AdminEditForm } from "./admin-edit-form";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edit Listing — Admin" };

export default async function AdminEditListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pb = await createAdminPb();

  let listing;
  try {
    listing = await pb.collection("businesses").getOne(id);
  } catch {
    redirect("/admin/listings");
  }

  let categories: { id: string; name: string }[] = [];
  let regions: { id: string; name: string }[] = [];
  try {
    const cats = await pb.collection("categories").getFullList({ sort: "name" });
    categories = cats.map((c) => ({ id: c.id, name: c.name as string }));
    const regs = await pb.collection("regions").getFullList({ sort: "name" });
    regions = regs.map((r) => ({ id: r.id, name: r.name as string }));
  } catch {}

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link href="/admin/listings" className="text-sm text-brand hover:text-brand-dark">← Back to listings</Link>
      <h1 className="text-2xl font-bold text-text mt-4 mb-6">Edit: {listing.name}</h1>
      <AdminEditForm listing={listing} categories={categories} regions={regions} />
    </div>
  );
}
