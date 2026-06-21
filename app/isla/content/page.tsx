"use client";

import { useState } from "react";
import { FileText, Upload } from "lucide-react";
import { IslaDashboardNav } from "@/components/isla/isla-dashboard-nav";

const TABS = [
  {
    id: "marketing",
    label: "Marketing Content",
    docs: [
      { name: "Switching from Concur — email sequence", type: "Email", updated: "3 days ago" },
      { name: "2026 Agentic Marketing one-pager", type: "PDF", updated: "1 week ago" },
      { name: "Isla product overview deck", type: "Slides", updated: "2 weeks ago" },
    ],
  },
  {
    id: "stories",
    label: "Customer Stories",
    docs: [
      { name: "Northstar Logistics — 6x SDR efficiency", type: "Case study", updated: "5 days ago" },
      { name: "Lumio — pipeline in 30 days", type: "Case study", updated: "3 weeks ago" },
    ],
  },
  {
    id: "intel",
    label: "Competitive Intel",
    docs: [
      { name: "Isla vs. legacy chatbots — battlecard", type: "PDF", updated: "2 days ago" },
      { name: "Objection handling: \"we already have live chat\"", type: "Doc", updated: "1 week ago" },
    ],
  },
  {
    id: "positioning",
    label: "Product Positioning",
    docs: [
      { name: "Core value proposition", type: "Doc", updated: "1 month ago" },
      { name: "Pricing & packaging guide", type: "Doc", updated: "1 month ago" },
    ],
  },
  {
    id: "guides",
    label: "Guides",
    docs: [
      { name: "How Isla qualifies a visitor", type: "Guide", updated: "2 weeks ago" },
      { name: "When to escalate to a human rep", type: "Guide", updated: "2 weeks ago" },
    ],
  },
];

export default function IslaContentPage() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const tab = TABS.find((t) => t.id === activeTab)!;

  return (
    <div className="min-h-screen bg-[#F5F8FA] text-[#33475B]">
      <IslaDashboardNav active="content" />

      <main className="max-w-4xl mx-auto px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-[#1B2A3C]">Content Library</h1>
            <p className="text-sm text-[#516f90] mt-1">What Isla knows about your product, your customers, and your competitors.</p>
          </div>
          <button className="flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-md border border-[#CBD6E2] text-[#33475B] hover:bg-white transition">
            <Upload className="w-4 h-4" />
            Upload
          </button>
        </div>

        <div className="flex items-center gap-1 mb-4 border-b border-[#E5EBF1]">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-3 py-2 text-sm font-medium border-b-2 transition ${
                activeTab === t.id
                  ? "border-[#02524B] text-[#1B2A3C]"
                  : "border-transparent text-[#7C98B6] hover:text-[#1B2A3C]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-[#E5EBF1] divide-y divide-[#E5EBF1]">
          {tab.docs.map((doc) => (
            <div key={doc.name} className="flex items-center gap-3 px-5 py-3.5">
              <FileText className="w-4 h-4 text-[#7C98B6] shrink-0" />
              <div className="flex-1 text-sm text-[#1B2A3C]">{doc.name}</div>
              <div className="text-xs text-[#7C98B6] w-20">{doc.type}</div>
              <div className="text-xs text-[#7C98B6] w-24 text-right">{doc.updated}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
