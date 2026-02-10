"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

export function ROISection() {
  const [visitors, setVisitors] = useState(500);
  const [dealValue, setDealValue] = useState(3000);
  const [bookingRate, setBookingRate] = useState(2);
  const [closeRate, setCloseRate] = useState(30);

  const currentRev = visitors * (bookingRate / 100) * (closeRate / 100) * dealValue;
  const newRev = currentRev * 3;
  const addedRev = newRev - currentRev;

  return (
    <section id="calculator" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4 block">
            ROI Calculator
          </span>
          <h2
            className="text-4xl md:text-5xl font-normal leading-tight tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}
          >
            What's a missed visitor worth?
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
            Plug in your numbers. See what CatchVisitors could mean for your bottom line.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md">
          <div className="p-10 grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-1.5">Monthly website visitors</label>
              <Input
                type="number"
                value={visitors}
                onChange={(e) => setVisitors(+e.target.value || 0)}
                className="h-11 bg-gray-50 border-gray-200 focus:border-gray-900 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Average deal value ($)</label>
              <Input
                type="number"
                value={dealValue}
                onChange={(e) => setDealValue(+e.target.value || 0)}
                className="h-11 bg-gray-50 border-gray-200 focus:border-gray-900 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Current booking rate (%)</label>
              <Input
                type="number"
                value={bookingRate}
                onChange={(e) => setBookingRate(+e.target.value || 0)}
                max={100}
                className="h-11 bg-gray-50 border-gray-200 focus:border-gray-900 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Close rate on consultations (%)</label>
              <Input
                type="number"
                value={closeRate}
                onChange={(e) => setCloseRate(+e.target.value || 0)}
                max={100}
                className="h-11 bg-gray-50 border-gray-200 focus:border-gray-900 rounded-xl"
              />
            </div>
          </div>

          <div className="bg-gray-900 p-9 grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div
                className="text-3xl md:text-4xl text-white mb-1"
                style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}
              >
                ${Math.round(currentRev).toLocaleString()}
              </div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">
                Current Monthly Revenue
              </div>
            </div>
            <div className="text-center">
              <div
                className="text-3xl md:text-4xl text-white mb-1"
                style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}
              >
                ${Math.round(newRev).toLocaleString()}
              </div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">
                With CatchVisitors (3×)
              </div>
            </div>
            <div className="text-center">
              <div
                className="text-3xl md:text-4xl text-green-400 mb-1"
                style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}
              >
                +${Math.round(addedRev).toLocaleString()}
              </div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">
                Additional Monthly Revenue
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
