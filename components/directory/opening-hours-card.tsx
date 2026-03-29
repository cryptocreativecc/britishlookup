"use client";

import { Card, CardContent } from "@/components/ui/card";

interface TimeSlot {
  open: string;
  close: string;
}

interface DaySchedule {
  closed: boolean;
  is24: boolean;
  slots: TimeSlot[];
}

type OpeningHours = Record<string, DaySchedule>;

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function getCurrentDay() {
  return DAYS[((new Date().getDay() + 6) % 7)]; // JS Sunday=0, we want Monday=0
}

export function OpeningHoursCard({ hours }: { hours: OpeningHours }) {
  const today = getCurrentDay();

  return (
    <Card>
      <CardContent>
        <h3 className="font-semibold text-text mb-3">Opening Hours</h3>
        <div className="space-y-1.5 text-sm">
          {DAYS.map((day) => {
            const d = hours[day];
            const isToday = day === today;
            if (!d) return null;

            let timeStr: string;
            if (d.closed) {
              timeStr = "Closed";
            } else if (d.is24) {
              timeStr = "24 hours";
            } else {
              timeStr = d.slots?.map((s) => `${s.open} – ${s.close}`).join(", ") || "—";
            }

            return (
              <div
                key={day}
                className={`flex justify-between ${isToday ? "font-semibold text-brand" : "text-text-muted"}`}
              >
                <span>{day}</span>
                <span>{timeStr}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
