"use client";

import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { X, Mic, MicOff, Calendar as CalendarIcon, Send } from "lucide-react";
import Vapi from "@vapi-ai/web";

interface Message {
  role: "assistant" | "user";
  content: string;
}

interface VoiceBotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Media sets that can be triggered via keyboard
const MEDIA_SETS = {
  attractions: [
    {
      url: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=80&w=2070",
      caption: "Rembrandt Plein - 7 min walk"
    },
    {
      url: "https://images.unsplash.com/photo-1555937949-4e0e2c8d3fd6?q=80&w=2071",
      caption: "Anne Frank Museum - 12 min walk"
    },
    {
      url: "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=2070",
      caption: "Dam Square - 10 min walk"
    }
  ],
  rooms: [
    {
      url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074",
      caption: "Deluxe Canal View Room"
    },
    {
      url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070",
      caption: "Premium Suite with Terrace"
    },
    {
      url: "https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=2074",
      caption: "Executive Suite"
    }
  ],
  amenities: [
    {
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080",
      caption: "Rooftop Breakfast Restaurant"
    },
    {
      url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070",
      caption: "Wellness & Spa"
    },
    {
      url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070",
      caption: "Canal-side Terrace"
    }
  ]
};

export function VoiceBotModal({ isOpen, onClose }: VoiceBotModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! Welcome to Hotel Amsterdam Royal. I'm your AI concierge. How may I assist you today?" }
  ]);
  const [isCallActive, setIsCallActive] = useState(false);
  const [currentMedia, setCurrentMedia] = useState<typeof MEDIA_SETS.attractions | null>(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
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

  // Slideshow effect for media
  useEffect(() => {
    if (!currentMedia || currentMedia.length === 0) return;

    const interval = setInterval(() => {
      setCurrentMediaIndex((prev) => (prev + 1) % currentMedia.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentMedia]);

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
          setCurrentMedia(MEDIA_SETS.attractions);
          setCurrentMediaIndex(0);
          break;
        case '2':
          setCurrentMedia(MEDIA_SETS.rooms);
          setCurrentMediaIndex(0);
          break;
        case '3':
          setCurrentMedia(MEDIA_SETS.amenities);
          setCurrentMediaIndex(0);
          break;
        case 'c':
        case 'C':
          setShowCalendar(true);
          setCurrentMedia(null);
          break;
        case 'h':
        case 'H':
          setCurrentMedia(null);
          setShowCalendar(false);
          break;
        case 'm':
        case 'M':
          // Simulate user message
          setMessages(prev => [...prev, {
            role: "user",
            content: "Can you show me the available rooms?"
          }]);
          break;
        case 'Escape':
          setCurrentMedia(null);
          setShowCalendar(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen]);

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
        setMessages(prev => [...prev, {
          role,
          content: message.transcript
        }]);
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
        // Use your hotel demo assistant ID
        const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || "c85624a3-e4f6-49fa-ba06-293342d10bb7";
        await vapiRef.current.start(assistantId);
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

    // Add user message to chat
    setMessages(prev => [...prev, {
      role: "user",
      content: userMessage
    }]);

    try {
      // Use Vapi Chat API for text messages
      const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || "c85624a3-e4f6-49fa-ba06-293342d10bb7";

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
      console.log('data111:', data);

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

        // Optional: Trigger media based on keywords in response
        // const content = assistantMessage.content.toLowerCase();
        // if (content.includes('room')) {
        //   setTimeout(() => setCurrentMedia(MEDIA_SETS.rooms), 500);
        // } else if (content.includes('attraction') || content.includes('nearby')) {
        //   setTimeout(() => setCurrentMedia(MEDIA_SETS.attractions), 500);
        // } else if (content.includes('book') || content.includes('reservation')) {
        //   setTimeout(() => setShowCalendar(true), 500);
        // } else if (content.includes('amenities') || content.includes('facilities')) {
        //   setTimeout(() => setCurrentMedia(MEDIA_SETS.amenities), 500);
        // }
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
      <DialogContent className="!max-w-[90vw] w-[90vw] h-[90vh] p-0 gap-0" showCloseButton={false}>
        <DialogTitle className="sr-only">Hotel Voice Concierge</DialogTitle>
        <div className="flex h-full">
          {/* Left: Chat Interface */}
          <div className="flex-1 flex flex-col border-r">
            {/* Header */}
            <div className="px-6 py-4 border-b bg-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white">
                  <Mic className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">AI Concierge</h3>
                  <div className="flex items-center gap-2 text-xs">
                    <span className={`w-2 h-2 rounded-full ${isCallActive ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <span className="text-gray-600">
                      {isCallActive ? 'Connected' : 'Click microphone to start'}
                    </span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={handleClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-blue-500 text-white rounded-br-sm'
                        : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isListening && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-sm">
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

            {/* Chat Input & Voice Control */}
            <div className="px-6 py-4 border-t bg-gray-50">
              <div className="flex items-center gap-3 mb-3">
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isSending}
                  className="flex-1 h-12 bg-white"
                />
                <Button
                  size="lg"
                  onClick={handleSendMessage}
                  disabled={!textInput.trim() || isSending}
                  className="h-12 px-6 bg-blue-500 hover:bg-blue-600"
                >
                  {isSending ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </Button>
                <Button
                  size="lg"
                  onClick={toggleCall}
                  className={`h-12 w-12 rounded-full transition-all ${
                    isCallActive
                      ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                      : 'bg-gray-900 hover:bg-gray-800'
                  }`}
                >
                  {isCallActive ? (
                    <MicOff className="w-5 h-5 text-white" />
                  ) : (
                    <Mic className="w-5 h-5 text-white" />
                  )}
                </Button>
              </div>
              <p className="text-center text-xs text-gray-500">
                Type a message or use voice • {isCallActive ? 'Voice active' : 'Click mic to talk'}
              </p>
              <div className="text-center text-xs text-gray-400 mt-1">
                <p>Demo controls: 1=Attractions, 2=Rooms, 3=Amenities, C=Calendar, H=Hide</p>
              </div>
            </div>
          </div>

          {/* Right: Media Display / Calendar */}
          <div className="w-[55%] bg-gray-900 flex items-center justify-center p-6">
            {currentMedia && currentMedia.length > 0 ? (
              <div className="relative w-full h-full">
                <img
                  src={currentMedia[currentMediaIndex].url}
                  alt={currentMedia[currentMediaIndex].caption}
                  className="w-full h-full object-cover rounded-lg"
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
                            ? 'bg-white w-8'
                            : 'bg-white/40 w-6'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : showCalendar ? (
              <div className="bg-white rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CalendarIcon className="w-5 h-5" />
                  <h3 className="text-lg font-semibold">Select Your Dates</h3>
                </div>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                  disabled={(date) => date < new Date()}
                />
                {selectedDate && (
                  <div className="mt-4">
                    <Button className="w-full">
                      Check Availability
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-white/60">
                <CalendarIcon className="w-16 h-16 mx-auto mb-4 opacity-40" />
                <p className="text-sm">Media will appear here during conversation</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
