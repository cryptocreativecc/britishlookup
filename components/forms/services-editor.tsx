"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export interface ServiceItem {
  title: string;
  description: string;
  url: string;
}

const inputClass = "w-full h-11 px-4 rounded-[var(--radius-btn)] border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand";

interface Props {
  value: ServiceItem[];
  onChange: (services: ServiceItem[]) => void;
}

export function ServicesEditor({ value, onChange }: Props) {
  const [collapsed, setCollapsed] = useState(value.length === 0);

  const add = () => {
    onChange([...value, { title: "", description: "", url: "" }]);
    setCollapsed(false);
  };

  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));

  const update = (i: number, field: keyof ServiceItem, val: string) => {
    const next = [...value];
    next[i] = { ...next[i], [field]: val };
    onChange(next);
  };

  return (
    <div className="border border-border rounded-[var(--radius-card)] p-4">
      <button
        type="button"
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-between w-full text-sm font-medium text-text"
      >
        <span>Services ({value.length})</span>
        <span className="text-text-muted">{collapsed ? "▸" : "▾"}</span>
      </button>

      {!collapsed && (
        <div className="mt-3 space-y-4">
          {value.map((s, i) => (
            <div key={i} className="border border-border rounded-lg p-3 space-y-2 bg-gray-50">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-text-muted">Service {i + 1}</span>
                <button type="button" onClick={() => remove(i)} className="text-xs text-red-500 hover:text-red-700">Remove</button>
              </div>
              <input
                placeholder="Service title *"
                value={s.title}
                onChange={(e) => update(i, "title", e.target.value)}
                className={inputClass}
              />
              <textarea
                placeholder="Description *"
                value={s.description}
                onChange={(e) => update(i, "description", e.target.value)}
                rows={2}
                className="w-full px-4 py-2 rounded-[var(--radius-btn)] border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand resize-none text-sm"
              />
              <input
                placeholder="URL (optional)"
                value={s.url}
                onChange={(e) => update(i, "url", e.target.value)}
                className={inputClass}
              />
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={add}>
            + Add Service
          </Button>
        </div>
      )}
    </div>
  );
}
