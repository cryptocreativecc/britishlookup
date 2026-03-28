import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const name = data.get("name") as string;

    if (!name) {
      return NextResponse.json({ error: "Business name is required" }, { status: 400 });
    }

    // TODO: Phase 2
    // 1. Validate all required fields with Zod
    // 2. Geocode postcode via postcodes.io
    // 3. Upload logo to Cloudflare R2
    // 4. Write to submissions_business collection in PocketBase
    // 5. Send confirmation email via Resend
    // 6. Send admin alert email

    return NextResponse.json({ success: true, message: "Submission received" });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
