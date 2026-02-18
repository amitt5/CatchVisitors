'use client';

import { useState, useEffect, useRef } from 'react';
import Vapi from '@vapi-ai/web';

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

type Language = 'en' | 'nl';
type Step = 'language' | 'call';

interface ChiroVoiceBotProps {
  isOpen: boolean;
  onClose: () => void;
}

const LANG_CONFIG = {
  en: {
    assistantId: process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID_CHIRO || '',
    label: 'English',
    flag: '🇬🇧',
    subtitle: 'Ask about treatments · Book an appointment',
    placeholder: 'Ask about our treatments, pricing, or book an appointment',
    statusListening: 'Listening — go ahead and speak',
    statusSpeaking: 'AI is speaking...',
    statusConnecting: 'Connecting...',
  },
  nl: {
    assistantId: process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID_CHIRO_DUTCH || '',
    label: 'Nederlands',
    flag: '🇳🇱',
    subtitle: 'Stel vragen over behandelingen · Maak een afspraak',
    placeholder: 'Stel vragen over onze behandelingen of maak een afspraak',
    statusListening: 'Luisteren — spreek gerust',
    statusSpeaking: 'AI is aan het spreken...',
    statusConnecting: 'Verbinden...',
  },
};

export function ChiroVoiceBot({ isOpen, onClose }: ChiroVoiceBotProps) {
  const [step, setStep] = useState<Step>('language');
  const [language, setLanguage] = useState<Language | null>(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const vapiRef = useRef<Vapi | null>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY || '');
    vapiRef.current = vapi;

    vapi.on('call-start', () => { setIsCallActive(true); setIsLoading(false); });
    vapi.on('call-end', () => { setIsCallActive(false); setIsLoading(false); setIsSpeaking(false); });
    vapi.on('speech-start', () => setIsSpeaking(true));
    vapi.on('speech-end', () => setIsSpeaking(false));
    vapi.on('message', (msg: any) => {
      if (msg.type === 'transcript' && msg.transcriptType === 'final') {
        setMessages(prev => [...prev, { role: msg.role, content: msg.transcript }]);
      }
    });
    vapi.on('error', () => { setIsCallActive(false); setIsLoading(false); });

    return () => { vapi.stop(); };
  }, []);

  // Auto-scroll transcript
  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [messages]);

  // Reset + stop call when modal closes
  useEffect(() => {
    if (!isOpen) {
      if (isCallActive) vapiRef.current?.stop();
      // Small delay so the close animation finishes before resetting
      const t = setTimeout(() => {
        setStep('language');
        setLanguage(null);
        setMessages([]);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [isOpen, isCallActive]);

  async function selectLanguage(lang: Language) {
    setLanguage(lang);
    setStep('call');
    setIsLoading(true);
    setMessages([]);
    try {
      await vapiRef.current?.start(LANG_CONFIG[lang].assistantId);
    } catch {
      setIsLoading(false);
    }
  }

  async function endCall() {
    vapiRef.current?.stop();
  }

  if (!isOpen) return null;

  const config = language ? LANG_CONFIG[language] : null;
  const statusText = isLoading
    ? config?.statusConnecting
    : isSpeaking ? config?.statusSpeaking : config?.statusListening;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => { if (!isCallActive) onClose(); }}
      />

      {/* Modal card */}
      <div className="relative z-10 w-full sm:max-w-md bg-white sm:rounded-3xl rounded-t-3xl overflow-hidden shadow-2xl">

        {/* Header */}
        <div className="bg-[#45321A] px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <path d="M12 2C9 2 7 5 7 8c0 2 1 3.5 2.5 4.5L9 20h6l-.5-7.5C16 11.5 17 10 17 8c0-3-2-6-5-6z" fill="white" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-white leading-tight">
                Health4Life AI Assistant
                {config && <span className="ml-1.5 font-normal opacity-70">{config.flag}</span>}
              </div>
              <div className="text-white/60 text-xs mt-0.5">
                {config ? config.subtitle : 'Choose your language to begin'}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white flex-shrink-0"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* ── STEP 1: Language selection ────────────────────────────────── */}
        {step === 'language' && (
          <div className="px-6 py-8">
            <p className="text-center text-sm text-[#403F3F] mb-6">
              Select a language — the call will start immediately.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {(['en', 'nl'] as Language[]).map(lang => (
                <button
                  key={lang}
                  onClick={() => selectLanguage(lang)}
                  className="flex flex-col items-center gap-3 bg-[#F6F6F6] hover:bg-[#45321A]/8 border-2 border-transparent hover:border-[#45321A]/20 rounded-2xl p-6 transition-all group"
                >
                  <span className="text-4xl">{LANG_CONFIG[lang].flag}</span>
                  <span className="font-bold text-[#191919] text-sm group-hover:text-[#45321A] transition-colors">
                    {LANG_CONFIG[lang].label}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-[#403F3F]/70 font-medium">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Tap to start
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── STEP 2: Active call ───────────────────────────────────────── */}
        {step === 'call' && (
          <>
            {/* Transcript */}
            <div ref={transcriptRef} className="h-64 overflow-y-auto px-5 py-4 bg-[#F6F6F6]">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isLoading ? 'bg-[#45321A]/10' : 'bg-[#45321A]/10'}`}>
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-[#45321A] border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#45321A" strokeWidth="2">
                        <path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <p className="text-sm text-[#403F3F] max-w-[220px] leading-relaxed">
                    {isLoading ? config?.statusConnecting : config?.statusListening}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-[#45321A] text-white rounded-br-sm'
                          : 'bg-white text-[#191919] shadow-sm rounded-bl-sm'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {isSpeaking && (
                    <div className="flex justify-start">
                      <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex gap-1 items-center">
                        {[0, 150, 300].map(delay => (
                          <span
                            key={delay}
                            className="w-1.5 h-1.5 rounded-full bg-[#45321A] animate-bounce"
                            style={{ animationDelay: `${delay}ms` }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="bg-white px-6 py-6 flex flex-col items-center gap-4">
              <p className="text-xs text-[#403F3F] font-medium">{statusText}</p>
              <div className="relative flex items-center justify-center">
                {isCallActive && (
                  <>
                    <span className="absolute w-24 h-24 rounded-full bg-[#45321A]/15 animate-ping" />
                    <span className="absolute w-28 h-28 rounded-full bg-[#45321A]/8 animate-ping" style={{ animationDelay: '200ms' }} />
                  </>
                )}
                <button
                  onClick={endCall}
                  disabled={isLoading}
                  className={`relative w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all duration-300
                    ${isCallActive
                      ? 'bg-red-500 hover:bg-red-600 shadow-red-200 hover:scale-105 active:scale-95'
                      : 'bg-[#45321A]/40 cursor-not-allowed'}
                    ${isLoading ? 'bg-[#45321A]/40 cursor-not-allowed' : ''}
                  `}
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-[3px] border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="white">
                      <rect x="6" y="6" width="12" height="12" rx="2" />
                    </svg>
                  )}
                </button>
              </div>
              {isCallActive && (
                <p className="text-xs text-[#403F3F]/50">Tap the button to end the call</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
