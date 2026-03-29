"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("bl_cookies_accepted")) {
      setShow(true);
    }
  }, []);

  function accept() {
    localStorage.setItem("bl_cookies_accepted", "true");
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-text-muted text-center sm:text-left">
          We use cookies for authentication and to improve your experience.{" "}
          <Link href="/privacy" className="text-brand hover:underline">Privacy Policy</Link>
        </p>
        <Button size="sm" onClick={accept} className="shrink-0">
          Accept
        </Button>
      </div>
    </div>
  );
}
