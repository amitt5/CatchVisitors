"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { IslaDashboardNav } from "@/components/isla/isla-dashboard-nav";

const VOICES = [
  { id: "savannah", label: "Savannah", tag: "Warm, professional" },
  { id: "paige", label: "Paige", tag: "Friendly, energetic" },
  { id: "cole", label: "Cole", tag: "Calm, confident" },
];

const COLORS = [
  { id: "purple", hex: "#7C5CFC" },
  { id: "blue", hex: "#4F8AFF" },
  { id: "lime", hex: "#2F9E5B" },
  { id: "amber", hex: "#B7791F" },
  { id: "slate", hex: "#475569" },
];

export default function IslaSetupPage() {
  const [name, setName] = useState("Isla");
  const [voice, setVoice] = useState("savannah");
  const [color, setColor] = useState("purple");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F5F8FA] text-[#33475B]">
      <IslaDashboardNav active="setup" />

      <main className="max-w-2xl mx-auto px-8 py-10">
        <h1 className="text-2xl font-semibold text-[#1B2A3C] mb-1">Agent Setup</h1>
        <p className="text-sm text-[#516f90] mb-8">Configure how your agent looks, sounds, and feels.</p>

        <div className="bg-white rounded-xl border border-[#E5EBF1] p-6 space-y-8">
          <div>
            <label className="block text-sm font-medium text-[#1B2A3C] mb-2">Agent name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-[#CBD6E2] text-sm focus:outline-none focus:ring-2 focus:ring-[#7C5CFC]/30"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1B2A3C] mb-2">Voice</label>
            <div className="grid grid-cols-1 gap-2">
              {VOICES.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setVoice(v.id)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-md border text-sm text-left transition ${
                    voice === v.id ? "border-[#7C5CFC] bg-[#7C5CFC0D]" : "border-[#CBD6E2] hover:bg-[#FAFBFC]"
                  }`}
                >
                  <span>
                    <span className="font-medium text-[#1B2A3C]">{v.label}</span>
                    <span className="text-[#7C98B6]"> — {v.tag}</span>
                  </span>
                  {voice === v.id && <Check className="w-4 h-4 text-[#7C5CFC]" />}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1B2A3C] mb-2">Brand color</label>
            <div className="flex items-center gap-3">
              {COLORS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setColor(c.id)}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: c.hex }}
                >
                  {color === c.id && <Check className="w-4 h-4 text-white" />}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-md text-sm font-medium text-white bg-[#1B2A3C] hover:bg-[#28394d] transition"
            >
              Save changes
            </button>
            {saved && <span className="text-sm text-[#2F9E5B] flex items-center gap-1"><Check className="w-4 h-4" /> Saved</span>}
          </div>
        </div>
      </main>
    </div>
  );
}
