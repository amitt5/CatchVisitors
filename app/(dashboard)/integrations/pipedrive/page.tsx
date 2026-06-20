"use client";

import { Filter } from "lucide-react";
import { IntegrationPage } from "@/components/dashboard/integration-page";

export default function PipedrivePage() {
  return (
    <IntegrationPage
      name="Pipedrive"
      icon={Filter}
      accentColor="#017737"
      connected={false}
      credentialFields={[
        { label: "Company domain", value: "", placeholder: "yourcompany.pipedrive.com" },
        { label: "API token", value: "", placeholder: "Paste your Pipedrive API token" },
      ]}
    />
  );
}
