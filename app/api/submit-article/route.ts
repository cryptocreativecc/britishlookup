import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const title = data.get("title") as string;

    if (!title) {
      return NextResponse.json({ error: "Article title is required" }, { status: 400 });
    }

    // TODO: Phase 3
    // 1. Validate fields with Zod
    // 2. Upload cover image to R2
    // 3. Write to submissions_article collection in PocketBase
    // 4. Send confirmation email via Resend
    // 5. Send admin alert email

    return NextResponse.json({ success: true, message: "Article submission received" });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
