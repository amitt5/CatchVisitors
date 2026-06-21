"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Copy,
  Loader2,
  Phone,
  PhoneOff,
  Bot,
  Sparkles,
  Construction,
} from "lucide-react";
import Link from "next/link";
import { Agent } from "@/types/database";
import Vapi from "@vapi-ai/web";
import {
  AgentStudioHeader,
  AGENT_STUDIO_TABS,
  type AgentStudioTabId,
} from "@/components/dashboard/agent-studio-header";
import {
  ContentTab,
  GuidesTab,
  ScorecardTab,
  InboxTab,
  EmailTab,
} from "@/components/dashboard/agent-studio-tabs";
import { cn } from "@/lib/utils";

interface Language {
  id: string;
  name: string;
}

const languages: Language[] = [
  { id: "english", name: "English" },
  { id: "dutch", name: "Dutch" },
  { id: "flemish", name: "Flemish" },
  { id: "french", name: "French" },
  { id: "german", name: "German" },
  { id: "spanish", name: "Spanish" },
];

const FACES = [
  { id: "ruby", label: "Ruby" },
  { id: "noor", label: "Noor" },
  { id: "kai", label: "Kai" },
];

const VOICES = [
  { id: "marin", label: "Marin" },
  { id: "savannah", label: "Savannah" },
  { id: "cole", label: "Cole" },
];

const REP_AI_TOOLS = [
  { id: "suggest", label: "Suggest", description: "Generate a response to the visitor's last message. This tool requires AI Content to be configured.", defaultOn: true },
  { id: "summarize", label: "Summarize", description: "Summarize the conversation so far for a rep picking up the chat.", defaultOn: false },
  { id: "translate", label: "Translate", description: "Translate the visitor's message into the rep's preferred language.", defaultOn: false },
];

