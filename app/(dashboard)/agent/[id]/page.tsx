"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Copy, Loader2, Phone, PhoneOff } from "lucide-react";
import Link from "next/link";
import { Agent } from "@/types/database";
import Vapi from "@vapi-ai/web";

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

export default function AgentPage() {
  const params = useParams();
  const router = useRouter();
  const agentId = params.id as string;
  const isEditMode = agentId !== "create";

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

  useEffect(() => {
    if (isEditMode) {
      fetchAgent();
    } else {
      setLoading(false);
    }
  }, [agentId, isEditMode]);

  const fetchAgent = async () => {
    try {
      setLoading(true);
      console.log('Fetching agent:', agentId);
      const response = await fetch(`/api/agents?id=${agentId}`);
      console.log('Fetching agent response:', response);
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
      console.log('🚀 Starting agent generation/update for:', { businessName, website });
      
      if (isEditMode && existingAgent) {
        // Update existing agent
        const updateRes = await fetch(`/api/agents?id=${agentId}&update=true`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            id: agentId,
            name: businessName,
            website_url: website,
            languages: selectedLanguages,
            prompt: generatedPrompt,
            vapi_assistant_id: vapiAssistantId || null,
          }),
        });
        
        const updateData = await updateRes.json();
        console.log('📊 Agent update response:', { 
          status: updateRes.status, 
          success: updateData.success
        });
        
        if (!updateRes.ok || !updateData.success) {
          throw new Error(updateData.error || updateData.details || "Agent update failed");
        }
        
        setGeneratedPrompt(generatedPrompt);
        console.log('✅ Agent updated successfully!');
      } else {
        // Create new agent (same as original generate logic)
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
        console.log('📊 Agent creation response:', { 
          status: agentRes.status, 
          success: agentData.success,
          hasPrompt: !!agentData.prompt,
          agentId: agentData.agentId
        });
        
        if (!agentRes.ok || !agentData.success) {
          throw new Error(agentData.error || agentData.details || "Agent creation failed");
        }

        // Step 2: Show the generated prompt
        setGeneratedPrompt(agentData.prompt || "");
        
        // Step 3: Redirect to edit mode if this was create mode
        if (!isEditMode && agentData.agentId) {
          router.replace(`/agent/${agentData.agentId}`);
        }
        
        console.log('✅ Agent created successfully!');
      }
      
    } catch (error) {
      console.error('💥 Error generating/updating agent:', error);
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
      // End the call
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
      console.log('🚀 Testing VAPI agent:', vapiAssistantId);
      
      // Get test configuration from API
      const response = await fetch("/api/test-vapi-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assistantId: vapiAssistantId,
        }),
      });

      const data = await response.json();
      console.log('📊 VAPI test response:', data);

      if (!response.ok || !data.success) {
        throw new Error(data.error || data.details || "VAPI test failed");
      }

      // Initialize VAPI and start the call (like landing page)
      const vapi = new Vapi(data.apiKey);
      vapiRef.current = vapi;

      // Set up event listeners
      vapi.on('call-start', () => {
        console.log('✅ Test call started!');
        setIsCallActive(true);
        setIsTesting(false);
      });

      vapi.on('call-end', () => {
        console.log('📞 Test call ended');
        setIsCallActive(false);
        vapiRef.current = null;
      });

      vapi.on('error', (error) => {
        console.error('❌ VAPI call error:', error);
        setError(`VAPI call error: ${error.message}`);
        setIsCallActive(false);
        vapiRef.current = null;
        setIsTesting(false);
      });

      // Start the call with test configuration
      await vapi.start(data.config.assistantId, data.config.assistantOverrides);
      
    } catch (error) {
      console.error('💥 Error testing VAPI agent:', error);
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
      console.log('🧩 Generating widget for agent:', agentId);
      
      const response = await fetch("/api/widgets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agent_id: agentId,
        }),
      });

      const data = await response.json();
      console.log('📊 Widget generation response:', data);

      if (!response.ok || !data.success) {
        throw new Error(data.error || data.details || "Widget generation failed");
      }

      setWidgetConfig(data);
      console.log('✅ Widget generated successfully!');
      
    } catch (error) {
      console.error('💥 Error generating widget:', error);
      setError(error instanceof Error ? error.message : "Failed to generate widget");
    } finally {
      setIsGeneratingWidget(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-2">Loading agent...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="w-full">
        {/* Header */}
        <div className="mb-6">
          <Link href="/agent" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Agents
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditMode ? "Edit Agent" : "Create New Agent"}
          </h1>
          <p className="text-gray-600 mt-2">
            {isEditMode 
              ? "Update your AI agent configuration and prompt."
              : "Configure your AI agent by providing business details and language preferences."
            }
          </p>
        </div>

        {/* Form */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="space-y-6">
            {/* Business Name */}
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                placeholder="Enter your business name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                disabled={isGenerating}
              />
            </div>

            {/* Website */}
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

            {/* Languages */}
            <div className="space-y-3">
              <Label>Languages</Label>
              <div className="grid grid-cols-2 gap-4">
                {languages.map((language) => (
                  <div key={language.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={language.id}
                      checked={selectedLanguages.includes(language.id)}
                      onCheckedChange={(checked) => handleLanguageChange(language.id, checked)}
                      disabled={isGenerating}
                    />
                    <Label
                      htmlFor={language.id}
                      className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed"
                    >
                      {language.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* VAPI Assistant ID */}
            <div className="space-y-2">
              <Label htmlFor="vapiAssistantId">VAPI Assistant ID (Optional)</Label>
              <Input
                id="vapiAssistantId"
                placeholder="Enter VAPI assistant ID after creating it manually"
                value={vapiAssistantId}
                onChange={(e) => setVapiAssistantId(e.target.value)}
                disabled={isGenerating}
              />
              <p className="text-sm text-gray-500">
                After creating your assistant manually on the VAPI platform, enter the assistant ID here.
              </p>
            </div>

            {/* Generate/Update Button */}
            <div className="pt-4">
              <Button 
                onClick={handleGenerate}
                className="w-full"
                disabled={!businessName || !website || selectedLanguages.length === 0 || isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {isEditMode ? "Updating Agent..." : "Generating Agent..."}
                  </>
                ) : (
                  isEditMode ? "Update Agent" : "Generate Agent"
                )}
              </Button>
            </div>

            {/* Generate Widget Button - Only show if VAPI assistant ID exists and in edit mode */}
            {isEditMode && vapiAssistantId && (
              <div className="pt-2">
                <Button 
                  onClick={handleGenerateWidget}
                  variant="secondary"
                  className="w-full"
                  disabled={isGeneratingWidget}
                >
                  {isGeneratingWidget ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating Widget...
                    </>
                  ) : (
                    <>
                      🧩 Generate Widget
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Test Agent Button - Only show if VAPI assistant ID exists and in edit mode */}
            {isEditMode && vapiAssistantId && (
              <div className="pt-2">
                <Button 
                  onClick={handleTestAgent}
                  variant={isCallActive ? "destructive" : "outline"}
                  className="w-full"
                  disabled={isTesting}
                >
                  {isTesting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Starting Test...
                    </>
                  ) : isCallActive ? (
                    <>
                      <PhoneOff className="w-4 h-4 mr-2" />
                      End Test Call
                    </>
                  ) : (
                    <>
                      <Phone className="w-4 h-4 mr-2" />
                      Test Agent
                    </>
                  )}
                </Button>
                {isCallActive && (
                  <p className="text-sm text-green-600 mt-2 text-center">
                    📞 Test call in progress... Speak to test your assistant!
                  </p>
                )}
              </div>
            )}

            {/* Error Display */}
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}
          </div>
        </div>

        {/* Generated Prompt Section */}
        {generatedPrompt && (
          <div className="mt-6 bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {isEditMode ? "Updated Agent Prompt" : "Generated Agent Prompt"}
              </h2>
              <Button
                onClick={copyToClipboard}
                variant="outline"
                size="sm"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
            <Textarea
              value={generatedPrompt}
              readOnly
              className="min-h-[200px] w-full p-4 border rounded-lg bg-gray-50"
            />
          </div>
        )}

        {/* Widget Embed Section */}
        {widgetConfig && (
          <div className="mt-6 bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                🧩 Widget Embed Code
              </h2>
              <Button
                onClick={() => navigator.clipboard.writeText(widgetConfig.embed_code)}
                variant="outline"
                size="sm"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Code
              </Button>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border">
              <code className="text-sm text-gray-800 break-all">
                {widgetConfig.embed_code}
              </code>
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">Installation Instructions:</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
                <li>Copy the embed code above</li>
                <li>Paste it into your website's HTML</li>
                <li>Place it before the closing &lt;/body&gt; tag</li>
                <li>The widget will appear as a floating button in the bottom-right corner</li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
