import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/resend";
import SubmissionConfirm from "@/emails/SubmissionConfirm";

export async function POST(req: Request) {
  try {
    const { to, businessName } = await req.json();
    if (!to || !businessName) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    await sendEmail({
      to,
      subject: `Thanks for submitting ${businessName} to BritishLookup`,
      react: SubmissionConfirm({ businessName }),
    });
    return NextResponse.json({ sent: true });
  } catch (err) {
    console.error("Email error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
