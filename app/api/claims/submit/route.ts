import { createAdminPb, createPb } from "@/lib/pb";
import { sendEmail } from "@/lib/resend";
import { ClaimSubmitted } from "@/emails/claim-submitted";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createElement } from "react";

export async function POST(request: NextRequest) {
  const jar = await cookies();
  const token = jar.get("bl_auth")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const pb = createPb();
  pb.authStore.save(token, null);
  if (!pb.authStore.isValid) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const record = await pb.collection("users").authRefresh();
    const user = record.record;

    const { businessId, message } = await request.json();
    if (!businessId) return NextResponse.json({ error: "Business ID required" }, { status: 400 });

    const adminPb = await createAdminPb();

    // Check business exists and isn't already claimed
    const business = await adminPb.collection("businesses").getOne(businessId);
    if (business.claimed) {
      return NextResponse.json({ error: "This business has already been claimed" }, { status: 400 });
    }

    // Check no pending claim from this user
    try {
      await adminPb.collection("claims").getFirstListItem(
        `business="${businessId}" && user="${user.id}" && status="pending"`
      );
      return NextResponse.json({ error: "You already have a pending claim for this business" }, { status: 400 });
    } catch {
      // No existing claim — good
    }

    await adminPb.collection("claims").create({
      business: businessId,
      user: user.id,
      status: "pending",
      message: message || "",
    });

    // Notify admin
    const adminEmail = process.env.ADMIN_EMAIL || "admin@britishlookup.co.uk";
    try {
      await sendEmail({
        to: adminEmail,
        subject: `New Claim: ${business.name}`,
        react: createElement(ClaimSubmitted, {
          businessName: business.name,
          userName: user.name,
          userEmail: user.email,
          message: message || "",
        }),
      });
    } catch { /* non-blocking */ }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Claim submit error:", e);
    return NextResponse.json({ error: "Failed to submit claim" }, { status: 500 });
  }
}
