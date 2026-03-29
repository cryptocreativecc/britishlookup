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
    if (record.record.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const adminPb = await createAdminPb();
    const form = await request.formData();

    const body = form.get("body") as string || "";
    const wordCount = body.replace(/<[^>]*>/g, "").split(/\s+/).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));

    const updateData: Record<string, unknown> = {
      title: form.get("title"),
      body,
      excerpt: body.replace(/<[^>]*>/g, "").slice(0, 300).trim(),
      read_time: readTime,
      author_name: form.get("author_name") || "",
      author_bio: form.get("author_bio") || "",
      author_company: form.get("author_company") || "",
      seo_title: form.get("seo_title") || "",
      seo_description: form.get("seo_description") || "",
    };

    const website = form.get("author_website") as string;
    if (website) updateData.author_website = website;

    const cat = form.get("category") as string;
    if (cat) updateData.category = cat;

    const cover = form.get("cover_image") as File;
    if (cover && cover.size > 0) updateData.cover_image = cover;

    await adminPb.collection("articles").update(id, updateData);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Admin article update error:", e);
    return NextResponse.json({ error: "Failed to update article" }, { status: 500 });
  }
}
