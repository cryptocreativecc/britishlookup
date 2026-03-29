import { createAdminPb, createPb } from "@/lib/pb";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const jar = await cookies();
  const token = jar.get("bl_auth")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const pb = createPb();
  pb.authStore.save(token, null);
  if (!pb.authStore.isValid) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const record = await pb.collection("users").authRefresh();
    const userId = record.record.id;
    const form = await req.formData();

    const updateData: Record<string, unknown> = {
      name: form.get("name") || "",
    };

    const avatar = form.get("avatar") as File;
    if (avatar && avatar.size > 0) {
      updateData.avatar = avatar;
    }

    const adminPb = await createAdminPb();
    await adminPb.collection("users").update(userId, updateData);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Profile update error:", e);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
