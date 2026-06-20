"use client";

import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Vapi from "@vapi-ai/web";
import { SCRIPTED_QUESTIONS, type ScriptedQuestion } from "@/lib/isla/scripted-questions";
import { present } from "@/lib/isla/presenter-store";
import { setPanelOpen } from "@/lib/isla/panel-store";
import { ChatMeetingBooker } from "@/components/isla/chat-meeting-booker";

// Show only a couple of example chips — they hint at the kind of questions a
// visitor can ask; the classifier handles anything they actually type/say.
const EXAMPLE_QUESTIONS = SCRIPTED_QUESTIONS.filter((q) =>
  ["meetings-forms", "slack-overview"].includes(q.id)
);

interface ChatMessage {
  role: "user" | "isla";
  text?: string;
  // True once a voice transcript bubble is finalized (used to merge streaming
  // partials and absorb Vapi's duplicate/overlapping transcript deliveries).
  final?: boolean;
  // Interactive in-chat widgets
  kind?: "meeting-offer" | "confirmed";
  meta?: { day?: string; time?: string };
}

export function FloatingVoiceWidget() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [meetingBooked, setMeetingBooked] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const vapiRef = useRef<Vapi | null>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const lastPresentedRef = useRef<string | null>(null);

  // Don't show on hotels, strategence, chiro, navank, or isla pages
  if (pathname === '/hotels' || pathname === '/strategence' || pathname === '/steel' || pathname.startsWith('/chiro') || pathname.startsWith('/navank') || pathname.startsWith('/isla')) {
    return null;
  }

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_VAPI_API_KEY;
    if (apiKey) {
      vapiRef.current = new Vapi(apiKey);
      
      vapiRef.current.on('call-start', () => {
        console.log('📞 VAPI call started');
        setIsCallActive(true);
        setError(null);
      });

      vapiRef.current.on('call-end', () => {
        console.log('📞 VAPI call ended');
        setIsCallActive(false);
        setIsListening(false);
      });

      vapiRef.current.on('speech-start', () => setIsListening(true));
      vapiRef.current.on('speech-end', () => setIsListening(false));

      // Live transcript: render in the same chat as text mode, and drive the
      // on-screen section from each final USER utterance (Option A).
      vapiRef.current.on('message', (message: any) => {
        if (message.type !== 'transcript' || !message.transcript) return;
        const role: ChatMessage['role'] =
          message.role === 'assistant' ? 'isla' : 'user';
        const text = message.transcript.trim();
        const isFinal = message.transcriptType === 'final';
        if (!text) return;

        setMessages((prev) => {
          const last = prev[prev.length - 1];
          const sameSpeakerBubble =
            last && last.role === role && last.kind === undefined && last.text !== undefined;
          // Merge into the current bubble when the speaker is still on the same
          // utterance: while it's streaming, or when Vapi re-delivers the same
          // text / a longer revision of it (its transcripts often overlap).
          if (
            sameSpeakerBubble &&
            (!last!.final ||
              text === last!.text ||
              text.startsWith(last!.text!) ||
              last!.text!.startsWith(text))
          ) {
            if (text === last!.text && (last!.final ?? false) === isFinal) return prev;
            return [...prev.slice(0, -1), { role, text, final: isFinal }];
          }
          return [...prev, { role, text, final: isFinal }];
        });

        // Drive the screen once per finalized user utterance (skip duplicates).
        if (role === 'user' && isFinal && text !== lastPresentedRef.current) {
          lastPresentedRef.current = text;
          presentFromUtterance(text);
        }
      });

      vapiRef.current.on('error', (error: any) => {
        console.error('❌ VAPI call error:', error);
        setError(`Call error: ${error.message}`);
        setIsCallActive(false);
        setIsListening(false);
      });
    }

    return () => {
      if (vapiRef.current) {
        vapiRef.current.stop().catch(console.error);
      }
    };
  }, []);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleOpen = () => {
    setIsOpen(true);
    setPanelOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setPanelOpen(false);
    vapiRef.current?.stop().catch(() => {});
  };

  // Voice: start a Vapi call with the statically-configured Ask-Isla assistant.
  const startCall = () => {
    const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID_ASK_ISLA;
    if (!vapiRef.current || !assistantId) {
      console.error('❌ Missing NEXT_PUBLIC_VAPI_API_KEY or NEXT_PUBLIC_VAPI_ASSISTANT_ID_ASK_ISLA');
      setError('Voice is not configured yet.');
      return;
    }
    lastPresentedRef.current = null;
    vapiRef.current
      .start(assistantId)
      .catch((e) => console.error('Failed to start Ask Isla call:', e));
  };

  const endCall = () => {
    vapiRef.current?.stop().catch(() => {});
    setIsCallActive(false);
    setIsListening(false);
  };

  // Option A: route a final spoken question through the existing classifier and
  // present the matching screen (the assistant speaks the answer itself).
  const presentFromUtterance = async (text: string) => {
    try {
      const res = await fetch('/api/isla/classify-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text }),
      });
      const match = (await res.json())?.match;
      if (!match) return;
      present(match.sectionId);
      if (window.location.pathname !== match.route) {
        router.push(match.route);
      }
      // Pricing/booking: offer a demo (Yes / Not now); calendar only after Yes.
      if (match.offerMeeting) {
        setMessages((prev) => [...prev, ...offerMessages(prev, true)]);
      }
    } catch (e) {
      console.error('Voice classify failed:', e);
    }
  };

  const handleAsk = (q: ScriptedQuestion) => {
    setMessages((prev) => [
      ...prev,
      { role: "user", text: q.question },
      { role: "isla", text: q.answer },
      ...offerMessages(prev, q.offerMeeting),
    ]);
    // Present the matching section, then drive the app to the right page.
    present(q.sectionId);
    if (pathname !== q.route) {
      router.push(q.route);
    }
  };

  // Free-text question: classify it to a known topic, then answer + present.
  const handleSubmitQuestion = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const text = inputValue.trim();
    if (!text || isThinking) return;

    setInputValue("");
    setMessages((prev) => [...prev, { role: "user", text }]);
    setIsThinking(true);

    try {
      const res = await fetch("/api/isla/classify-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text }),
      });
      const data = await res.json();
      const match = data?.match;

      if (match) {
        setMessages((prev) => [
          ...prev,
          { role: "isla", text: match.answer },
          ...offerMessages(prev, match.offerMeeting),
        ]);
        present(match.sectionId);
        if (pathname !== match.route) {
          router.push(match.route);
        }
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "isla",
            text:
              "I'm focused on how Isla helps with email, meetings, offers, Slack, and pricing. Try asking about one of those — or I can set up a quick demo with our team.",
          },
        ]);
      }
    } catch (err) {
      console.error("Classify failed:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "isla",
          text:
            "Sorry — I had trouble with that just now. Mind trying again in a moment?",
        },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  // Pricing/booking: offer a demo (Yes / Not now) — never the calendar directly.
  // Guards against duplicate offers and re-offering after a booking.
  const offerMessages = (
    prev: ChatMessage[],
    offerMeeting?: boolean
  ): ChatMessage[] => {
    if (!offerMeeting || meetingBooked || showCalendar) return [];
    if (prev.some((m) => m.kind === "meeting-offer")) return [];
    return [{ role: "isla", kind: "meeting-offer" }];
  };

  const handleAcceptMeeting = () => {
    setMessages((prev) => [
      ...prev,
      { role: "user", text: "Yes, let's set one up" },
      { role: "isla", text: "Great — pick a day and time from the calendar below." },
    ]);
    setShowCalendar(true);
  };

  const handleDeclineMeeting = () => {
    setMessages((prev) => [
      ...prev,
      { role: "user", text: "Not right now" },
      { role: "isla", text: "No problem at all — whenever you're ready, just ask and I'll set it up." },
    ]);
  };

  const handleBookMeeting = (day: string, time: string) => {
    setMeetingBooked(true);
    setShowCalendar(false);
    setMessages((prev) => [
      ...prev,
      { role: "isla", kind: "confirmed", meta: { day, time } },
    ]);
    // Fire-and-forget: notify via email. UI confirmation isn't blocked on this.
    fetch("/api/isla/book-meeting", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ day, time }),
    }).catch((err) => console.error("Booking email failed:", err));
  };

  return (
    <>
      <style jsx>{`
        .voice-widget {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9999;
        }

        .voice-widget__btn {
          display: flex;
          align-items: center;
          gap: 8px;
          height: 56px;
          padding: 0 24px;
          border-radius: 28px;
          background: #544CD1;
          color: white;
          border: none;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 20px rgba(84,76,209,0.4);
        }

        .voice-widget__btn:hover {
          background: #463EC4;
          transform: scale(1.03);
          box-shadow: 0 6px 24px rgba(84,76,209,0.5);
        }

        .voice-panel {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 400px;
          max-width: 100vw;
          background: white;
          box-shadow: -8px 0 30px rgba(0,0,0,0.15);
          z-index: 9999;
          display: flex;
          flex-direction: column;
        }

        .voice-panel__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          border-bottom: 1px solid #eee;
        }

        .voice-panel__title {
          font-size: 16px;
        }

        .voice-panel__title-bold {
          font-weight: 700;
          color: #1a1a1a;
        }

        .voice-panel__title-light {
          font-weight: 400;
          color: #888;
        }

        .voice-panel__close {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: none;
          background: #f5f5f5;
          color: #1a1a1a;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .voice-panel__close:hover {
          background: #ebebeb;
        }

        .voice-panel__body {
          flex: 1;
          overflow-y: auto;
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .voice-panel__mic-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          padding: 12px 0 24px;
        }

        .voice-panel__mic-circle {
          position: relative;
          width: 88px;
          height: 88px;
          border-radius: 50%;
          border: none;
          background: #1a1a1a;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .voice-panel__mic-circle:hover {
          background: #2a2a2a;
        }

        .voice-panel__mic-pulse {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #1a1a1a;
          opacity: 0.3;
          animation: panelMicPulse 2s ease infinite;
        }

        @keyframes panelMicPulse {
          0% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 0.1; }
          100% { transform: scale(1); opacity: 0.3; }
        }

        .voice-panel__mic-caption {
          font-size: 14px;
          font-weight: 500;
          color: #1a1a1a;
        }

        .voice-panel__suggestions-label {
          font-size: 13px;
          color: #888;
          margin-bottom: 8px;
        }

        .voice-panel__suggestion {
          display: block;
          width: 100%;
          text-align: left;
          padding: 16px 0;
          border: none;
          border-top: 1px solid #f0f0f0;
          background: none;
          font-size: 14px;
          color: #1a1a1a;
          cursor: pointer;
        }

        .voice-panel__suggestion:hover {
          color: #e8553d;
        }

        .voice-panel__transcript {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .voice-panel__msg {
          max-width: 85%;
          padding: 10px 14px;
          border-radius: 14px;
          font-size: 13px;
          line-height: 1.5;
        }

        .voice-panel__msg--user {
          align-self: flex-end;
          background: #544CD1;
          color: white;
          border-bottom-right-radius: 4px;
        }

        .voice-panel__msg--isla {
          align-self: flex-start;
          background: #f3f3f5;
          color: #1a1a1a;
          border-bottom-left-radius: 4px;
        }

        .voice-panel__offer {
          display: flex;
          flex-direction: column;
          gap: 8px;
          align-self: flex-start;
          width: 100%;
        }

        .voice-panel__offer-btn {
          padding: 10px 14px;
          border-radius: 12px;
          border: 1px solid #e2e2e8;
          background: white;
          font-size: 13px;
          font-weight: 500;
          color: #1a1a1a;
          cursor: pointer;
          transition: all 0.15s;
        }

        .voice-panel__offer-btn:hover {
          border-color: #544cd1;
        }

        .voice-panel__offer-btn--yes {
          background: #544cd1;
          border-color: #544cd1;
          color: white;
        }

        .voice-panel__offer-btn--yes:hover {
          background: #463ec4;
        }

        .voice-panel__confirmed {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          background: #ecfdf3;
          border: 1px solid #b7ebcb;
          border-radius: 14px;
          padding: 12px 14px;
        }

        .voice-panel__confirmed-check {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #10b981;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          flex-shrink: 0;
        }

        .voice-panel__confirmed-title {
          font-size: 13px;
          font-weight: 600;
          color: #02524b;
        }

        .voice-panel__confirmed-sub {
          font-size: 12px;
          color: #02524b;
          opacity: 0.75;
          line-height: 1.5;
          margin-top: 2px;
        }

        .voice-panel__bottom-cluster {
          margin-top: auto;
          display: flex;
          flex-direction: column;
        }

        .voice-panel__schedule-btn {
          align-self: flex-start;
          width: auto;
          margin-top: 16px;
          padding: 10px 20px;
          border: none;
          border-radius: 20px;
          background: #1a1a1a;
          color: white;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
        }

        .voice-panel__schedule-btn:hover {
          background: #2a2a2a;
        }

        .voice-panel__typing {
          display: inline-flex;
          gap: 4px;
          align-items: center;
        }
        .voice-panel__typing span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #9a9a9a;
          display: inline-block;
          animation: isla-typing 1.2s infinite ease-in-out;
        }
        .voice-panel__typing span:nth-child(2) { animation-delay: 0.2s; }
        .voice-panel__typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes isla-typing {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }

        .voice-panel__icon-btn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        .voice-panel__calendar-dock {
          flex-shrink: 0;
          padding: 14px 24px;
          border-top: 1px solid #eee;
          background: #faf9ff;
        }

        .voice-panel__calendar-dock-label {
          font-size: 12px;
          font-weight: 600;
          color: #544cd1;
          margin-bottom: 10px;
        }

        .voice-panel__input-row {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 16px 24px;
          border-top: 1px solid #eee;
        }

        .voice-panel__input {
          flex: 1;
          border: 1px solid #e2e2e2;
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 14px;
          color: #1a1a1a;
          outline: none;
        }

        .voice-panel__input:focus {
          border-color: #1a1a1a;
        }

        .voice-panel__icon-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: none;
          background: #f5f5f5;
          color: #1a1a1a;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
        }

        .voice-panel__icon-btn:hover {
          background: #ebebeb;
        }

        .voice-panel__icon-btn--active {
          background: #e5484d;
          color: white;
          animation: isla-mic-pulse 1.4s infinite ease-in-out;
        }
        .voice-panel__icon-btn--active:hover {
          background: #d33b40;
        }
        @keyframes isla-mic-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(229,72,77,0.5); }
          50% { box-shadow: 0 0 0 6px rgba(229,72,77,0); }
        }

        .voice-panel__end-btn {
          margin-top: 14px;
          padding: 8px 18px;
          border: none;
          border-radius: 20px;
          background: #e5484d;
          color: white;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }
        .voice-panel__end-btn:hover {
          background: #d33b40;
        }

        .voice-panel__footer {
          padding: 12px 24px 16px;
          font-size: 11px;
          color: #999;
          text-align: center;
        }
      `}</style>

      {!isOpen && (
        <div className="voice-widget">
          <button
            className="voice-widget__btn"
            onClick={handleOpen}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2z"/>
              <path d="M19 14l0.9 2.6L22.5 17.5l-2.6 0.9L19 21l-0.9-2.6L15.5 17.5l2.6-0.9L19 14z"/>
            </svg>
            Ask Isla
          </button>
        </div>
      )}

      {isOpen && (
        <div className="voice-panel">
          <div className="voice-panel__header">
            <span className="voice-panel__title">
              <span className="voice-panel__title-bold">Isla</span>
              <span className="voice-panel__title-light"> · AI SDR Agent</span>
            </span>
            <button className="voice-panel__close" onClick={handleClose}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          <div className="voice-panel__body">
            {messages.length === 0 ? (
              <div className="voice-panel__mic-wrap">
                <button
                  className="voice-panel__mic-circle"
                  onClick={isCallActive ? endCall : startCall}
                >
                  <span className="voice-panel__mic-pulse"></span>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                    <line x1="12" y1="19" x2="12" y2="23"/>
                  </svg>
                </button>
                <span className="voice-panel__mic-caption">
                  {error
                    ? error
                    : isCallActive
                    ? isListening
                      ? "Listening…"
                      : "Speaking…"
                    : "Speak with Isla"}
                </span>
                {isCallActive && (
                  <button className="voice-panel__end-btn" onClick={endCall}>
                    End call
                  </button>
                )}
              </div>
            ) : (
              <div className="voice-panel__transcript">
                {messages.map((m, i) => {
                  if (m.kind === "meeting-offer") {
                    return showCalendar || meetingBooked ? null : (
                      <div key={i} className="voice-panel__offer">
                        <button
                          className="voice-panel__offer-btn voice-panel__offer-btn--yes"
                          onClick={handleAcceptMeeting}
                        >
                          Yes, let's set one up
                        </button>
                        <button
                          className="voice-panel__offer-btn"
                          onClick={handleDeclineMeeting}
                        >
                          Not right now
                        </button>
                      </div>
                    );
                  }
                  if (m.kind === "confirmed") {
                    return (
                      <div key={i} className="voice-panel__confirmed">
                        <div className="voice-panel__confirmed-check">✓</div>
                        <div>
                          <div className="voice-panel__confirmed-title">You're all set!</div>
                          <div className="voice-panel__confirmed-sub">
                            {m.meta?.day} at {m.meta?.time} with our sales team. A calendar
                            invite is on its way to your inbox.
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div
                      key={i}
                      className={`voice-panel__msg voice-panel__msg--${m.role}`}
                    >
                      {m.text}
                    </div>
                  );
                })}
                {isThinking && (
                  <div className="voice-panel__msg voice-panel__msg--isla voice-panel__typing">
                    <span></span><span></span><span></span>
                  </div>
                )}
                <div ref={transcriptEndRef} />
              </div>
            )}

            <div className="voice-panel__bottom-cluster">
              <div>
                <div className="voice-panel__suggestions-label">Ask me things like:</div>
                {EXAMPLE_QUESTIONS.map((q) => (
                  <button
                    key={q.id}
                    className="voice-panel__suggestion"
                    onClick={() => handleAsk(q)}
                  >
                    {q.question}
                  </button>
                ))}
              </div>

              <button className="voice-panel__schedule-btn">Schedule a Demo</button>
            </div>
          </div>

          {showCalendar && !meetingBooked && (
            <div className="voice-panel__calendar-dock">
              <div className="voice-panel__calendar-dock-label">Pick a time for your demo</div>
              <ChatMeetingBooker onConfirm={handleBookMeeting} />
            </div>
          )}

          <form className="voice-panel__input-row" onSubmit={handleSubmitQuestion}>
            <input
              type="text"
              className="voice-panel__input"
              placeholder="Ask Isla a question"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isThinking}
            />
            <button
              type="button"
              className={`voice-panel__icon-btn${isCallActive ? " voice-panel__icon-btn--active" : ""}`}
              aria-label={isCallActive ? "End call" : "Speak with Isla"}
              title={isCallActive ? "End call" : "Speak with Isla"}
              onClick={isCallActive ? endCall : startCall}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" y1="19" x2="12" y2="23"/>
              </svg>
            </button>
            <button
              type="submit"
              className="voice-panel__icon-btn"
              aria-label="Send question"
              disabled={isThinking || !inputValue.trim()}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </form>

          <div className="voice-panel__footer">
            By continuing, you agree this conversation may be recorded and used per our Privacy Policy.
          </div>
        </div>
      )}
    </>
  );
}
