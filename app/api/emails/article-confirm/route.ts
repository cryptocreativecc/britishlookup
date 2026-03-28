import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/resend";
import ArticleConfirm from "@/emails/ArticleConfirm";

export async function POST(req: Request) {
  try {
    const { to, authorName, title } = await req.json();
    if (!to || !authorName || !title) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    await sendEmail({
      to,
      subject: `Article received: ${title}`,
      react: ArticleConfirm({ authorName, title }),
    });
    return NextResponse.json({ sent: true });
  } catch (err) {
    console.error("Email error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
