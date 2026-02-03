"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mic, MessageCircle, X, Settings } from "lucide-react";

const suggestedQuestions = [
  "How much do you charge?",
  "Can they fire me without severance?",
  "What's your success rate?",
  "How long does the process take?",
  "Do I have a case?",
];

const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "nl", label: "Dutch" },
] as const;

export function DemoSection() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [language, setLanguage] = useState<"en" | "nl">("en");
  const [isScraping, setIsScraping] = useState(false);
  const [scrapeError, setScrapeError] = useState<string | null>(null);
  const [testMessage, setTestMessage] = useState<string | null>(null);
  const [vapiConfig, setVapiConfig] = useState<any>(null);
  const [isCallActive, setIsCallActive] = useState(false);

  const handleOpenDemo = () => {
    setScrapeError(null);
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    const url = websiteUrl.trim();
    if (!url) return;
    setIsScraping(true);
    setScrapeError(null);
    try {
      // Step 1: Scrape website and format data
      const scrapeRes = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, language }),
      });
      const scrapeData = await scrapeRes.json();
      if (!scrapeRes.ok) {
        setScrapeError(scrapeData.error ?? scrapeData.details ?? "Scraping failed");
        return;
      }

      // Step 2: Create VAPI assistant
      const vapiRes = await fetch("/api/vapi-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          demoId: scrapeData.demoId, 
          formattedData: scrapeData.formattedData 
        }),
      });
      const vapiData = await vapiRes.json();
      if (!vapiRes.ok) {
        setScrapeError(vapiData.error ?? vapiData.details ?? "VAPI setup failed");
        return;
      }

      // Store VAPI config for the web widget
      setVapiConfig(vapiData.webConfig);
      setDialogOpen(false);
    } catch {
      setScrapeError("Network error. Please try again.");
    } finally {
      setIsScraping(false);
    }
  };

  const handleCancel = () => {
    setDialogOpen(false);
    setScrapeError(null);
  };

  const startVapiCall = async () => {
    if (!vapiConfig) {
      setScrapeError("Please set up your website first");
      return;
    }

    setIsCallActive(true);
    try {
      // Initialize VAPI widget
      if (typeof window !== 'undefined' && (window as any).vapi) {
        const vapi = (window as any).vapi;
        
        // Start the call
        await vapi.start({
          assistantId: vapiConfig.assistantId,
          apiKey: vapiConfig.apiKey,
        });

        // Handle call events
        vapi.on('call-start', () => {
          console.log('Call started');
        });

        vapi.on('call-end', () => {
          console.log('Call ended');
          setIsCallActive(false);
        });

        vapi.on('error', (error: any) => {
          console.error('VAPI error:', error);
          setScrapeError('Call failed: ' + error.message);
          setIsCallActive(false);
        });
      } else {
        // Load VAPI SDK dynamically
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/@vapi-ai/web@latest/dist/index.js';
        script.onload = async () => {
          const vapi = (window as any).vapi;
          await vapi.start({
            assistantId: vapiConfig.assistantId,
            apiKey: vapiConfig.apiKey,
          });
        };
        document.head.appendChild(script);
      }
    } catch (error) {
      console.error('Failed to start VAPI call:', error);
      setScrapeError('Failed to start call');
      setIsCallActive(false);
    }
  };

  const handleTestSupabase = async () => {
    setTestMessage(null);
    try {
      const res = await fetch("/api/test-supabase", { method: "POST" });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setTestMessage(
          `Supabase test failed: ${data.error ?? data.details ?? "Unknown error"}`,
        );
        return;
      }
      setTestMessage(
        `Supabase test OK (demo id: ${data.demoId ?? "n/a"})`,
      );
    } catch {
      setTestMessage("Supabase test failed: network error");
    }
  };

  return (
    <section id="demo" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Try It Right Now - Talk to Our Demo Employment Lawyer
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Click the button below and ask questions like a real visitor would.
            No signup required.
          </p>
        </div>

        <Card className="max-w-3xl mx-auto border-2 border-[#2563EB]/20 shadow-xl bg-gradient-to-b from-white to-[#2563EB]/5">
          <CardContent className="p-8 md:p-12">
            {/* Voice Button Placeholder - Vapi Widget goes here */}
            <div className="flex flex-col items-center">
              <div
                id="vapi-voice-widget"
                className="relative mb-8"
                aria-label="Voice assistant button placeholder"
              >
                {/* Pulse Animation Ring */}
                <div className="absolute inset-0 rounded-full bg-[#2563EB]/20 animate-ping" />
                <div className="absolute inset-2 rounded-full bg-[#2563EB]/30 animate-pulse" />

                {/* Main Button */}
                <button
                  type="button"
                  onClick={vapiConfig ? startVapiCall : handleOpenDemo}
                  disabled={isCallActive}
                  className={`relative w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center shadow-2xl transition-all cursor-pointer ${
                    isCallActive 
                      ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                      : 'bg-gradient-to-br from-[#2563EB] to-[#7C3AED] hover:scale-105 shadow-[#2563EB]/30'
                  }`}
                  aria-label={isCallActive ? "End call" : vapiConfig ? "Start voice conversation" : "Set up demo"}
                >
                  {isCallActive ? (
                    <X className="w-12 h-12 md:w-16 md:h-16 text-white" />
                  ) : vapiConfig ? (
                    <Mic className="w-12 h-12 md:w-16 md:h-16 text-white" />
                  ) : (
                    <Settings className="w-12 h-12 md:w-16 md:h-16 text-white" />
                  )}
                </button>
              </div>

              <p className="text-lg font-semibold text-foreground mb-2">
                {isCallActive ? "Call in Progress..." : vapiConfig ? "Click to Talk" : "Setup Required"}
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                {isCallActive ? "Click to end the call" : vapiConfig ? "Microphone permission required" : "Configure your website first"}
              </p>

              {/* Suggested Questions */}
              <div className="w-full">
                <p className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Try asking:
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {suggestedQuestions.map((question, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full bg-secondary text-sm text-foreground hover:bg-[#2563EB]/10 transition-colors cursor-pointer"
                    >
                      "{question}"
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-4 max-w-3xl mx-auto text-xs text-muted-foreground space-y-2">
          <button
            type="button"
            onClick={handleTestSupabase}
            className="underline underline-offset-2 hover:text-foreground"
          >
            Test Supabase connection (dev only)
          </button>
          {testMessage && <p>{testMessage}</p>}
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Set up your demo</DialogTitle>
              <DialogDescription>
                Enter your company website and language. We&apos;ll create a custom voice agent from your site.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {scrapeError && (
                <p className="text-sm text-destructive bg-destructive/10 rounded-md px-3 py-2">
                  {scrapeError}
                </p>
              )}
              <div className="grid gap-2">
                <Label htmlFor="website-url">Website URL</Label>
                <Input
                  id="website-url"
                  type="url"
                  placeholder="https://yourcompany.com"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  disabled={isScraping}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="language">Language</Label>
                <Select
                  value={language}
                  onValueChange={(v) => setLanguage(v as "en" | "nl")}
                  disabled={isScraping}
                >
                  <SelectTrigger id="language" className="w-full">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map(({ value, label }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isScraping}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={!websiteUrl.trim() || isScraping}
              >
                {isScraping ? "Scraping…" : "OK"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="mt-8 text-center">
          <p className="text-lg text-muted-foreground flex items-center justify-center gap-2">
            <span className="text-2xl">👆</span>
            This is what YOUR visitors would experience—except in YOUR voice,
            answering YOUR questions, 24/7.
          </p>
        </div>
      </div>
    </section>
  );
}
