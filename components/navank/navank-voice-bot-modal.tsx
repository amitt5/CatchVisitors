"use client";

import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Mic, MicOff, Send } from "lucide-react";
import Vapi from "@vapi-ai/web";

interface Message {
  role: "assistant" | "user";
  content: string;
}

interface NavankVoiceBotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Media sets for cable products - organized by category
const MEDIA_SETS = {
  opticalFiber: [
    {
      url: "https://www.navank.in/wp-content/uploads/2022/11/Water-Blocking-Tape-500x400.jpg",
      caption: "Water Blocking Tape — Non-conductive, Semi-conductive & PET laminated versions"
    },
    {
      url: "https://www.navank.in/wp-content/uploads/2022/11/images-1-1-500x400.jpg",
      caption: "Water Swellable Yarn — Quick absorption, high tensile strength"
    },
    {
      url: "https://www.navank.in/wp-content/uploads/2022/11/images-6-1-500x400.jpg",
      caption: "ECCS Tape — Copolymer coated steel for rodent protection"
    },
    {
      url: "https://www.navank.in/wp-content/uploads/2022/11/images-8-1-500x400.jpg",
      caption: "CJB ECCS Tape — Controlled Jacket Bond for telecom cables"
    },
    {
      url: "https://www.navank.in/wp-content/uploads/2022/11/images-11-1-500x400.jpg",
      caption: "PBT Compounds — Loose tube material for 2-24 fibers"
    },
    {
      url: "https://www.navank.in/wp-content/uploads/2022/11/500X500-12-500x400.jpg",
      caption: "LSZH Compounds — Low smoke zero halogen for FOC & LAN cables"
    }
  ],
  powerCable: [
    {
      url: "https://www.navank.in/wp-content/uploads/2022/11/XLPE-cable-500x400.jpg",
      caption: "XLPE Compound — Cross-linked polyethylene for HV & EHV cables"
    },
    {
      url: "https://www.navank.in/wp-content/uploads/2022/11/Semiconductor-Shielding-Compound-500x400.jpg",
      caption: "Semiconductive Compound — Conductor & insulation shields"
    },
    {
      url: "https://www.navank.in/wp-content/uploads/2022/11/LSZH-compound-500x400.jpg",
      caption: "LSZH Compound — Flame retardant power cable sheathing"
    },
    {
      url: "https://www.navank.in/wp-content/uploads/2022/11/PE-compound-500x400.jpg",
      caption: "PE Compound — HDPE, MDPE, LDPE & FR-HDPE for all cable types"
    },
    {
      url: "https://www.navank.in/wp-content/uploads/2022/11/images-10-2-500x400.jpg",
      caption: "Mica Tape — Fire-resistant insulation for high-temp cables"
    },
    {
      url: "https://www.navank.in/wp-content/uploads/2022/11/PVC-compound-500x400.jpg",
      caption: "PVC Compound — For low-voltage & telecom applications"
    }
  ],
  allProducts: [
    {
      url: "https://www.navank.in/wp-content/uploads/2022/11/Water-Blocking-Tape-500x400.jpg",
      caption: "Water Blocking Tape — Optical Fiber Cable"
    },
    {
      url: "https://www.navank.in/wp-content/uploads/2022/11/images-1-1-500x400.jpg",
      caption: "Water Swellable Yarn — Optical Fiber Cable"
    },
    {
      url: "https://www.navank.in/wp-content/uploads/2022/11/images-6-1-500x400.jpg",
      caption: "ECCS Tape — Optical Fiber Cable"
    },
    {
      url: "https://www.navank.in/wp-content/uploads/2022/11/XLPE-cable-500x400.jpg",
      caption: "XLPE Compound — Power Cable"
    },
    {
      url: "https://www.navank.in/wp-content/uploads/2022/11/Semiconductor-Shielding-Compound-500x400.jpg",
      caption: "Semiconductive Compound — Power Cable"
    },
    {
      url: "https://www.navank.in/wp-content/uploads/2022/11/images-10-2-500x400.jpg",
      caption: "Mica Tape — Power Cable"
    }
  ]
};

