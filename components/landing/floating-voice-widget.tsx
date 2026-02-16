"use client";

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Vapi from "@vapi-ai/web";

const VAPI_ASSISTANT_ID = "61ecaf11-a10e-4205-8440-611bd394ede7";

export function FloatingVoiceWidget() {
  const pathname = usePathname();
  const [isCallActive, setIsCallActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const vapiRef = useRef<Vapi | null>(null);

  // Don't show on hotels page
  if (pathname === '/hotels') {
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

  const toggleCall = async () => {
    if (!vapiRef.current) {
      setError('Vapi not initialized. Please check configuration.');
      return;
    }

    if (isCallActive) {
      try {
        await vapiRef.current.stop();
      } catch (error) {
        console.error('Error stopping call:', error);
        setError('Failed to stop call');
      }
    } else {
      try {
        setError(null);
        console.log('🚀 Starting VAPI call with assistant:', VAPI_ASSISTANT_ID);
        await vapiRef.current.start(VAPI_ASSISTANT_ID);
      } catch (error) {
        console.error('Error starting call:', error);
        setError(`Failed to start call: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
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
          position: relative;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: ${isCallActive ? '#e8553d' : '#1a1a1a'};
          color: white;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }

        .voice-widget__btn:hover {
          transform: scale(1.06);
          box-shadow: 0 6px 24px rgba(0,0,0,0.2);
        }

        .voice-widget__btn.active {
          background: #e8553d;
          animation: micPulse 1.5s ease infinite;
        }

        @keyframes micPulse {
          0% { box-shadow: 0 0 0 0 rgba(232,85,61,0.3); }
          70% { box-shadow: 0 0 0 14px rgba(232,85,61,0); }
          100% { box-shadow: 0 0 0 0 rgba(232,85,61,0); }
        }

        .voice-widget__pulse {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: #e8553d;
          opacity: 0.3;
          animation: pulse 2s ease infinite;
        }

        @keyframes pulse {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.1; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
        }

        .voice-widget__label {
          position: absolute;
          right: 80px;
          top: 50%;
          transform: translateY(-50%);
          background: white;
          color: #1a1a1a;
          padding: 12px 20px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 500;
          white-space: nowrap;
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
          opacity: 1;
          transform: translateY(-50%) translateX(0);
          transition: all 0.3s;
          pointer-events: none;
        }

        .voice-widget__btn:hover .voice-widget__pulse {
          animation: none;
          opacity: 0;
        }

        .error-message {
          position: absolute;
          bottom: 80px;
          right: 0;
          font-size: 12px;
          color: #dc2626;
          text-align: center;
          padding: 8px 12px;
          background: #fef2f2;
          border-radius: 8px;
          border: 1px solid #fecaca;
          white-space: nowrap;
        }
      `}</style>

      <div className="voice-widget">
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        <button 
          className={`voice-widget__btn ${isCallActive ? 'active' : ''}`}
          onClick={toggleCall}
        >
          {!isCallActive && <span className="voice-widget__pulse"></span>}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" y1="19" x2="12" y2="23"/>
          </svg>
          <span className="voice-widget__label">Talk to our AI</span>
        </button>
      </div>
    </>
  );
}
