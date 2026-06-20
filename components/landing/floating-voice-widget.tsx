"use client";

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Vapi from "@vapi-ai/web";

const VAPI_ASSISTANT_ID = "61ecaf11-a10e-4205-8440-611bd394ede7";

export function FloatingVoiceWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const vapiRef = useRef<Vapi | null>(null);

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
      });

      vapiRef.current.on('error', (error: any) => {
        console.error('❌ VAPI call error:', error);
        setError(`Call error: ${error.message}`);
        setIsCallActive(false);
      });
    }

    return () => {
      if (vapiRef.current) {
        vapiRef.current.stop().catch(console.error);
      }
    };
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const SUGGESTED_QUESTIONS = [
    "How do you qualify leads automatically?",
    "What makes Isla different from a chatbot?",
    "Can you share customer stories?",
  ];

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
            <div className="voice-panel__mic-wrap">
              <button className="voice-panel__mic-circle">
                <span className="voice-panel__mic-pulse"></span>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                  <line x1="12" y1="19" x2="12" y2="23"/>
                </svg>
              </button>
              <span className="voice-panel__mic-caption">Speak with Isla</span>
            </div>

            <div className="voice-panel__bottom-cluster">
              <div>
                <div className="voice-panel__suggestions-label">Ask me things like:</div>
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button key={q} className="voice-panel__suggestion">{q}</button>
                ))}
              </div>

              <button className="voice-panel__schedule-btn">Schedule a Demo</button>
            </div>
          </div>

          <div className="voice-panel__input-row">
            <input type="text" className="voice-panel__input" placeholder="Ask Isla a question" />
            <button className="voice-panel__icon-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" y1="19" x2="12" y2="23"/>
              </svg>
            </button>
            <button className="voice-panel__icon-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>

          <div className="voice-panel__footer">
            By continuing, you agree this conversation may be recorded and used per our Privacy Policy.
          </div>
        </div>
      )}
    </>
  );
}
