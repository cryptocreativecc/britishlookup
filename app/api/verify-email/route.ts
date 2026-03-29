import { createAdminPb } from "@/lib/pb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  if (!token) {
    return NextResponse.redirect(new URL("/login?error=invalid-token", request.url));
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

    return NextResponse.redirect(new URL("/login?verified=true", request.url));
  } catch {
    return NextResponse.redirect(new URL("/login?error=invalid-token", request.url));
  }
}
