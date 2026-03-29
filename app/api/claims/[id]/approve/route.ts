import { createAdminPb, createPb } from "@/lib/pb";
import { sendEmail } from "@/lib/resend";
import { ClaimApproved } from "@/emails/claim-approved";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createElement } from "react";

export async function POST(
  _request: NextRequest,
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
    const claim = await adminPb.collection("claims").getOne(id, { expand: "business,user" });

    // Update claim status
    await adminPb.collection("claims").update(id, { status: "approved" });

    // Update business: set claimed + owner
    await adminPb.collection("businesses").update(claim.business, {
      claimed: true,
      owner: claim.user,
    });

    // Notify user
    const claimUser = claim.expand?.user;
    const business = claim.expand?.business;
    if (claimUser?.email && business) {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://britishlookup.co.uk";
      try {
        await sendEmail({
          to: claimUser.email,
          subject: `Claim Approved: ${business.name}`,
          react: createElement(ClaimApproved, {
            name: claimUser.name,
            businessName: business.name,
            dashboardLink: `${siteUrl}/dashboard/listings`,
          }),
        });
      } catch { /* non-blocking */ }
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Claim approve error:", e);
    return NextResponse.json({ error: "Failed to approve claim" }, { status: 500 });
  }
}
