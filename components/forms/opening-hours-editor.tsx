"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;

export interface TimeSlot {
  open: string;
  close: string;
}

export interface DaySchedule {
  closed: boolean;
  is24: boolean;
  slots: TimeSlot[];
}

export type OpeningHours = Record<string, DaySchedule>;

const inputClass = "h-9 px-2 rounded-[var(--radius-btn)] border border-border bg-white text-text text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand";

export function defaultOpeningHours(): OpeningHours {
  const hours: OpeningHours = {};
  for (const day of DAYS) {
    hours[day] = { closed: false, is24: false, slots: [{ open: "09:00", close: "17:00" }] };
  }
  return hours;
}

interface Props {
  value: OpeningHours;
  onChange: (hours: OpeningHours) => void;
}

export function OpeningHoursEditor({ value, onChange }: Props) {
  const [collapsed, setCollapsed] = useState(true);

  const update = (day: string, schedule: DaySchedule) => {
    onChange({ ...value, [day]: schedule });
  };

  const addSlot = (day: string) => {
    const d = value[day];
    update(day, { ...d, slots: [...d.slots, { open: "09:00", close: "17:00" }] });
  };

  const removeSlot = (day: string, idx: number) => {
    const d = value[day];
    update(day, { ...d, slots: d.slots.filter((_, i) => i !== idx) });
  };

  const updateSlot = (day: string, idx: number, field: "open" | "close", val: string) => {
    const d = value[day];
    const slots = [...d.slots];
    slots[idx] = { ...slots[idx], [field]: val };
    update(day, { ...d, slots });
  };

  return (
    <div className="border border-border rounded-[var(--radius-card)] p-4">
      <button
        type="button"
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-between w-full text-sm font-medium text-text"
      >
        <span>Opening Hours</span>
        <span className="text-text-muted">{collapsed ? "▸" : "▾"}</span>
      </button>

      {!collapsed && (
        <div className="mt-3 space-y-3">
          {DAYS.map((day) => {
            const d = value[day] || { closed: false, is24: false, slots: [{ open: "09:00", close: "17:00" }] };
            return (
              <div key={day} className="border border-border rounded-lg p-3 bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-text">{day}</span>
                  <div className="flex items-center gap-3 text-xs">
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={d.closed}
                        onChange={(e) => update(day, { ...d, closed: e.target.checked, is24: false })}
                        className="accent-brand"
                      />
                      Closed
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={d.is24}
                        disabled={d.closed}
                        onChange={(e) => update(day, { ...d, is24: e.target.checked })}
                        className="accent-brand"
                      />
                      24 hours
                    </label>
                  </div>
                </div>

                {!d.closed && !d.is24 && (
                  <div className="space-y-2">
                    {d.slots.map((slot, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input type="time" value={slot.open} onChange={(e) => updateSlot(day, idx, "open", e.target.value)} className={inputClass} />
                        <span className="text-xs text-text-muted">to</span>
                        <input type="time" value={slot.close} onChange={(e) => updateSlot(day, idx, "close", e.target.value)} className={inputClass} />
                        {d.slots.length > 1 && (
                          <button type="button" onClick={() => removeSlot(day, idx)} className="text-xs text-red-500">✕</button>
                        )}
                      </div>
                    ))}
                    <button type="button" onClick={() => addSlot(day)} className="text-xs text-brand hover:text-brand-dark">+ Add time slot</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
