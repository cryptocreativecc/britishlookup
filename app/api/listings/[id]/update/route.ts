import { createAdminPb, createPb } from "@/lib/pb";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const jar = await cookies();
  const token = jar.get("bl_auth")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const pb = createPb();
  pb.authStore.save(token, null);
  if (!pb.authStore.isValid) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const record = await pb.collection("users").authRefresh();
    const adminPb = await createAdminPb();
    const listing = await adminPb.collection("businesses").getOne(id);

    // Only owner or admin
    if (listing.owner !== record.record.id && record.record.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const form = await request.formData();

    const updateData: Record<string, unknown> = {
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone") || "",
      website: form.get("website") || "",
      anchor_text: form.get("anchor_text") || "",
      town: form.get("town"),
      postcode: form.get("postcode"),
      address: form.get("address") || "",
      description: form.get("description"),
      services: form.get("services") || "[]",
      social_links: form.get("social_links") || "{}",
      opening_hours: form.get("opening_hours") || "{}",
      amenities: form.get("amenities") || "[]",
    };

    const cat = form.get("category") as string;
    const reg = form.get("region") as string;
    if (cat) updateData.category = cat;
    if (reg) updateData.region = reg;

    const logo = form.get("logo") as File;
    if (logo && logo.size > 0) updateData.logo = logo;
    const banner = form.get("banner") as File;
    if (banner && banner.size > 0) updateData.banner = banner;

    await adminPb.collection("businesses").update(id, updateData);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Listing update error:", e);
    return NextResponse.json({ error: "Failed to update listing" }, { status: 500 });
  }
}
