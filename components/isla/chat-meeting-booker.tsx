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
  onConfirm: (dayLabel: string, time: string, email: string) => void;
}) {
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const days = nextWeekdays(5);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const dayLabel = selectedDay
    ? selectedDay.toLocaleDateString(undefined, {
        weekday: "long",
        month: "short",
        day: "numeric",
      })
    : "";

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
                className={`cmb__time ${selectedSlot === t ? "cmb__time--active" : ""}`}
                onClick={() => setSelectedSlot(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </>
      )}

      {selectedDay && selectedSlot && (
        <>
          <div className="cmb__label">Your email</div>
          <form
            className="cmb__email-row"
            onSubmit={(e) => {
              e.preventDefault();
              if (emailValid) onConfirm(dayLabel, selectedSlot, email.trim());
            }}
          >
            <input
              type="email"
              className="cmb__email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="cmb__book" disabled={!emailValid}>
              Book it
            </button>
          </form>
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
        .cmb__time--active {
          background: #544cd1;
          border-color: #544cd1;
          color: white;
        }
        .cmb__email-row {
          display: flex;
          gap: 6px;
        }
        .cmb__email {
          flex: 1;
          min-width: 0;
          padding: 9px 12px;
          border: 1px solid #e2e2e8;
          border-radius: 10px;
          font-size: 13px;
          color: #1a1a1a;
          outline: none;
        }
        .cmb__email:focus {
          border-color: #544cd1;
        }
        .cmb__book {
          padding: 9px 16px;
          border: none;
          border-radius: 10px;
          background: #544cd1;
          color: white;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
        }
        .cmb__book:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
