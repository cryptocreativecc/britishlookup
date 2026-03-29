"use client";

import { useState, useEffect, useRef } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={ref} className="sticky top-[57px] z-50 h-[3px] bg-transparent -mb-[3px]">
      <div
        className="h-full bg-brand"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
