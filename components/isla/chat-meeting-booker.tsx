"use client";

import { useState } from "react";

const TIME_SLOTS = ["10:00 AM", "1:30 PM", "4:00 PM"];

function nextWeekdays(count: number): Date[] {
  const days: Date[] = [];
  const cursor = new Date();
  cursor.setDate(cursor.getDate() + 1);
  while (days.length < count) {
    const day = cursor.getDay();
    if (day !== 0 && day !== 6) days.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

export function ChatMeetingBooker({
  onConfirm,
}: {
  onConfirm: (dayLabel: string, time: string) => void;
}) {
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const days = nextWeekdays(5);

  return (
    <div className="cmb">
      <div className="cmb__label">Pick a day</div>
      <div className="cmb__days">
        {days.map((d) => {
          const active = selectedDay?.toDateString() === d.toDateString();
          return (
            <button
              key={d.toISOString()}
              className={`cmb__day ${active ? "cmb__day--active" : ""}`}
              onClick={() => setSelectedDay(d)}
            >
              <span className="cmb__day-wd">
                {d.toLocaleDateString(undefined, { weekday: "short" })}
              </span>
              <span className="cmb__day-num">{d.getDate()}</span>
            </button>
          );
        })}
      </div>

      {selectedDay && (
        <>
          <div className="cmb__label">Pick a time</div>
          <div className="cmb__times">
            {TIME_SLOTS.map((t) => (
              <button
                key={t}
                className="cmb__time"
                onClick={() =>
                  onConfirm(
                    selectedDay.toLocaleDateString(undefined, {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                    }),
                    t
                  )
                }
              >
                {t}
              </button>
            ))}
          </div>
        </>
      )}

      <style jsx>{`
        .cmb {
          background: white;
          border: 1px solid #ececf0;
          border-radius: 14px;
          padding: 14px;
          width: 100%;
        }
        .cmb__label {
          font-size: 12px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 8px;
        }
        .cmb__days {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 6px;
          margin-bottom: 12px;
        }
        .cmb__day {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          padding: 8px 0;
          border: 1px solid #e2e2e8;
          border-radius: 10px;
          background: white;
          cursor: pointer;
          transition: all 0.15s;
        }
        .cmb__day:hover {
          border-color: #544cd1;
        }
        .cmb__day--active {
          background: #544cd1;
          border-color: #544cd1;
          color: white;
        }
        .cmb__day-wd {
          font-size: 10px;
          opacity: 0.7;
        }
        .cmb__day-num {
          font-size: 14px;
          font-weight: 600;
        }
        .cmb__times {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .cmb__time {
          padding: 9px;
          border: 1px solid #e2e2e8;
          border-radius: 10px;
          background: white;
          font-size: 13px;
          color: #1a1a1a;
          cursor: pointer;
          transition: all 0.15s;
        }
        .cmb__time:hover {
          background: #544cd1;
          border-color: #544cd1;
          color: white;
        }
      `}</style>
    </div>
  );
}
