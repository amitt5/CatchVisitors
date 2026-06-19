"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/dashboard/section-header";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Video } from "lucide-react";

const MEETINGS = [
  { time: "Today, 2:00 PM", title: "Demo call — Acme Logistics", type: "Booked by Isla" },
  { time: "Today, 4:30 PM", title: "Onboarding — Northwind Clinics", type: "Customer call" },
  { time: "Tomorrow, 10:00 AM", title: "Demo call — Vantage Realty", type: "Booked by Isla" },
  { time: "Tomorrow, 1:00 PM", title: "Weekly team sync", type: "Internal" },
  { time: "Thu, 11:00 AM", title: "Demo call — Borealis Health", type: "Booked by Isla" },
];

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div>
      <SectionHeader group="Me" title="Calendar" description="Meetings booked by you and your AI agents." />
      <div className="p-6 grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6">
        <div className="bg-card border border-border rounded-xl p-2 w-fit">
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </div>
        <div className="bg-card border border-border rounded-xl divide-y divide-border">
          {MEETINGS.map((m, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-4">
              <div className="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                <Video className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{m.title}</p>
                <p className="text-xs text-muted-foreground">{m.time}</p>
              </div>
              <Badge variant={m.type === "Booked by Isla" ? "default" : "secondary"}>{m.type}</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
