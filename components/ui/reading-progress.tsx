"use client";

import { useState, useEffect } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    const header = document.querySelector("header");
    if (header) setNavHeight(header.offsetHeight);

    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!navHeight) return null;

  return (
    <div className="fixed left-0 w-full z-[49] h-[3px]" style={{ top: `${navHeight}px` }}>
      <div
        className="h-full bg-brand"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
