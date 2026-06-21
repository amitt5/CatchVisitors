"use client";

import { Database } from "lucide-react";
import { IntegrationPage } from "@/components/dashboard/integration-page";

export default function HubSpotPage() {
  return (
    <IntegrationPage
      name="HubSpot"
      icon={Database}
      accentColor="#FF7A59"
      connected
      accountLabel="Connected as amit@inboundly.com · Portal 24681012"
      credentialFields={[
        { label: "Portal ID", value: "24681012" },
        { label: "Private app token", value: "pat-na1-••••••••••••" },
      ]}
      fieldMappings={[
        { local: "Visitor name", remote: "Contact: Full name" },
        { local: "Visitor email", remote: "Contact: Email" },
        { local: "Company", remote: "Company: Name" },
        { local: "Lead source", remote: "Contact: Original source" },
        { local: "Conversation transcript", remote: "Note" },
        { local: "Booked meeting", remote: "Meeting" },
      ]}
      syncOptions={[
        { id: "auto-contact", label: "Create contacts automatically", description: "New visitors who chat with Isla become HubSpot contacts.", defaultOn: true },
        { id: "transcript", label: "Sync transcripts as notes", description: "Log the full conversation as a timeline note on the contact.", defaultOn: true },
        { id: "hot-task", label: "Create task for hot leads", description: "Notify the owning rep when a visitor shows strong buying intent.", defaultOn: true },
        { id: "two-way", label: "Two-way sync", description: "Reflect HubSpot property changes back into Inboundly.", defaultOn: false },
      ]}
      activity={[
        { event: "Created contact", detail: "Karen W. — Acme Logistics", time: "9 min ago" },
        { event: "Logged meeting", detail: "Demo call with Vantage Realty", time: "44 min ago" },
        { event: "Updated deal", detail: "Borealis Health — moved to Demo stage", time: "2 hours ago" },
        { event: "Synced contacts", detail: "8 contacts updated", time: "5 hours ago" },
      ]}
    />
  );
}
