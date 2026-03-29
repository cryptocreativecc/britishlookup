"use client";

import { useState } from "react";

export interface FAQ {
  question: string;
  answer: string;
}

export function FAQDisplay({ faqs }: { faqs: FAQ[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => (
        <div key={i} className="border border-border rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-surface/60 transition-colors"
          >
            <span className="font-medium text-text">{faq.question}</span>
            <span className="text-text-muted text-lg font-light leading-none">{openIdx === i ? "−" : "+"}</span>
          </button>
          {openIdx === i && (
            <div className="px-4 pb-4">
              <p className="text-text whitespace-pre-line">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
