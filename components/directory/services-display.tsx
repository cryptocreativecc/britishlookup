"use client";

import { useState } from "react";

interface Service {
  title: string;
  description: string;
  url: string;
}

export function ServicesDisplay({ services }: { services: Service[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {services.map((s, i) => (
        <div key={i} className="border border-border rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-surface/60 transition-colors"
          >
            <span className="font-medium text-text">{s.title}</span>
            <span className="text-text-muted text-sm">{openIdx === i ? "▲" : "▼"}</span>
          </button>
          {openIdx === i && (
            <div className="px-4 pb-4 text-sm text-text-muted">
              <p>{s.description}</p>
              {s.url && (
                <a href={s.url} target="_blank" className="inline-flex items-center gap-1 mt-2 text-brand hover:text-brand-dark font-medium text-xs">
                  Learn more →
                </a>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
