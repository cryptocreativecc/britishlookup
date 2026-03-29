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
    const article = await adminPb.collection("articles").getOne(id);

    if (article.author !== record.record.id && record.record.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const form = await request.formData();
    const updateData: Record<string, unknown> = {
      title: form.get("title"),
      body: form.get("body"),
      author_bio: form.get("author_bio") || "",
      author_company: form.get("author_company") || "",
      author_website: form.get("author_website") || "",
    };

    const coverImage = form.get("cover_image") as File;
    if (coverImage && coverImage.size > 0) {
      updateData.cover_image = coverImage;
    }

    await adminPb.collection("articles").update(id, updateData);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Article update error:", e);
    return NextResponse.json({ error: "Failed to update article" }, { status: 500 });
  }
}
