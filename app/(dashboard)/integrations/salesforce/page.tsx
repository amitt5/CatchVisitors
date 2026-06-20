"use client";

import { Cloud } from "lucide-react";
import { IntegrationPage } from "@/components/dashboard/integration-page";

export default function SalesforcePage() {
  return (
    <IntegrationPage
      name="Salesforce"
      icon={Cloud}
      accentColor="#00A1E0"
      connected
      accountLabel="Connected as isla-integration@catchvisitors.com"
      credentialFields={[
        { label: "Instance URL", value: "https://catchvisitors.my.salesforce.com" },
        { label: "API version", value: "v59.0" },
        { label: "Consumer key", value: "3MVG9..." },
        { label: "Consumer secret", value: "••••••••••••••••" },
      ]}
      fieldMappings={[
        { local: "Visitor name", remote: "Contact: Full Name" },
        { local: "Visitor email", remote: "Contact: Email" },
        { local: "Company", remote: "Account: Name" },
        { local: "Lead source", remote: "Lead: Lead Source" },
        { local: "Conversation transcript", remote: "Task: Description" },
        { local: "Booked meeting", remote: "Event: Subject" },
      ]}
      syncOptions={[
        { id: "auto-lead", label: "Create leads automatically", description: "New visitors who engage with Isla become Salesforce leads.", defaultOn: true },
        { id: "transcript", label: "Sync transcripts as tasks", description: "Attach the full conversation transcript to the lead or contact.", defaultOn: true },
        { id: "hot-task", label: "Create task for hot leads", description: "Notify the assigned rep when a visitor shows strong buying intent.", defaultOn: true },
        { id: "two-way", label: "Two-way sync", description: "Reflect Salesforce field changes back into CatchVisitors.", defaultOn: true },
      ]}
      activity={[
        { event: "Created lead", detail: "Sofia Mendes — Northwind Clinics", time: "2 min ago" },
        { event: "Updated opportunity", detail: "Acme Logistics — Demo Booked", time: "18 min ago" },
        { event: "Created task", detail: "Follow up with Daan Visser", time: "1 hour ago" },
        { event: "Synced contacts", detail: "14 contacts updated", time: "3 hours ago" },
      ]}
    />
  );
}
