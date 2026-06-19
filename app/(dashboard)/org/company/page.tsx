"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/dashboard/section-header";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function CompanyDetailsPage() {
  const [companyName, setCompanyName] = useState("CatchVisitors B.V.");
  const [website, setWebsite] = useState("https://catchvisitors.com");
  const [industry, setIndustry] = useState("B2B SaaS");
  const [size, setSize] = useState("11-50 employees");
  const [address, setAddress] = useState("Herengracht 182, Amsterdam, Netherlands");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <SectionHeader group="Organization" title="Company Details" description="Information about your business." />
      <div className="p-6 max-w-2xl">
        <div className="bg-card border border-border rounded-xl p-6 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company name</Label>
            <Input id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input id="website" value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input id="industry" value={industry} onChange={(e) => setIndustry(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="size">Company size</Label>
              <Input id="size" value={size} onChange={(e) => setSize(e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Save changes
            </Button>
            {saved && (
              <span className="text-sm text-emerald-600 flex items-center gap-1">
                <Check className="w-4 h-4" /> Saved
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
