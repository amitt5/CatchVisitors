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
  { id: "green", hex: "#02524B" },
  { id: "lime", hex: "#B5D627" },
  { id: "success", hex: "#2E9F6E" },
  { id: "amber", hex: "#B7791F" },
  { id: "slate", hex: "#475569" },
];

export default function IslaSetupPage() {
  const [name, setName] = useState("Isla");
  const [voice, setVoice] = useState("savannah");
  const [color, setColor] = useState("green");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F0F8F3] text-[#10201D]">
      <IslaDashboardNav active="setup" />

      <main className="max-w-2xl mx-auto px-8 py-10">
        <h1 className="text-2xl font-semibold text-[#10201D] mb-1">Agent Setup</h1>
        <p className="text-sm text-[#5F706C] mb-8">Configure how your agent looks, sounds, and feels.</p>

        <div className="bg-white rounded-xl border border-[#DDE8E3] p-6 space-y-8">
          <div>
            <label className="block text-sm font-medium text-[#10201D] mb-2">Agent name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-[#DDE8E3] text-sm focus:outline-none focus:ring-2 focus:ring-[#02524B]/25"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#10201D] mb-2">Voice</label>
            <div className="grid grid-cols-1 gap-2">
              {VOICES.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setVoice(v.id)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-md border text-sm text-left transition ${
                    voice === v.id ? "border-[#02524B] bg-[#F0F8F3]" : "border-[#DDE8E3] hover:bg-[#F0F8F3]"
                  }`}
                >
                  <span>
                    <span className="font-medium text-[#10201D]">{v.label}</span>
                    <span className="text-[#5F706C]"> — {v.tag}</span>
                  </span>
                  {voice === v.id && <Check className="w-4 h-4 text-[#02524B]" />}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#10201D] mb-2">Brand color</label>
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
              className="px-4 py-2 rounded-md text-sm font-medium text-white bg-[#02524B] hover:bg-[#013F3A] transition"
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
