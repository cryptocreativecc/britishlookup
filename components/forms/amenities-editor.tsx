"use client";

import { useState } from "react";

const PRESET_AMENITIES = [
  "WiFi", "Parking", "Wheelchair Accessible", "Card Payments", "Dog Friendly",
  "Air Conditioning", "Outdoor Seating", "Delivery", "Takeaway", "Booking Required",
  "Family Friendly", "Student Discount",
];

const inputClass = "w-full h-11 px-4 rounded-[var(--radius-btn)] border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand";

interface Props {
  value: string[];
  onChange: (amenities: string[]) => void;
}

export function AmenitiesEditor({ value, onChange }: Props) {
  const [collapsed, setCollapsed] = useState(value.length === 0);
  const [custom, setCustom] = useState("");

  const toggle = (amenity: string) => {
    if (value.includes(amenity)) {
      onChange(value.filter((a) => a !== amenity));
    } else {
      onChange([...value, amenity]);
    }
  };

  const addCustom = () => {
    const trimmed = custom.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
      setCustom("");
    }
  };

  const customAmenities = value.filter((a) => !PRESET_AMENITIES.includes(a));

  return (
    <div className="border border-border rounded-[var(--radius-card)] p-4">
      <button
        type="button"
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-between w-full text-sm font-medium text-text"
      >
        <span>Amenities ({value.length})</span>
        <span className="text-text-muted">{collapsed ? "▸" : "▾"}</span>
      </button>

      {!collapsed && (
        <div className="mt-3 space-y-3">
          <div className="flex flex-wrap gap-2">
            {PRESET_AMENITIES.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => toggle(a)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  value.includes(a)
                    ? "bg-brand text-white border-brand"
                    : "bg-white text-text-muted border-border hover:border-brand"
                }`}
              >
                {value.includes(a) ? "✓ " : ""}{a}
              </button>
            ))}
          </div>

          {customAmenities.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {customAmenities.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => toggle(a)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-brand text-white border border-brand"
                >
                  ✓ {a} ✕
                </button>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <input
              placeholder="Add custom amenity"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCustom())}
              className={inputClass}
            />
            <button type="button" onClick={addCustom} className="px-4 h-11 rounded-[var(--radius-btn)] bg-brand text-white text-sm font-medium hover:bg-brand-dark shrink-0">
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
