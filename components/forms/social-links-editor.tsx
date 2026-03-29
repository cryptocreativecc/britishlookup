"use client";

import { useState } from "react";

export interface SocialLinks {
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  tiktok: string;
}

export const emptySocialLinks: SocialLinks = {
  facebook: "", twitter: "", instagram: "", linkedin: "", youtube: "", tiktok: "",
};

const inputClass = "w-full h-11 px-4 rounded-[var(--radius-btn)] border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand";

const FIELDS: { key: keyof SocialLinks; label: string; placeholder: string }[] = [
  { key: "facebook", label: "Facebook", placeholder: "https://facebook.com/yourpage" },
  { key: "twitter", label: "X / Twitter", placeholder: "https://x.com/yourhandle" },
  { key: "instagram", label: "Instagram", placeholder: "https://instagram.com/yourhandle" },
  { key: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/company/yourco" },
  { key: "youtube", label: "YouTube", placeholder: "https://youtube.com/@yourchannel" },
  { key: "tiktok", label: "TikTok", placeholder: "https://tiktok.com/@yourhandle" },
];

interface Props {
  value: SocialLinks;
  onChange: (links: SocialLinks) => void;
}

export function SocialLinksEditor({ value, onChange }: Props) {
  const [collapsed, setCollapsed] = useState(
    !Object.values(value).some((v) => v)
  );

  const count = Object.values(value).filter((v) => v).length;

  return (
    <div className="border border-border rounded-[var(--radius-card)] p-4">
      <button
        type="button"
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-between w-full text-sm font-medium text-text"
      >
        <span>Social Links {count > 0 ? `(${count})` : ""}</span>
        <span className="text-text-muted">{collapsed ? "▸" : "▾"}</span>
      </button>

      {!collapsed && (
        <div className="mt-3 space-y-3">
          {FIELDS.map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="block text-xs font-medium text-text-muted mb-1">{label}</label>
              <input
                value={value[key]}
                onChange={(e) => onChange({ ...value, [key]: e.target.value })}
                placeholder={placeholder}
                className={inputClass}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
