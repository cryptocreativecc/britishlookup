import { createAdminPb } from "@/lib/pb";
import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.SITE_URL || "https://britishlookup.co.uk";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  if (!token) {
    return NextResponse.redirect(`${BASE_URL}/login?error=invalid-token`);
  }

  try {
    const pb = await createAdminPb();
    const user = await pb.collection("users").getFirstListItem(
      `verification_token="${token}"`
    );

    await pb.collection("users").update(user.id, {
      verified: true,
      verification_token: "",
    });

    return NextResponse.redirect(`${BASE_URL}/login?verified=true`);
  } catch {
    return NextResponse.redirect(`${BASE_URL}/login?error=invalid-token`);
  }
}
