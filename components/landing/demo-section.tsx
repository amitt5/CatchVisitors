"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Vapi from "@vapi-ai/web";
import { Mic, Globe, X } from "lucide-react";

const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "nl", label: "Dutch" },
  { value: "de", label: "German" },
] as const;

const demoResponses = [
  "I'd be happy to help! I can answer questions about the services offered, provide information about availability, and help you book an appointment.",
  "Consultations are typically 30 minutes. I see availability tomorrow at 10 AM and 2 PM. Would you like me to book one?",
  "Great, I've reserved the 2 PM slot for you. You'll receive a confirmation email shortly. Is there anything else?"
];

export function DemoSection() {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [language, setLanguage] = useState<"en" | "es" | "nl" | "de">("en");
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildError, setBuildError] = useState<string | null>(null);
  const [showDemo, setShowDemo] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isCallActive, setIsCallActive] = useState(false);
  const [demoListening, setDemoListening] = useState(false);
  const [demoMessages, setDemoMessages] = useState<string[]>([
    "Hi! I'm the AI assistant for your website. Click the microphone to start a conversation."
  ]);
  const [demoResponseIndex, setDemoResponseIndex] = useState(0);
  const vapiRef = useRef<Vapi | null>(null);

  const steps = [
    "Scraping your website…",
    "Analyzing content & services…",
    "Building your voice assistant…",
    "Initializing conversation engine…"
  ];

  const handleBuild = async () => {
    const url = websiteUrl.trim();
    if (!url) return;

    console.log('🚀 Starting demo build process...');
    console.log('📝 Input data:', { url, language });

    setIsBuilding(true);
    setBuildError(null);
    setShowDemo(false);
    setCurrentStep(0);

    try {
      // Simulate step progress
      for (let i = 0; i < steps.length; i++) {
        setCurrentStep(i);
        console.log(`📊 Step ${i + 1}/${steps.length}: ${steps[i]}`);
        await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1500));
      }

      // Call your real API
      console.log('🌐 Calling gemini-research API...');

      const geminiRes = await fetch("/api/gemini-research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, language }),
      });
      
      console.log('📡 Gemini research response status:', geminiRes.status);
      
      if (!geminiRes.ok) {
        const errorText = await geminiRes.text();
        console.error('❌ Gemini research failed:', { status: geminiRes.status, error: errorText });
        setBuildError(`Website research failed: ${errorText}`);
        return;
      }
      
      const geminiData = await geminiRes.json();
      console.log('✅ Gemini research success:', { demoId: geminiData.demoId, hasPrompt: !!geminiData.prompt });

      console.log('🎙️ Calling VAPI API...');

      const vapiRes = await fetch("/api/vapi-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          demoId: geminiData.demoId,
          prompt: geminiData.prompt
        }),
      });
      
      console.log('📡 VAPI response status:', vapiRes.status);
      
      if (!vapiRes.ok) {
        const errorText = await vapiRes.text();
        console.error('❌ VAPI setup failed:', { status: vapiRes.status, error: errorText });
        setBuildError(`VAPI setup failed: ${errorText}`);
        return;
      }
      
      const vapiData = await vapiRes.json();
      console.log('✅ VAPI setup success:', vapiData);

      // Show demo widget
      const siteName = url.replace(/^https?:\/\//, '').replace(/\/$/, '').split('.')[0];
      console.log('🎉 Showing demo widget for:', siteName);
      
      setShowDemo(true);
      setDemoMessages([`Hi! I'm the AI assistant for ${siteName}. Click the microphone to start a conversation.`]);
      setDemoResponseIndex(0);

      // Auto-start VAPI call
      try {
        console.log('🔧 Initializing VAPI...');
        
        const assistantId = language === 'nl'
          ? process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID_DUTCH
          : process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID_ENGLISH;

        console.log('🔑 Using assistant ID:', assistantId?.substring(0, 8) + '...');

        const promptRes = await fetch('/api/get-prompt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ assistantId }),
        });

        if (!promptRes.ok) {
          const errorText = await promptRes.text();
          console.error('❌ Failed to fetch prompt:', { status: promptRes.status, error: errorText });
          throw new Error(`Failed to fetch prompt: ${errorText}`);
        }

        const { prompt } = await promptRes.json();
        console.log('✅ Retrieved prompt, length:', prompt.length);
        
        const apiKey = process.env.NEXT_PUBLIC_VAPI_API_KEY;

        if (!apiKey || !assistantId) {
          console.error('❌ Missing VAPI configuration:', { 
            hasApiKey: !!apiKey, 
            hasAssistantId: !!assistantId 
          });
          throw new Error('Missing VAPI configuration');
        }

        console.log('🚀 Starting VAPI call...');
        const vapi = new Vapi(apiKey);
        vapiRef.current = vapi;

        await vapi.start(assistantId, {
          variableValues: { prompt }
        });

        console.log('✅ VAPI call started successfully');

        vapi.on('call-start', () => {
          console.log('📞 VAPI call started');
          setIsCallActive(true);
        });

        vapi.on('call-end', () => {
          console.log('📞 VAPI call ended');
          setIsCallActive(false);
          vapiRef.current = null;
        });

        vapi.on('error', (error: any) => {
          console.error('❌ VAPI call error:', error);
          setBuildError(`Call error: ${error.message}`);
          setIsCallActive(false);
          vapiRef.current = null;
        });

      } catch (vapiError) {
        console.error('💥 Failed to start VAPI call:', vapiError);
        setBuildError(`VAPI initialization failed: ${vapiError instanceof Error ? vapiError.message : 'Unknown error'}`);
      }

    } catch (error) {
      console.error('💥 Build process error:', error);
      setBuildError("Network error. Please try again.");
    } finally {
      setIsBuilding(false);
    }
  };

  const handleReset = () => {
    setShowDemo(false);
    setWebsiteUrl("");
    setBuildError(null);
    setCurrentStep(0);
    setDemoMessages(["Hi! I'm the AI assistant for your website. Click the microphone to start a conversation."]);
    setDemoResponseIndex(0);

    if (vapiRef.current) {
      vapiRef.current.stop().catch(console.error);
      vapiRef.current = null;
    }
    setIsCallActive(false);
  };

  const toggleDemoMic = () => {
    setDemoListening(!demoListening);

    if (!demoListening) {
      setTimeout(() => {
        setDemoListening(false);
        if (demoResponseIndex < demoResponses.length) {
          setDemoMessages(prev => [...prev, demoResponses[demoResponseIndex]]);
          setDemoResponseIndex(prev => prev + 1);
        }
      }, 3000);
    }
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    if (vapiRef.current) {
      vapiRef.current.stop().catch(console.error);
      vapiRef.current = null;
    }
  };

  return (
    <section id="try-it" className="py-24 md:py-32 relative overflow-hidden bg-white">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mx-auto bg-white border border-[#02524b]/10 rounded-2xl p-10 shadow-md relative z-10">
          {!isBuilding && !showDemo && (
            <div>
              <div className="flex gap-2.5 mb-6">
                <div className="flex-1 relative">
                  <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#02524b]/40" />
                  <Input
                    type="url"
                    placeholder="yourwebsite.com"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleBuild()}
                    className="pl-10 h-12 bg-[#f0f8f3] border-[#02524b]/15 focus:border-[#02524b] rounded-xl"
                  />
                </div>
                <Select value={language} onValueChange={(v: any) => setLanguage(v)}>
                  <SelectTrigger className="w-32 h-12 bg-[#f0f8f3] border-[#02524b]/15 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map(({ value, label }) => (
                      <SelectItem key={value} value={value}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  onClick={handleBuild}
                  disabled={!websiteUrl.trim()}
                  className="h-12 px-7 bg-[#02524b] hover:bg-[#023d38] text-white rounded-xl font-semibold"
                >
                  Build My Assistant
                </Button>
              </div>
              <p className="text-center text-sm text-[#02524b]/50">
                No sign-up required. Takes about 30 seconds.
              </p>
              {buildError && (
                <p className="mt-4 text-sm text-red-600 text-center">{buildError}</p>
              )}
            </div>
          )}

          {isBuilding && (
            <div className="py-8 text-center">
              <div className="flex flex-col gap-4 max-w-xs mx-auto mb-6">
                {steps.map((step, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 text-sm transition-all ${
                      i === currentStep ? 'text-[#02524b] font-medium' :
                      i < currentStep ? 'text-[#7a9e1f]' : 'text-[#02524b]/40'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      i === currentStep ? 'border-[#02524b] bg-[#02524b]' :
                      i < currentStep ? 'border-[#b5d627] bg-[#b5d627]' : 'border-[#02524b]/20'
                    }`}>
                      {i < currentStep && <span className="text-[#02524b] text-xs">✓</span>}
                      {i === currentStep && (
                        <div className="w-2.5 h-2.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      )}
                    </div>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-[#02524b]/50">
                Building assistant for {websiteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}
              </p>
            </div>
          )}

          {showDemo && (
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-[#02524b] font-medium mb-6">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Your custom assistant is ready
              </div>

              <div className="bg-[#f0f8f3] border border-[#02524b]/10 rounded-2xl p-7 max-w-sm mx-auto">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#02524b]/10">
                  <div className="w-9 h-9 rounded-full bg-[#02524b] flex items-center justify-center text-white">
                    <Mic className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-[#02524b]">Your AI Assistant</div>
                    <div className="text-xs text-[#7a9e1f] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-[#b5d627] rounded-full" />
                      Ready to talk
                    </div>
                  </div>
                </div>

                <div className="min-h-24 mb-5 space-y-2">
                  {demoMessages.map((msg, i) => (
                    <div
                      key={i}
                      className="text-sm text-[#02524b] p-2.5 bg-white rounded-lg text-left leading-relaxed"
                      style={{ animation: 'msgIn 0.4s ease' }}
                    >
                      {msg}
                    </div>
                  ))}
                </div>

                {demoListening && (
                  <div className="flex items-center justify-center gap-1 h-6 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-0.5 h-2 bg-[#f44b2a] rounded-sm"
                        style={{
                          animation: `wave 0.8s ease-in-out infinite`,
                          animationDelay: `${i * 0.1}s`
                        }}
                      />
                    ))}
                  </div>
                )}

                <button
                  onClick={isCallActive ? handleEndCall : toggleDemoMic}
                  className={`w-13 h-13 rounded-full flex items-center justify-center mx-auto transition-all ${
                    demoListening || isCallActive
                      ? 'bg-[#f44b2a] hover:scale-105'
                      : 'bg-[#02524b] hover:scale-105 hover:shadow-lg'
                  }`}
                  style={demoListening ? { animation: 'micPulse 1.5s ease infinite' } : {}}
                >
                  {isCallActive ? (
                    <X className="w-5 h-5 text-white" />
                  ) : (
                    <Mic className="w-5 h-5 text-white" />
                  )}
                </button>
                <p className="text-xs text-[#02524b]/50 mt-2.5">
                  {demoListening ? 'Listening…' : 'Click to start talking'}
                </p>
              </div>

              <div className="mt-6">
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="border-[#02524b]/20 text-[#02524b] rounded-full"
                >
                  Build Another
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes msgIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes wave {
          0%, 100% { height: 8px; }
          50% { height: 24px; }
        }
        @keyframes micPulse {
          0% { box-shadow: 0 0 0 0 rgba(244, 75, 42, 0.3); }
          70% { box-shadow: 0 0 0 14px rgba(244, 75, 42, 0); }
          100% { box-shadow: 0 0 0 0 rgba(244, 75, 42, 0); }
        }
      `}</style>
    </section>
  );
}
