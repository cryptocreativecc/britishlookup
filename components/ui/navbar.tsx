"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/directory", label: "Directory" },
  { href: "/guides", label: "Guides" },
  { href: "/submit", label: "Submit Business" },
  { href: "/write-for-us", label: "Write For Us" },
];

export function NavBar() {
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check for login hint cookie (non-httpOnly)
    setLoggedIn(document.cookie.includes("bl_logged_in="));
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/British-Lookup-Logo-Original.svg"
              alt="British Lookup"
              className="w-[278px] h-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-text-muted hover:text-brand transition-colors rounded-[var(--radius-btn)]"
              >
                {link.label}
              </Link>
            ))}
            <div className="ml-2 pl-2 border-l border-border flex items-center gap-1">
              {loggedIn ? (
                <Link
                  href="/dashboard"
                  className="px-3 py-2 text-sm font-medium bg-brand text-white rounded-[var(--radius-btn)] hover:bg-brand-dark transition-colors"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-3 py-2 text-sm font-medium text-text-muted hover:text-brand transition-colors rounded-[var(--radius-btn)]"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="px-3 py-2 text-sm font-medium bg-brand text-white rounded-[var(--radius-btn)] hover:bg-brand-dark transition-colors"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-text-muted hover:text-brand transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <nav
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            open ? "max-h-96 pb-4" : "max-h-0"
          )}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block px-3 py-2.5 text-sm font-medium text-text-muted hover:text-brand hover:bg-brand-light rounded-[var(--radius-btn)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 pt-2 border-t border-border">
            {loggedIn ? (
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="block px-3 py-2.5 text-sm font-medium text-brand"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2.5 text-sm font-medium text-text-muted hover:text-brand"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2.5 text-sm font-medium text-brand"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
