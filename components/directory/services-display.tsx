"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Service {
  title: string;
  description: string;
  url: string;
}

function ExternalLinkIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

export function ServicesDisplay({ services }: { services: Service[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

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
            <span className="text-text-muted text-lg font-light leading-none">{openIdx === i ? "−" : "+"}</span>
          </button>
          {openIdx === i && (
            <div className="px-4 pb-4">
              <p className="text-text whitespace-pre-line">{s.description}</p>
              {s.url && (
                <a href={s.url} target="_blank" className="inline-block mt-3">
                  <Button className="inline-flex items-center gap-2">
                    Learn more
                    <ExternalLinkIcon className="w-4 h-4" />
                  </Button>
                </a>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