export default function AgentPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const agentId = params.id as string;
  const isCreateMode = agentId === "create";
  const isEditMode = !isCreateMode && agentId !== "create";

  const studioTab = (searchParams.get("tab") || "profile") as AgentStudioTabId;

  const [businessName, setBusinessName] = useState("");
  const [website, setWebsite] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [vapiAssistantId, setVapiAssistantId] = useState("");
  const [isTesting, setIsTesting] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isGeneratingWidget, setIsGeneratingWidget] = useState(false);
  const [widgetConfig, setWidgetConfig] = useState<any>(null);
  const vapiRef = useRef<Vapi | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [existingAgent, setExistingAgent] = useState<Agent | null>(null);
  const [agentsList, setAgentsList] = useState<Agent[]>([]);

  const [profileSubTab, setProfileSubTab] = useState<"avatar" | "role">(isCreateMode ? "role" : "avatar");
  const [face, setFace] = useState(FACES[0].id);
  const [voice, setVoice] = useState(VOICES[0].id);
  const [tools, setTools] = useState<Record<string, boolean>>(
    Object.fromEntries(REP_AI_TOOLS.map((t) => [t.id, t.defaultOn]))
  );

  useEffect(() => {
    if (isEditMode) {
      fetchAgent();
    } else {
      setLoading(false);
    }
    fetchAgentsList();
  }, [agentId, isEditMode]);

  const fetchAgentsList = async () => {
    try {
      const response = await fetch("/api/agents");
      if (!response.ok) return;
      const data = await response.json();
      setAgentsList(data.agents || []);
    } catch {
      // Non-critical — header dropdown just shows fewer agents.
    }
  };

  const fetchAgent = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/agents?id=${agentId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch agent");
      }
      const data = await response.json();
      if (data.success && data.agent) {
        const agent = data.agent;
        setExistingAgent(agent);
        setBusinessName(agent.name);
        setWebsite(agent.website_url);
        setSelectedLanguages(agent.languages);
        setVapiAssistantId(agent.vapi_assistant_id || "");
        setGeneratedPrompt(agent.prompt);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load agent");
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (languageId: string, checked: boolean | string) => {
    const isChecked = typeof checked === 'boolean' ? checked : checked === 'true';
    if (isChecked) {
      setSelectedLanguages([...selectedLanguages, languageId]);
    } else {
      setSelectedLanguages(selectedLanguages.filter(id => id !== languageId));
    }
  };

  const handleGenerate = async () => {
    if (!businessName.trim() || !website.trim() || selectedLanguages.length === 0) {
      setError("Please fill in all fields and select at least one language");
      return;
    }

    setIsGenerating(true);
    setError("");
    setGeneratedPrompt("");

    try {
      if (isEditMode && existingAgent) {
        const updateRes = await fetch(`/api/agents?id=${agentId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: businessName,
            website_url: website,
            languages: selectedLanguages,
            prompt: generatedPrompt,
            vapi_assistant_id: vapiAssistantId || null,
          }),
        });

        const updateData = await updateRes.json();

        if (!updateRes.ok || !updateData.success) {
          throw new Error(updateData.error || updateData.details || "Agent update failed");
        }

        setGeneratedPrompt(generatedPrompt);
      } else {
        const agentRes = await fetch("/api/agents", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            businessName: businessName,
            website: website,
            languages: selectedLanguages,
            vapi_assistant_id: vapiAssistantId || null,
          }),
        });

        const agentData = await agentRes.json();

        if (!agentRes.ok || !agentData.success) {
          throw new Error(agentData.error || agentData.details || "Agent creation failed");
        }

        setGeneratedPrompt(agentData.prompt || "");

        if (agentData.agentId) {
          router.push(`/agent/${agentData.agentId}`);
        }
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to generate/update agent");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
  };

  const handleTestAgent = async () => {
    if (!vapiAssistantId) {
      setError("No VAPI assistant ID available for testing");
      return;
    }

    if (isCallActive) {
      if (vapiRef.current) {
        vapiRef.current.stop();
        vapiRef.current = null;
      }
      setIsCallActive(false);
      return;
    }

    setIsTesting(true);
    setError("");

    try {
      const response = await fetch("/api/test-vapi-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assistantId: vapiAssistantId,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || data.details || "VAPI test failed");
      }

      const vapi = new Vapi(data.apiKey);
      vapiRef.current = vapi;

      vapi.on('call-start', () => {
        setIsCallActive(true);
        setIsTesting(false);
      });

      vapi.on('call-end', () => {
        setIsCallActive(false);
        vapiRef.current = null;
      });

      vapi.on('error', (error) => {
        setError(`VAPI call error: ${error.message}`);
        setIsCallActive(false);
        vapiRef.current = null;
        setIsTesting(false);
      });

      await vapi.start(data.config.assistantId, data.config.assistantOverrides);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to test VAPI agent");
      setIsTesting(false);
    }
  };

  const handleGenerateWidget = async () => {
    if (!vapiAssistantId) {
      setError("No VAPI assistant ID available for widget generation");
      return;
    }

    setIsGeneratingWidget(true);
    setError("");

    try {
      const response = await fetch("/api/widgets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agent_id: agentId,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || data.details || "Widget generation failed");
      }

      setWidgetConfig(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to generate widget");
    } finally {
      setIsGeneratingWidget(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="text-gray-600 mt-2">Loading agent...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AgentStudioHeader
        agentName={businessName || (isCreateMode ? "New agent" : "Untitled agent")}
        agentId={agentId}
        agents={agentsList}
        activeTab={studioTab}
      />

      <div className="max-w-3xl mx-auto px-6 py-6">
        <Link href="/agent" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Agents
        </Link>

        {studioTab !== "profile" ? (
          <StudioTabContent tab={studioTab} />
        ) : (
          <>
            {/* Agent settings panel */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <h2 className="text-sm font-semibold text-foreground">Agent settings</h2>
                <div className="flex items-center gap-2">
                  <Link href="/agent">
                    <Button variant="outline" size="sm">Cancel</Button>
                  </Link>
                  <Button
                    size="sm"
                    onClick={handleGenerate}
                    disabled={!businessName || !website || selectedLanguages.length === 0 || isGenerating}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    {isGenerating ? (
                      <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                    ) : null}
                    {isCreateMode ? "Create" : "Save"}
                  </Button>
                </div>
              </div>

              <div className="px-6 py-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Agent name</Label>
                  <Input
                    id="businessName"
                    placeholder="e.g. &quot;Your AI SDR Agent&quot;"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    disabled={isGenerating}
                  />
                </div>

                <div className="flex items-center gap-5 border-b border-border text-sm">
                  <button
                    onClick={() => setProfileSubTab("avatar")}
                    className={cn(
                      "pb-2.5 border-b-2 transition-colors",
                      profileSubTab === "avatar"
                        ? "border-[#02524B] text-foreground font-medium"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Agent avatar
                  </button>
                  <button
                    onClick={() => setProfileSubTab("role")}
                    className={cn(
                      "pb-2.5 border-b-2 transition-colors",
                      profileSubTab === "role"
                        ? "border-[#02524B] text-foreground font-medium"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Agent role
                  </button>
                </div>

                {profileSubTab === "avatar" ? (
                  <div className="space-y-5">
                    <div className="w-full max-w-xs aspect-video rounded-lg bg-gradient-to-br from-[#F0F8F3] to-[#E6F2EE] border border-border flex items-center justify-center">
                      <Bot className="w-10 h-10 text-[#02524B]/60" />
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleTestAgent}
                      disabled={!vapiAssistantId || isTesting}
                      className="w-full max-w-xs"
                    >
                      {isTesting ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : isCallActive ? (
                        <PhoneOff className="w-4 h-4 mr-2" />
                      ) : (
                        <Phone className="w-4 h-4 mr-2" />
                      )}
                      {isCallActive ? "End preview call" : "Preview"}
                    </Button>
                    {!vapiAssistantId && (
                      <p className="text-xs text-muted-foreground">
                        Add a VAPI Assistant ID under &quot;Agent role&quot; to enable preview calls.
                      </p>
                    )}
                    {isCallActive && (
                      <p className="text-sm text-emerald-600">
                        Call in progress — speak to test your assistant.
                      </p>
                    )}

                    <div className="grid grid-cols-2 gap-4 max-w-xs">
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">Face</Label>
                        <Select value={face} onValueChange={setFace}>
                          <SelectTrigger className="w-full" size="sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {FACES.map((f) => (
                              <SelectItem key={f.id} value={f.id}>{f.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">Voice</Label>
                        <Select value={voice} onValueChange={setVoice}>
                          <SelectTrigger className="w-full" size="sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {VOICES.map((v) => (
                              <SelectItem key={v.id} value={v.id}>{v.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {website && (
                      <p className="text-sm text-muted-foreground">
                        Talks to visitors on <span className="text-foreground">{website}</span>.{" "}
                        <button onClick={() => setProfileSubTab("role")} className="text-[#02524B] hover:underline">
                          Edit in Agent role
                        </button>
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        type="url"
                        placeholder="https://example.com"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        disabled={isGenerating}
                      />
                    </div>

                    <div className="space-y-3">
                      <Label>Languages</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {languages.map((language) => (
                          <div key={language.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={language.id}
                              checked={selectedLanguages.includes(language.id)}
                              onCheckedChange={(checked) => handleLanguageChange(language.id, checked)}
                              disabled={isGenerating}
                            />
                            <Label htmlFor={language.id} className="text-sm font-normal leading-none">
                              {language.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="vapiAssistantId">VAPI Assistant ID (optional)</Label>
                      <Input
                        id="vapiAssistantId"
                        placeholder="Enter VAPI assistant ID after creating it manually"
                        value={vapiAssistantId}
                        onChange={(e) => setVapiAssistantId(e.target.value)}
                        disabled={isGenerating}
                      />
                      <p className="text-sm text-muted-foreground">
                        After creating your assistant manually on the VAPI platform, enter the assistant ID here.
                      </p>
                    </div>

                    {isEditMode && vapiAssistantId && (
                      <Button
                        onClick={handleGenerateWidget}
                        variant="secondary"
                        className="w-full"
                        disabled={isGeneratingWidget}
                      >
                        {isGeneratingWidget ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Sparkles className="w-4 h-4 mr-2" />
                        )}
                        Generate Widget
                      </Button>
                    )}
                  </div>
                )}

                {error && (
                  <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <p className="text-destructive text-sm">{error}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Generated Prompt */}
            {generatedPrompt && (
              <div className="mt-6 bg-card border border-border rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-sm font-semibold text-foreground">
                    {isCreateMode ? "Generated Agent Prompt" : "Updated Agent Prompt"}
                  </h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={generatedPrompt}
                  readOnly
                  className="min-h-[200px] w-full p-4 border rounded-lg bg-muted/40"
                />
              </div>
            )}

            {/* Widget Embed */}
            {widgetConfig && (
              <div className="mt-6 bg-card border border-border rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-sm font-semibold text-foreground">Widget Embed Code</h2>
                  <Button
                    onClick={() => navigator.clipboard.writeText(widgetConfig.embed_code)}
                    variant="outline"
                    size="sm"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Code
                  </Button>
                </div>
                <div className="bg-muted/40 p-4 rounded-lg border border-border">
                  <code className="text-sm text-foreground break-all">
                    {widgetConfig.embed_code}
                  </code>
                </div>
                <div className="mt-4 p-4 bg-muted/40 rounded-lg border border-border">
                  <h3 className="font-semibold text-foreground mb-2 text-sm">Installation Instructions:</h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Copy the embed code above</li>
                    <li>Paste it into your website's HTML</li>
                    <li>Place it before the closing &lt;/body&gt; tag</li>
                    <li>The widget will appear as a floating button in the bottom-right corner</li>
                  </ol>
                </div>
              </div>
            )}

            {/* Rep AI tools */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-sm font-semibold text-foreground mb-1.5">Rep AI tools</h3>
                <p className="text-sm text-muted-foreground">
                  Configure which AI tools your reps have access to while chatting with visitors.
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-sm font-semibold text-foreground mb-3">Tools</h3>
                <div className="space-y-4">
                  {REP_AI_TOOLS.map((tool) => (
                    <div key={tool.id} className="flex items-start gap-3">
                      <Switch
                        checked={tools[tool.id]}
                        onCheckedChange={(checked) =>
                          setTools((prev) => ({ ...prev, [tool.id]: checked }))
                        }
                        className="mt-0.5"
                      />
                      <div>
                        <p className="text-sm font-medium text-foreground">{tool.label}</p>
                        <p className="text-xs text-muted-foreground">{tool.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function StudioTabContent({ tab }: { tab: AgentStudioTabId }) {
  switch (tab) {
    case "content":
      return <ContentTab />;
    case "guides":
      return <GuidesTab />;
    case "scorecard":
      return <ScorecardTab />;
    case "inbox":
      return <InboxTab />;
    case "email":
      return <EmailTab />;
    default:
      return <ComingSoonPanel tabId={tab} />;
  }
}

function ComingSoonPanel({ tabId }: { tabId: AgentStudioTabId }) {
  const tabInfo = AGENT_STUDIO_TABS.find((t) => t.id === tabId);
  return (
    <div className="bg-card border border-border rounded-xl py-16 flex flex-col items-center text-center gap-3">
      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
        <Construction className="w-5 h-5 text-muted-foreground" />
      </div>
      <p className="text-sm font-medium text-foreground">{tabInfo?.label} is coming soon</p>
      <p className="text-sm text-muted-foreground max-w-sm">
        This part of Agent Studio isn&apos;t wired up yet. Check back soon.
      </p>
    </div>
  );
}
