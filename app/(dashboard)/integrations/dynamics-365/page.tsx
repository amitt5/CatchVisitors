"use client";

import { Boxes } from "lucide-react";
import { IntegrationPage } from "@/components/dashboard/integration-page";

export default function Dynamics365Page() {
  return (
    <IntegrationPage
      name="Microsoft Dynamics 365"
      icon={Boxes}
      accentColor="#0078D4"
      connected={false}
      credentialFields={[
        { label: "Organization URL", value: "", placeholder: "https://yourorg.crm.dynamics.com" },
        { label: "Tenant ID", value: "", placeholder: "Azure AD tenant ID" },
        { label: "Client ID", value: "", placeholder: "App registration client ID" },
        { label: "Client secret", value: "", placeholder: "App registration client secret" },
      ]}
    />
  );
}
