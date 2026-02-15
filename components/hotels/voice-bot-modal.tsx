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
  const [messages, setMessages] = useState<Message[]>([]);
  const [mode, setMode] = useState<'initial' | 'voice' | 'text'>('initial');
  const [isCallActive, setIsCallActive] = useState(false);
  const [currentMedia, setCurrentMedia] = useState<typeof MEDIA_SETS.attractions | null>(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [checkoutDate, setCheckoutDate] = useState<Date | undefined>(undefined);
  const [isListening, setIsListening] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [chatId, setChatId] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [bookingStep, setBookingStep] = useState<'calendar' | 'room' | 'payment' | 'confirmation'>('calendar');
  const [selectedRoom, setSelectedRoom] = useState<{name: string; price: number; image: string} | null>(null);

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
          setBookingStep('calendar');
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
        // Use your hotel demo assistant ID
        const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID_HOTEL || "61ecaf11-a10e-4205-8440-611bd394ede7";
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
      const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID_HOTEL || "61ecaf11-a10e-4205-8440-611bd394ede7";

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
      <DialogContent className="!max-w-[90vw] w-[90vw] h-[90vh] p-0 gap-0 overflow-hidden flex flex-col" showCloseButton={false}>
        <DialogTitle className="sr-only">Hotel Voice Concierge</DialogTitle>
        <div className="flex h-full overflow-hidden">
          {/* Left: Chat Interface */}
          <div className="flex-1 flex flex-col border-r min-h-0 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b bg-gray-50 flex items-center justify-between flex-shrink-0">
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

            {/* Main Content Area */}
            {mode === 'initial' ? (
              /* Initial State - Show Both Options */
              <div className="flex-1 flex flex-col items-center justify-center p-6">
                <style jsx>{`
                  @keyframes pulseBlue {
                    0%, 100% {
                      background: linear-gradient(135deg, rgb(59 130 246) 0%, rgb(37 99 235) 100%);
                      transform: scale(1);
                    }
                    50% {
                      background: linear-gradient(135deg, rgb(96 165 250) 0%, rgb(59 130 246) 100%);
                      transform: scale(1.05);
                    }
                  }
                  .pulse-blue {
                    animation: pulseBlue 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                  }
                `}</style>
                <button
                  onClick={toggleCall}
                  className="w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-lg pulse-blue"
                >
                  <Mic className="w-12 h-12 text-white" />
                </button>
                <p className="text-base font-medium text-gray-700 mt-4">
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
                      className="flex-1 h-12 bg-white"
                    />
                    <Button
                      size="lg"
                      onClick={handleSendMessage}
                      disabled={!textInput.trim() || isSending}
                      className="h-12 px-5 bg-blue-500 hover:bg-blue-600"
                    >
                      {isSending ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                    </Button>
                  </div>
                  <div className="text-center text-xs text-gray-400 mt-3">
                    <p>Demo controls: 1=Attractions, 2=Rooms, 3=Amenities, C=Calendar, H=Hide</p>
                  </div>
                </div>
              </div>
            ) : mode === 'voice' ? (
              /* Voice Mode - Show Only Voice Controls */
              <div className="flex-1 flex flex-col min-h-0">
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

                {/* Voice Controls Only */}
                <div className="px-6 py-8 border-t bg-gray-50 flex-shrink-0 flex flex-col items-center">
                  <button
                    onClick={toggleCall}
                    className={`w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-lg ${
                      isCallActive
                        ? 'pulse-red'
                        : 'bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                    }`}
                  >
                    {isCallActive ? (
                      <MicOff className="w-12 h-12 text-white" />
                    ) : (
                      <Mic className="w-12 h-12 text-white" />
                    )}
                  </button>
                  <p className="text-base font-medium text-gray-700 mt-4">
                    {isCallActive ? 'End Voice Call' : 'Start Voice Call'}
                  </p>
                  <div className="text-center text-xs text-gray-400 mt-4">
                    <p>Demo controls: 1=Attractions, 2=Rooms, 3=Amenities, C=Calendar, H=Hide</p>
                  </div>
                </div>
              </div>
            ) : (
              /* Text Mode - Show Only Text Chat */
              <div className="flex-1 flex flex-col min-h-0">
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
                            ? 'bg-blue-500 text-white rounded-br-sm'
                            : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Text Input Only - No Voice Button */}
                <div className="px-6 py-4 border-t bg-gray-50 flex-shrink-0">
                  <div className="flex items-center gap-3">
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
                  </div>
                  <div className="text-center text-xs text-gray-400 mt-3">
                    <p>Demo controls: 1=Attractions, 2=Rooms, 3=Amenities, C=Calendar, H=Hide</p>
                  </div>
                </div>
              </div>
            )}
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
              <div className="bg-white rounded-lg p-6 max-h-full overflow-y-auto">
                {/* Step 1: Calendar */}
                {bookingStep === 'calendar' && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <CalendarIcon className="w-5 h-5" />
                      <h3 className="text-lg font-semibold">Select Your Dates</h3>
                    </div>
                    <div className="flex gap-4">
                      <div>
                        <p className="text-sm font-medium mb-2 text-center">Check-in</p>
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          className="rounded-md border"
                          disabled={(date) => date < new Date()}
                          defaultMonth={new Date(2026, 3, 1)} // April 2026
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2 text-center">Check-out</p>
                        <Calendar
                          mode="single"
                          selected={checkoutDate}
                          onSelect={setCheckoutDate}
                          className="rounded-md border"
                          disabled={(date) => !selectedDate || date <= selectedDate}
                          defaultMonth={new Date(2026, 4, 1)} // May 2026
                        />
                      </div>
                    </div>
                    {selectedDate && checkoutDate && (
                      <div className="mt-4">
                        <Button
                          className="w-full"
                          onClick={() => setBookingStep('room')}
                        >
                          Continue to Room Selection
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 2: Room Selection */}
                {bookingStep === 'room' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Choose Your Room</h3>
                    <div className="space-y-3">
                      {[
                        { name: 'Deluxe Canal View', price: 199, image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=400' },
                        { name: 'Premium Suite', price: 299, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=400' },
                        { name: 'Executive Suite', price: 399, image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=400' },
                      ].map((room) => (
                        <div
                          key={room.name}
                          className={`border rounded-lg p-3 cursor-pointer transition ${
                            selectedRoom?.name === room.name ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-400'
                          }`}
                          onClick={() => setSelectedRoom(room)}
                        >
                          <div className="flex gap-3">
                            <img src={room.image} alt={room.name} className="w-24 h-24 object-cover rounded" />
                            <div className="flex-1">
                              <h4 className="font-semibold">{room.name}</h4>
                              <p className="text-2xl font-bold mt-2">€{room.price}<span className="text-sm font-normal text-gray-500">/night</span></p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {selectedRoom && (
                      <div className="mt-4 space-y-2">
                        <div className="p-3 bg-gray-50 rounded-lg text-sm">
                          <div className="flex justify-between mb-1">
                            <span>€{selectedRoom.price} × {checkoutDate && selectedDate ? Math.ceil((checkoutDate.getTime() - selectedDate.getTime()) / (1000 * 60 * 60 * 24)) : 1} nights</span>
                            <span>€{selectedRoom.price * (checkoutDate && selectedDate ? Math.ceil((checkoutDate.getTime() - selectedDate.getTime()) / (1000 * 60 * 60 * 24)) : 1)}</span>
                          </div>
                          <div className="flex justify-between font-semibold pt-2 border-t">
                            <span>Total</span>
                            <span>€{selectedRoom.price * (checkoutDate && selectedDate ? Math.ceil((checkoutDate.getTime() - selectedDate.getTime()) / (1000 * 60 * 60 * 24)) : 1)}</span>
                          </div>
                        </div>
                        <Button
                          className="w-full"
                          onClick={() => setBookingStep('payment')}
                        >
                          Continue to Payment
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 3: Payment */}
                {bookingStep === 'payment' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">Card Number</label>
                        <Input placeholder="1234 5678 9012 3456" className="h-10" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium mb-1">Expiry</label>
                          <Input placeholder="MM/YY" className="h-10" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">CVV</label>
                          <Input placeholder="123" className="h-10" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Cardholder Name</label>
                        <Input placeholder="John Doe" className="h-10" />
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg text-sm mt-4">
                        <div className="flex justify-between font-semibold">
                          <span>Total to pay</span>
                          <span>€{selectedRoom ? selectedRoom.price * (checkoutDate && selectedDate ? Math.ceil((checkoutDate.getTime() - selectedDate.getTime()) / (1000 * 60 * 60 * 24)) : 1) : 0}</span>
                        </div>
                      </div>
                      <Button
                        className="w-full"
                        onClick={() => setBookingStep('confirmation')}
                      >
                        Confirm Booking
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 4: Confirmation */}
                {bookingStep === 'confirmation' && (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Booking Confirmed!</h3>
                    <p className="text-gray-600 mb-4">Your reservation has been successfully confirmed.</p>
                    <div className="bg-gray-50 rounded-lg p-4 text-left space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Room:</span>
                        <span className="font-medium">{selectedRoom?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Check-in:</span>
                        <span className="font-medium">{selectedDate?.toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Check-out:</span>
                        <span className="font-medium">{checkoutDate?.toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t">
                        <span className="text-gray-600">Total Paid:</span>
                        <span className="font-semibold">€{selectedRoom ? selectedRoom.price * (checkoutDate && selectedDate ? Math.ceil((checkoutDate.getTime() - selectedDate.getTime()) / (1000 * 60 * 60 * 24)) : 1) : 0}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-4">A confirmation email has been sent to your inbox.</p>
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
