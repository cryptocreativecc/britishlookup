import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/resend";
import AdminAlert from "@/emails/AdminAlert";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@britishlookup.co.uk";

export async function POST(req: Request) {
  try {
    const { type, name, id } = await req.json();
    if (!type || !name || !id) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    await sendEmail({
      to: ADMIN_EMAIL,
      subject: `New ${type} submission: ${name}`,
      react: AdminAlert({ type, name, id }),
    });
    return NextResponse.json({ sent: true });
  } catch (err) {
    console.error("Admin alert email error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
