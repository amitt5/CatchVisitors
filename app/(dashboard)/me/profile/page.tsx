"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/dashboard/section-header";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Check } from "lucide-react";

export default function MyProfilePage() {
  const [name, setName] = useState("Amit Goel");
  const [email, setEmail] = useState("amit@catchvisitors.com");
  const [role, setRole] = useState("Founder");
  const [phone, setPhone] = useState("+31 6 1234 5678");
  const [timezone, setTimezone] = useState("Europe/Amsterdam");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <SectionHeader group="Me" title="My Profile" description="Your personal account details." />
      <div className="p-6 max-w-2xl">
        <div className="bg-card border border-border rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="size-14">
              <AvatarFallback className="bg-indigo-100 text-indigo-600 font-semibold">AG</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-foreground">{name}</p>
              <p className="text-sm text-muted-foreground">{role} at CatchVisitors</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" value={role} onChange={(e) => setRole(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Input id="timezone" value={timezone} onChange={(e) => setTimezone(e.target.value)} />
            </div>
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
