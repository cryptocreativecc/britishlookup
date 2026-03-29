import { createAdminPb, createPb } from "@/lib/pb";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const jar = await cookies();
  const token = jar.get("bl_auth")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const pb = createPb();
  pb.authStore.save(token, null);
  try {
    const r = await pb.collection("users").authRefresh();
    if (r.record.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }

  const adminPb = await createAdminPb();
  await adminPb.collection("businesses").delete(id);
  return NextResponse.json({ success: true });
}
