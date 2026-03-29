"use client";

import { logoutAction } from "@/lib/actions/auth";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="text-sm text-text-muted hover:text-red-600 transition-colors"
      >
        Sign Out
      </button>
    </form>
  );
}
