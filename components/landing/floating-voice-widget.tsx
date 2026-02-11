"use client";

import React, { useState, useEffect } from 'react';

export function FloatingVoiceWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'ai', text: "Hi! I'm the CatchVisitors AI. I can answer any questions about our voice assistant — pricing, features, integrations. Just click the mic to talk." }
  ]);
  const [waveformActive, setWaveformActive] = useState(false);

  const aiResponses = [
    "CatchVisitors places an AI voice assistant on your website. Visitors click the widget, have a natural conversation, and get booked into your calendar. All automatically.",
    "Our pricing is simple: $497 setup plus $197/month. This includes everything you need - the AI assistant, calendar integration, and ongoing support.",
    "We integrate with all major calendar platforms: Google Calendar, Outlook, Calendly, and more. Setup takes just 5 minutes.",
    "The AI speaks multiple languages and can handle complex legal questions about employment law, case evaluation, and consultation booking."
  ];

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  const toggleMic = () => {
    setIsListening(!isListening);
    setWaveformActive(!waveformActive);
    
    if (!isListening) {
      // Simulate listening for 3 seconds, then respond
      setTimeout(() => {
        setIsListening(false);
        setWaveformActive(false);
        
        // Add a random AI response
        const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
        setMessages(prev => [...prev, { type: 'ai', text: randomResponse }]);
      }, 3000);
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

        .voice-widget__panel {
          position: absolute;
          bottom: 80px;
          right: 0;
          width: 380px;
          background: white;
          border: 1px solid #e8e8e8;
          border-radius: 20px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.08);
          overflow: hidden;
          transform-origin: bottom right;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          opacity: 0;
          transform: scale(0.9) translateY(20px);
          pointer-events: none;
        }

        .voice-widget__panel.open {
          opacity: 1;
          transform: scale(1) translateY(0);
          pointer-events: auto;
        }

        .wp__header {
          padding: 20px 24px 16px;
          border-bottom: 1px solid #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .wp__title {
          font-family: var(--font-serif);
          font-size: 18px;
          font-weight: 400;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .wp__status {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #16a34a;
        }

        .wp__close {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: none;
          background: #f8f8f8;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .wp__close:hover {
          background: #e8e8e8;
        }

        .wp__body {
          padding: 20px 24px;
          max-height: 300px;
          overflow-y: auto;
        }

        .wp__msg {
          font-size: 14px;
          color: #6b6b6b;
          padding: 12px 16px;
          background: #fafafa;
          border-radius: 12px;
          margin-bottom: 12px;
          line-height: 1.5;
          animation: msgIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes msgIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .wp__waveform {
          display: none;
          align-items: center;
          justify-content: center;
          gap: 3px;
          height: 24px;
          margin: 16px 24px;
        }

        .wp__waveform.active {
          display: flex;
        }

        .wp__waveform span {
          width: 3px;
          height: 8px;
          background: #e8553d;
          border-radius: 2px;
          animation: wave 0.8s ease-in-out infinite;
        }

        .wp__waveform span:nth-child(2) { animation-delay: 0.1s; }
        .wp__waveform span:nth-child(3) { animation-delay: 0.2s; }
        .wp__waveform span:nth-child(4) { animation-delay: 0.3s; }
        .wp__waveform span:nth-child(5) { animation-delay: 0.4s; }

        @keyframes wave {
          0%, 100% { height: 8px; }
          50% { height: 24px; }
        }

        .wp__footer {
          padding: 20px 24px;
          border-top: 1px solid #f0f0f0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .wp__mic {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: #1a1a1a;
          color: white;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .wp__mic:hover {
          transform: scale(1.06);
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }

        .wp__mic.listening {
          background: #e8553d;
          animation: micPulse 1.5s ease infinite;
        }

        @keyframes micPulse {
          0% { box-shadow: 0 0 0 0 rgba(232,85,61,0.3); }
          70% { box-shadow: 0 0 0 14px rgba(232,85,61,0); }
          100% { box-shadow: 0 0 0 0 rgba(232,85,61,0); }
        }

        .wp__hint {
          font-size: 12px;
          color: #a0a0a0;
          text-align: center;
        }

        .voice-widget__btn {
          position: relative;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: #1a1a1a;
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
      `}</style>

      <div className="voice-widget">
        <div className={`voice-widget__panel ${isOpen ? 'open' : ''}`}>
          <div className="wp__header">
            <div className="wp__title">
              <div style={{ width: '24px', height: '24px', background: '#1a1a1a', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px' }}>CV</div>
              CatchVisitors AI
            </div>
            <div className="wp__status">
              <div style={{ width: '6px', height: '6px', background: '#16a34a', borderRadius: '50%' }}></div>
              Online
            </div>
            <button className="wp__close" onClick={toggleWidget}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          <div className="wp__body">
            {messages.map((msg, index) => (
              <div key={index} className="wp__msg">
                {msg.text}
              </div>
            ))}
          </div>
          <div className={`wp__waveform ${waveformActive ? 'active' : ''}`}>
            <span></span><span></span><span></span><span></span><span></span>
          </div>
          <div className="wp__footer">
            <button 
              className={`wp__mic ${isListening ? 'listening' : ''}`} 
              onClick={toggleMic}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" y1="19" x2="12" y2="23"/>
              </svg>
            </button>
            <span className="wp__hint">Click the mic to start a conversation</span>
          </div>
        </div>
        <button className="voice-widget__btn" onClick={toggleWidget}>
          {!isOpen && <span className="voice-widget__pulse"></span>}
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
