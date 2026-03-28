"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

export function AdminNav({ email }: { email: string }) {
  return (
    <div className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="font-semibold text-sm hover:text-brand transition-colors">
            Dashboard
          </Link>
          <Link href="/admin/listings" className="text-sm text-gray-400 hover:text-white transition-colors">
            Listings
          </Link>
          <Link href="/admin/articles" className="text-sm text-gray-400 hover:text-white transition-colors">
            Articles
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-400">{email}</span>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-xs text-gray-400 hover:text-red-400 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
