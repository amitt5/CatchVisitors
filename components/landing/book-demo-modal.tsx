"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, CalendarClock, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBookDemoOpen, setBookDemoOpen } from "@/lib/landing/book-demo-store";

const TIME_SLOTS = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

function tomorrow() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function BookDemoModal() {
  const open = useBookDemoOpen();
  const [step, setStep] = useState<"select" | "details" | "done">("select");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  const reset = () => {
    setStep("select");
    setDate(undefined);
    setTime("");
    setName("");
    setEmail("");
    setCompany("");
  };

  const handleOpenChange = (next: boolean) => {
    setBookDemoOpen(next);
    if (!next) {
      // Reset after the close animation so content doesn't flicker mid-close.
      setTimeout(reset, 200);
    }
  };

  const dateLabel = date
    ? date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden gap-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-[#02524b]/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#02524b] flex items-center justify-center">
              <CalendarClock className="w-4 h-4 text-white" />
            </div>
            <div>
              <DialogTitle className="text-[#02524b] text-base">
                {step === "done" ? "You're booked" : "Book a demo"}
              </DialogTitle>
              <DialogDescription className="text-xs text-[#02524b]/60">
                {step === "select" && "Pick a time that works for you."}
                {step === "details" && "Tell us where to send the invite."}
                {step === "done" && "A calendar invite is on its way."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="px-6 py-5">
          {step === "select" && (
            <div className="space-y-5">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => setDate(d)}
                disabled={[{ before: tomorrow() }, { dayOfWeek: [0, 6] }]}
                className="rounded-lg border border-[#02524b]/10 p-3"
              />

              <div>
                <p className="text-sm font-medium text-[#02524b] mb-2.5">
                  Available times{dateLabel ? ` · ${dateLabel}` : ""}
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      disabled={!date}
                      onClick={() => setTime(slot)}
                      className={cn(
                        "px-2 py-2 rounded-lg text-sm border transition-colors disabled:opacity-40 disabled:cursor-not-allowed",
                        time === slot
                          ? "border-[#02524b] bg-[#02524b] text-white font-medium"
                          : "border-[#02524b]/20 text-[#02524b] hover:border-[#02524b]"
                      )}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => setStep("details")}
                disabled={!date || !time}
                className="w-full bg-[#b5d627] hover:bg-[#a3c322] text-[#02524b] font-semibold rounded-full"
              >
                Continue
              </Button>
            </div>
          )}

          {step === "details" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-[#02524b] bg-[#f0f8f3] border border-[#02524b]/10 rounded-lg px-3 py-2.5">
                <CalendarClock className="w-4 h-4 shrink-0" />
                <span>
                  {dateLabel} at <span className="font-medium">{time}</span>
                </span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bd-name">Full name</Label>
                <Input
                  id="bd-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jordan Rivera"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bd-email">Work email</Label>
                <Input
                  id="bd-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jordan@company.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bd-company">Company</Label>
                <Input
                  id="bd-company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Acme Inc."
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Button
                  variant="outline"
                  onClick={() => setStep("select")}
                  className="rounded-full border-[#02524b]/20 text-[#02524b]"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => setStep("done")}
                  disabled={!name.trim() || !email.trim() || !company.trim()}
                  className="flex-1 bg-[#b5d627] hover:bg-[#a3c322] text-[#02524b] font-semibold rounded-full"
                >
                  Confirm booking
                </Button>
              </div>
            </div>
          )}

          {step === "done" && (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#f0f8f3] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7 text-[#02524b]" />
              </div>
              <div>
                <p className="text-lg font-medium text-[#02524b]">
                  Demo booked for {dateLabel}
                </p>
                <p className="text-sm text-[#02524b]/70 mt-1">
                  at {time}. We&apos;ve sent a calendar invite to{" "}
                  <span className="text-[#02524b] font-medium">{email}</span>.
                </p>
              </div>
              <Button
                onClick={() => handleOpenChange(false)}
                className="bg-[#02524b] hover:bg-[#023d38] text-white rounded-full px-8"
              >
                Done
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
