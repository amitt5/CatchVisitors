"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/dashboard/section-header";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PROVIDERS = [
  { id: "google", label: "Google Workspace" },
  { id: "okta", label: "Okta" },
  { id: "azure", label: "Microsoft Entra ID" },
];

export default function SingleSignOnPage() {
  const [provider, setProvider] = useState("google");
  const [domain, setDomain] = useState("inboundly.com");

  return (
    <div>
      <SectionHeader group="Organization" title="Single Sign-On" description="Let your team sign in with your identity provider." />
      <div className="p-6 max-w-xl">
        <div className="bg-card border border-border rounded-xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-foreground">Connection status</p>
            <Badge variant="secondary">Not connected</Badge>
          </div>

          <div className="space-y-2">
            <Label>Identity provider</Label>
            <Select value={provider} onValueChange={setProvider}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PROVIDERS.map((p) => (
                  <SelectItem key={p.id} value={p.id}>{p.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="domain">Email domain</Label>
            <Input id="domain" value={domain} onChange={(e) => setDomain(e.target.value)} />
            <p className="text-sm text-muted-foreground">
              Anyone signing in with an @{domain} email will be redirected to your identity provider.
            </p>
          </div>

          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Connect provider</Button>
        </div>
      </div>
    </div>
  );
}
