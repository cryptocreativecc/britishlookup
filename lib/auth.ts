import { cookies } from "next/headers";
import { createPb } from "./pb";
import { redirect } from "next/navigation";

const COOKIE_NAME = "bl_auth";
const MAX_AGE = 7 * 24 * 60 * 60; // 7 days

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  verified: boolean;
}

export interface AuthResult {
  token: string;
  user: AuthUser;
}

export async function setAuthCookie(token: string) {
  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
  // Non-httpOnly hint for client-side UI (navbar dashboard link)
  jar.set("bl_logged_in", "1", {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function clearAuthCookie() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
  jar.delete("bl_logged_in");
}

export async function getAuth(): Promise<AuthResult | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const pb = createPb();
  pb.authStore.save(token, null);

  if (!pb.authStore.isValid) return null;

  try {
    const record = await pb.collection("users").authRefresh();
    const user = record.record;
    return {
      token: record.token,
      user: {
        id: user.id,
        name: user.name || "",
        email: user.email || "",
        role: user.role || "user",
        avatar: user.avatar || "",
        verified: user.verified || false,
      },
    };
  } catch {
    // Token expired or invalid
    const delJar = await cookies();
    delJar.delete(COOKIE_NAME);
    delJar.delete("bl_logged_in");
    return null;
  }
}

export async function requireAuth(): Promise<AuthResult> {
  const auth = await getAuth();
  if (!auth) redirect("/login");
  return auth;
}

export async function requireAdmin(): Promise<AuthResult> {
  const auth = await requireAuth();
  if (auth.user.role !== "admin") redirect("/");
  return auth;
}
