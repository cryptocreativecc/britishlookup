"use server";

import { createPb, createAdminPb } from "@/lib/pb";
import { setAuthCookie, clearAuthCookie } from "@/lib/auth";
import { redirect } from "next/navigation";
import { rateLimit } from "@/lib/rate-limit";
import { sendEmail } from "@/lib/resend";
import { VerifyEmail } from "@/emails/verify-email";
import { ResetPassword } from "@/emails/reset-password";
import { createElement } from "react";

interface ActionResult {
  error?: string;
}

export async function loginAction(formData: FormData): Promise<ActionResult> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const rl = rateLimit(`login:${email}`, 5, 60_000);
  if (!rl.success) return { error: "Too many attempts. Please wait a minute." };

  const pb = createPb();
  try {
    const result = await pb.collection("users").authWithPassword(email, password);

    // Check verified
    const adminPb = await createAdminPb();
    const user = await adminPb.collection("users").getOne(result.record.id);
    if (!user.verified) {
      pb.authStore.clear();
      return { error: "Please verify your email before signing in." };
    }

    await setAuthCookie(result.token);
  } catch (e) {
    console.error("Login failed:", email, e);
    return { error: "Invalid email or password." };
  }
  const callbackUrl = (formData.get("callbackUrl") as string) || "/dashboard";
  redirect(callbackUrl);
}

export async function registerAction(formData: FormData): Promise<ActionResult> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const passwordConfirm = formData.get("passwordConfirm") as string;
  const roleInput = formData.get("role") as string;
  const role = roleInput === "business_owner" ? "business_owner" : "user";

  const rl = rateLimit(`register:${email}`, 3, 3_600_000);
  if (!rl.success) return { error: "Too many registrations. Please try again later." };

  if (password.length < 8) return { error: "Password must be at least 8 characters." };
  if (password !== passwordConfirm) return { error: "Passwords do not match." };

  const pb = createPb();
  try {
    const verificationToken = crypto.randomUUID();
    await pb.collection("users").create({
      name,
      email,
      password,
      passwordConfirm,
      role,
      verification_token: verificationToken,
    });

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://britishlookup.co.uk";
    const verifyLink = `${siteUrl}/api/verify-email?token=${verificationToken}`;
    await sendEmail({
      to: email,
      subject: "Verify Your Email - British Lookup",
      react: createElement(VerifyEmail, { name, verifyLink }),
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Registration failed.";
    if (msg.includes("unique")) return { error: "An account with this email already exists." };
    return { error: msg };
  }
  redirect("/register/thank-you");
}

export async function resendVerificationAction(formData: FormData): Promise<ActionResult> {
  const email = formData.get("email") as string;
  if (!email) return {};

  const rl = rateLimit(`resend-verify:${email}`, 3, 300_000);
  if (!rl.success) return {};

  try {
    const pb = await createAdminPb();
    const users = await pb.collection("users").getList(1, 1, {
      filter: `email = "${email}" && verified = false`,
    });

    if (users.items.length > 0) {
      const user = users.items[0];
      const verificationToken = crypto.randomUUID();
      await pb.collection("users").update(user.id, { verification_token: verificationToken });

      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://britishlookup.co.uk";
      const verifyLink = `${siteUrl}/api/verify-email?token=${verificationToken}`;
      await sendEmail({
        to: email,
        subject: "Verify Your Email - British Lookup",
        react: createElement(VerifyEmail, { name: user.name, verifyLink }),
      });
    }
  } catch (e) {
    console.error("Resend verification failed:", e);
  }
  return {};
}

export async function resetPasswordAction(formData: FormData): Promise<ActionResult> {
  const email = formData.get("email") as string;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://britishlookup.co.uk";

  try {
    const pb = await createAdminPb();
    let user;
    try {
      user = await pb.collection("users").getFirstListItem(`email="${email}"`);
    } catch {
      return {}; // Don't reveal if email exists
    }

    const token = crypto.randomUUID();
    const expiry = new Date(Date.now() + 60 * 60 * 1000).toISOString();

    await pb.collection("users").update(user.id, {
      reset_token: token,
      reset_token_expiry: expiry,
    });

    const resetLink = `${siteUrl}/reset-password/confirm?token=${token}&email=${encodeURIComponent(email)}`;
    await sendEmail({
      to: email,
      subject: "Reset Your Password - British Lookup",
      react: createElement(ResetPassword, { name: user.name || "there", resetLink }),
    });
  } catch (e) {
    console.error("Password reset error:", e);
  }
  return {};
}

export async function confirmResetPasswordAction(formData: FormData): Promise<ActionResult> {
  const token = formData.get("token") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const passwordConfirm = formData.get("passwordConfirm") as string;

  if (password.length < 8) return { error: "Password must be at least 8 characters." };
  if (password !== passwordConfirm) return { error: "Passwords do not match." };

  try {
    const pb = await createAdminPb();
    const user = await pb.collection("users").getFirstListItem(
      `email="${email}" && reset_token="${token}"`
    );

    if (!user.reset_token_expiry || new Date(user.reset_token_expiry) < new Date()) {
      return { error: "This reset link has expired. Please request a new one." };
    }

    await pb.collection("users").update(user.id, {
      password,
      passwordConfirm,
      reset_token: "",
      reset_token_expiry: "",
    });
  } catch {
    return { error: "Invalid or expired reset link." };
  }
  redirect("/login?reset=true");
}

export async function logoutAction() {
  await clearAuthCookie();
  redirect("/login");
}
