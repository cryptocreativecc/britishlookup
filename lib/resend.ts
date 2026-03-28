import { Resend } from "resend";

let resendClient: Resend | null = null;

function getResend(): Resend {
  if (!resendClient) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error("RESEND_API_KEY is not set");
    resendClient = new Resend(key);
  }
  return resendClient;
}

const FROM = "BritishLookup <noreply@britishlookup.co.uk>";

export async function sendEmail({
  to,
  subject,
  react,
}: {
  to: string;
  subject: string;
  react: React.ReactElement;
}) {
  const resend = getResend();
  return resend.emails.send({ from: FROM, to, subject, react });
}