export function NavankVoiceBotModal({ isOpen, onClose }: NavankVoiceBotModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [mode, setMode] = useState<'initial' | 'voice' | 'text'>('initial');
  const [isCallActive, setIsCallActive] = useState(false);
  const [currentMedia, setCurrentMedia] = useState<typeof MEDIA_SETS.opticalFiber | null>(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [chatId, setChatId] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  const vapiRef = useRef<Vapi | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Keyboard shortcuts for demo control
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      // Only trigger if not typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch(e.key) {
        case '1':
          setCurrentMedia(MEDIA_SETS.opticalFiber);
          setCurrentMediaIndex(0);
          break;
        case '2':
          setCurrentMedia(MEDIA_SETS.powerCable);
          setCurrentMediaIndex(0);
          break;
        case '3':
          setCurrentMedia(MEDIA_SETS.allProducts);
          setCurrentMediaIndex(0);
          break;
        case 'ArrowLeft':
          // Navigate to previous image
          if (currentMedia && currentMedia.length > 0) {
            setCurrentMediaIndex((prev) => (prev - 1 + currentMedia.length) % currentMedia.length);
          }
          break;
        case 'ArrowRight':
          // Navigate to next image
          if (currentMedia && currentMedia.length > 0) {
            setCurrentMediaIndex((prev) => (prev + 1) % currentMedia.length);
          }
          break;
        case 'h':
        case 'H':
          setCurrentMedia(null);
          break;
        case 'Escape':
          setCurrentMedia(null);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, currentMedia]);

  // Initialize Vapi
  useEffect(() => {
    if (!isOpen) return;

    const apiKey = process.env.NEXT_PUBLIC_VAPI_API_KEY;
    if (!apiKey) {
      console.error('Vapi API key not found');
      return;
    }

    const vapi = new Vapi(apiKey);
    vapiRef.current = vapi;

    vapi.on('call-start', () => {
      console.log('Call started');
      setIsCallActive(true);
    });

    vapi.on('call-end', () => {
      console.log('Call ended');
      setIsCallActive(false);
      setIsListening(false);
    });

    vapi.on('speech-start', () => {
      setIsListening(true);
    });

    vapi.on('speech-end', () => {
      setIsListening(false);
    });

    vapi.on('message', (message: any) => {
      console.log('Message received:', message);
      if (message.type === 'transcript' && message.transcript) {
        const role = message.role === 'assistant' ? 'assistant' : 'user';
        const newTranscript = message.transcript.trim();

        setMessages(prev => {
          const lastMessage = prev[prev.length - 1];
          const isSameRole = lastMessage && lastMessage.role === role;

          if (!isSameRole) {
            // Different role or no previous message - add new message
            return [...prev, { role, content: newTranscript }];
          }

          // Same role - check if this is a progressive update or new content
          const lastContent = lastMessage.content.trim();

          // If new transcript starts with the old content, it's a progressive update
          if (newTranscript.startsWith(lastContent)) {
            // Progressive update - replace the message
            return [
              ...prev.slice(0, -1),
              { role, content: newTranscript }
            ];
          }

          // If old content starts with new transcript, keep the longer one (old)
          if (lastContent.startsWith(newTranscript)) {
            return prev;
          }

          // Completely different content - append as continuation
          return [
            ...prev.slice(0, -1),
            { role, content: lastContent + ' ' + newTranscript }
          ];
        });
      }
    });

    vapi.on('error', (error: any) => {
      console.error('Vapi error:', error);
    });

    return () => {
      vapi.stop().catch(console.error);
    };
  }, [isOpen]);

  const toggleCall = async () => {
    if (!vapiRef.current) return;

    if (isCallActive) {
      await vapiRef.current.stop();
      setIsCallActive(false);
    } else {
      try {
        // Use Navank assistant ID or fallback to main assistant
        const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID_NAVANK || process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || "61ecaf11-a10e-4205-8440-611bd394ede7";
        await vapiRef.current.start(assistantId);
        setMode('voice'); // Switch to voice mode when call starts
      } catch (error) {
        console.error('Failed to start call:', error);
      }
    }
  };

  const handleClose = () => {
    if (vapiRef.current && isCallActive) {
      vapiRef.current.stop().catch(console.error);
    }
    onClose();
  };

  const handleSendMessage = async () => {
    if (!textInput.trim() || isSending) return;

    const userMessage = textInput.trim();
    setTextInput("");
    setIsSending(true);
    setMode('text'); // Switch to text mode when first message sent

    // Add user message to chat
    setMessages(prev => [...prev, {
      role: "user",
      content: userMessage
    }]);

    try {
      // Use Vapi Chat API for text messages
      const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID_NAVANK || process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || "61ecaf11-a10e-4205-8440-611bd394ede7";

      const requestBody: any = {
        assistantId,
        input: userMessage,
      };

      // Only include previousChatId from 2nd message onwards
      if (chatId) {
        requestBody.previousChatId = chatId;
      }

      const response = await fetch('/api/vapi-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      console.log('Vapi chat response:', data);

      // Store chat ID for conversation continuity
      if (data.id) {
        setChatId(data.id);
      }

      // Add assistant's response to chat
      if (data.output && data.output.length > 0) {
        const assistantMessage = data.output[data.output.length - 1];
        setMessages(prev => [...prev, {
          role: "assistant",
          content: assistantMessage.content
        }]);

        // Save chat session to database
        try {
          await fetch('/api/chat-sessions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: data.id,
              assistantId: data.assistantId,
              orgId: data.orgId,
              messages: data.messages,
              cost: data.cost,
              costs: data.costs,
              createdAt: data.createdAt,
              updatedAt: data.updatedAt,
            }),
          });
          console.log('Chat session saved to database');
        } catch (dbError) {
          console.error('Error saving chat session to database:', dbError);
          // Don't throw - we don't want to break the chat if DB save fails
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Sorry, I'm having trouble connecting. Please try again or use the microphone for voice chat."
      }]);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="!max-w-[90vw] w-[90vw] h-[90vh] p-0 gap-0 overflow-hidden flex flex-col bg-[#0a0a0f] border-[#4a6fa5]" showCloseButton={false}>
        <DialogTitle className="sr-only">Navank AI Product Assistant</DialogTitle>
        <div className="flex h-full overflow-hidden">
          {/* Left: Chat Interface */}
          <div className="flex-1 flex flex-col border-r border-white/10 min-h-0 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/10 bg-[#0a0a0f] flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4a6fa5] to-[#3a5585] flex items-center justify-center text-white">
                  <Mic className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Navank AI Assistant</h3>
                  <div className="flex items-center gap-2 text-xs">
                    <span className={`w-2 h-2 rounded-full ${isCallActive ? 'bg-green-500' : 'bg-gray-500'}`} />
                    <span className="text-gray-400">
                      {isCallActive ? 'Connected' : 'Click microphone to start'}
                    </span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={handleClose} className="text-white hover:text-[#4a6fa5]">
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Main Content Area */}
            {mode === 'initial' ? (
              /* Initial State - Show Both Options */
              <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[#0a0a0f]">
                <style jsx>{`
                  @keyframes pulseNavank {
                    0%, 100% {
                      background: linear-gradient(135deg, rgb(74 111 165) 0%, rgb(58 85 133) 100%);
                      transform: scale(1);
                    }
                    50% {
                      background: linear-gradient(135deg, rgb(94 141 205) 0%, rgb(74 111 165) 100%);
                      transform: scale(1.05);
                    }
                  }
                  .pulse-navank {
                    animation: pulseNavank 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                  }
                `}</style>
                <button
                  onClick={toggleCall}
                  className="w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-lg pulse-navank"
                >
                  <Mic className="w-12 h-12 text-white" />
                </button>
                <p className="text-base font-medium text-gray-300 mt-4">
                  Start Voice Conversation
                </p>

                {/* Text Chat Alternative */}
                <div className="w-full max-w-md mt-16">
                  <div className="flex items-center gap-3">
                    <Input
                      type="text"
                      placeholder="Or type your message here..."
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      disabled={isSending}
                      className="flex-1 h-12 bg-[#1a1a1f] border-white/10 text-white placeholder:text-gray-500"
                    />
                    <Button
                      size="lg"
                      onClick={handleSendMessage}
                      disabled={!textInput.trim() || isSending}
                      className="h-12 px-5 bg-[#4a6fa5] hover:bg-[#3a5585]"
                    >
                      {isSending ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                    </Button>
                  </div>
                  <div className="text-center text-xs text-gray-500 mt-3">
                    <p>Demo controls: 1=Optical Fiber, 2=Power Cable, 3=All Products, ←/→=Navigate, H=Hide</p>
                  </div>
                </div>
              </div>
            ) : mode === 'voice' ? (
              /* Voice Mode - Show Only Voice Controls */
              <div className="flex-1 flex flex-col min-h-0 bg-[#0a0a0f]">
                <style jsx>{`
                  @keyframes pulseRed {
                    0%, 100% {
                      background: linear-gradient(135deg, rgb(239 68 68) 0%, rgb(220 38 38) 100%);
                      transform: scale(1);
                    }
                    50% {
                      background: linear-gradient(135deg, rgb(248 113 113) 0%, rgb(239 68 68) 100%);
                      transform: scale(1.05);
                    }
                  }
                  .pulse-red {
                    animation: pulseRed 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                  }
                `}</style>
                {/* Messages/Transcription */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-0">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                          msg.role === 'user'
                            ? 'bg-[#4a6fa5] text-white rounded-br-sm'
                            : 'bg-white/10 text-gray-100 rounded-bl-sm'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                  {isListening && (
                    <div className="flex justify-start">
                      <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-bl-sm">
                        <div className="flex items-center gap-1">
                          {[...Array(3)].map((_, i) => (
                            <div
                              key={i}
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: `${i * 0.15}s` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Voice Controls Only */}
                <div className="px-6 py-8 border-t border-white/10 bg-[#0a0a0f] flex-shrink-0 flex flex-col items-center">
                  <button
                    onClick={toggleCall}
                    className={`w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-lg ${
                      isCallActive
                        ? 'pulse-red'
                        : 'bg-gradient-to-br from-[#4a6fa5] to-[#3a5585] hover:from-[#3a5585] hover:to-[#2a4565]'
                    }`}
                  >
                    {isCallActive ? (
                      <MicOff className="w-12 h-12 text-white" />
                    ) : (
                      <Mic className="w-12 h-12 text-white" />
                    )}
                  </button>
                  <p className="text-base font-medium text-gray-300 mt-4">
                    {isCallActive ? 'End Voice Call' : 'Start Voice Call'}
                  </p>
                  <div className="text-center text-xs text-gray-500 mt-4">
                    <p>Demo controls: 1=Optical Fiber, 2=Power Cable, 3=All Products, ←/→=Navigate, H=Hide</p>
                  </div>
                </div>
              </div>
            ) : (
              /* Text Mode - Show Only Text Chat */
              <div className="flex-1 flex flex-col min-h-0 bg-[#0a0a0f]">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-0">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                          msg.role === 'user'
                            ? 'bg-[#4a6fa5] text-white rounded-br-sm'
                            : 'bg-white/10 text-gray-100 rounded-bl-sm'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Text Input Only - No Voice Button */}
                <div className="px-6 py-4 border-t border-white/10 bg-[#0a0a0f] flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <Input
                      type="text"
                      placeholder="Type your message..."
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      disabled={isSending}
                      className="flex-1 h-12 bg-[#1a1a1f] border-white/10 text-white placeholder:text-gray-500"
                    />
                    <Button
                      size="lg"
                      onClick={handleSendMessage}
                      disabled={!textInput.trim() || isSending}
                      className="h-12 px-6 bg-[#4a6fa5] hover:bg-[#3a5585]"
                    >
                      {isSending ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                    </Button>
                  </div>
                  <div className="text-center text-xs text-gray-500 mt-3">
                    <p>Demo controls: 1=Optical Fiber, 2=Power Cable, 3=All Products, ←/→=Navigate, H=Hide</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Media Display */}
          <div className="w-[55%] bg-[#0a0a0f] flex items-center justify-center p-6">
            {currentMedia && currentMedia.length > 0 ? (
              <div className="relative w-full h-full">
                <img
                  src={currentMedia[currentMediaIndex].url}
                  alt={currentMedia[currentMediaIndex].caption}
                  className="w-full h-full object-contain rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                  <p className="text-white text-lg font-medium">
                    {currentMedia[currentMediaIndex].caption}
                  </p>
                  <div className="flex gap-2 mt-3">
                    {currentMedia.map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-1 rounded-full transition-all ${
                          idx === currentMediaIndex
                            ? 'bg-[#4a6fa5] w-8'
                            : 'bg-white/40 w-6'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-white/60">
                <svg className="w-16 h-16 mx-auto mb-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm">Product images will appear here during conversation</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
