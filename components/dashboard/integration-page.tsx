"use client";

import { useState, type ComponentType, type CSSProperties } from "react";
import { SectionHeader } from "@/components/dashboard/section-header";
import { DataTable } from "@/components/dashboard/data-table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export interface CredentialField {
  label: string;
  value: string;
  placeholder?: string;
}

export interface FieldMapping {
  local: string;
  remote: string;
}

export interface SyncOption {
  id: string;
  label: string;
  description: string;
  defaultOn: boolean;
}

export interface ActivityItem {
  event: string;
  detail: string;
  time: string;
}

export function IntegrationPage({
  name,
  icon: Icon,
  accentColor,
  connected,
  accountLabel,
  credentialFields,
  fieldMappings,
  syncOptions,
  activity,
}: {
  name: string;
  icon: ComponentType<{ className?: string; style?: CSSProperties }>;
  accentColor: string;
  connected: boolean;
  accountLabel?: string;
  credentialFields: CredentialField[];
  fieldMappings?: FieldMapping[];
  syncOptions?: SyncOption[];
  activity?: ActivityItem[];
}) {
  const [isConnected, setIsConnected] = useState(connected);
  const [options, setOptions] = useState<Record<string, boolean>>(
    Object.fromEntries((syncOptions ?? []).map((o) => [o.id, o.defaultOn]))
  );

  return (
    <div>
      <SectionHeader
        group="Integrations"
        title={name}
        description={`Sync visitors, conversations, and meetings with ${name}.`}
      />
      <div className="p-6 max-w-3xl space-y-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${accentColor}1A` }}
              >
                <Icon className="w-5 h-5" style={{ color: accentColor }} />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{name}</p>
                {isConnected && accountLabel ? (
                  <p className="text-xs text-muted-foreground">{accountLabel}</p>
                ) : (
                  <p className="text-xs text-muted-foreground">Not connected</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isConnected && (
                <Badge variant="default" className="gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Connected
                </Badge>
              )}
              <Button
                variant={isConnected ? "outline" : "default"}
                size="sm"
                className={isConnected ? "" : "bg-emerald-600 hover:bg-emerald-700 text-white"}
                onClick={() => setIsConnected((v) => !v)}
              >
                {isConnected ? "Disconnect" : `Connect ${name}`}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {credentialFields.map((f) => (
              <div key={f.label} className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">{f.label}</Label>
                <Input defaultValue={f.value} placeholder={f.placeholder} disabled={!isConnected && !f.value} />
              </div>
            ))}
          </div>
        </div>

        {isConnected && fieldMappings && (
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Field mapping</h3>
            <DataTable
              columns={["Inboundly field", "", `${name} field`]}
              rows={fieldMappings.map((m) => [
                m.local,
                <ArrowRight key="arrow" className="w-3.5 h-3.5 text-muted-foreground" />,
                <span key="remote" className="font-medium text-foreground">{m.remote}</span>,
              ])}
            />
          </div>
        )}

        {isConnected && syncOptions && (
          <div className="bg-card border border-border rounded-xl divide-y divide-border">
            <h3 className="text-sm font-semibold text-foreground px-6 py-4">Sync settings</h3>
            {syncOptions.map((o) => (
              <div key={o.id} className="flex items-start gap-3 px-6 py-4">
                <Switch
                  checked={options[o.id]}
                  onCheckedChange={(checked) => setOptions((prev) => ({ ...prev, [o.id]: checked }))}
                  className="mt-0.5"
                />
                <div>
                  <p className="text-sm font-medium text-foreground">{o.label}</p>
                  <p className="text-xs text-muted-foreground">{o.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {isConnected && activity && (
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Recent sync activity</h3>
            <DataTable
              columns={["Event", "Detail", "Time"]}
              rows={activity.map((a) => [
                <span key="event" className="font-medium text-foreground">{a.event}</span>,
                a.detail,
                a.time,
              ])}
            />
          </div>
        )}

        {!isConnected && (
          <p className="text-sm text-muted-foreground">
            Connect {name} to configure field mapping, sync settings, and see activity here.
          </p>
        )}
      </div>
    </div>
  );
}
