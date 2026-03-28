import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes with a simple session check
  // TODO: Replace with NextAuth.js session validation
  if (pathname.startsWith("/admin")) {
    const adminToken = request.cookies.get("admin_session")?.value;

    if (!adminToken) {
      // For now, allow access (placeholder until auth is set up)
      // In production, redirect to login:
      // return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
