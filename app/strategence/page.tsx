'use client';

import { useEffect, useRef, useState } from 'react';
import Vapi from '@vapi-ai/web';

export default function StrategencePage() {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const vapiInstance = useRef<any>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_VAPI_API_KEY || '';
    console.log('Initializing VAPI with key:', apiKey ? 'Key present' : 'No key');

    const vapi = new Vapi(apiKey);
    vapiInstance.current = vapi;
    console.log('VAPI instance created:', vapi);

    // Listen for call start
    vapi.on('call-start', () => {
      console.log('Call started');
      setIsCallActive(true);
      setIsLoading(false);
    });

    // Listen for call end
    vapi.on('call-end', () => {
      console.log('Call ended');
      setIsCallActive(false);
      setIsLoading(false);
    });

    // Listen for errors
    vapi.on('error', (error: any) => {
      console.error('VAPI error:', error);
      setIsLoading(false);
      setIsCallActive(false);
    });

    return () => {
      if (vapiInstance.current) {
        vapiInstance.current.stop();
      }
    };
  }, []);

  const toggleCall = async () => {
    console.log('Toggle call clicked, instance:', vapiInstance.current);

    if (!vapiInstance.current) {
      console.error('VAPI instance not initialized');
      alert('VAPI is not initialized yet. Please wait a moment and try again.');
      return;
    }

    if (isCallActive) {
      // End call
      console.log('Stopping call');
      vapiInstance.current.stop();
    } else {
      // Start call
      console.log('Starting call with assistant ID: 6755023d-1c8e-4bf0-840d-b5dcecccec67');
      setIsLoading(true);
      try {
        await vapiInstance.current.start('6755023d-1c8e-4bf0-840d-b5dcecccec67');
        console.log('Call start initiated');
      } catch (error) {
        console.error('Error starting call:', error);
        alert('Error starting call: ' + (error as Error).message);
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="text-center flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Strategence
        </h1>
        <p className="text-xl text-gray-300 mb-12">
          AI Voice Assistant Demo
        </p>

        <button
          onClick={toggleCall}
          disabled={isLoading}
          className={`
            group relative w-32 h-32 rounded-full flex items-center justify-center
            transition-all duration-300 transform hover:scale-110
            ${isCallActive
              ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/50'
              : 'bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-500/50'
            }
            ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          {isLoading ? (
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
          ) : isCallActive ? (
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
          )}

          {/* Pulse animation when active */}
          {isCallActive && (
            <>
              <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75" />
              <span className="absolute inset-0 rounded-full bg-red-500 animate-pulse" />
            </>
          )}
        </button>

        <p className="mt-12 text-gray-400 text-sm">
          {isCallActive
            ? 'Call in progress - Click to end'
            : 'Click the microphone to start talking'
          }
        </p>
      </div>
    </div>
  );
}
