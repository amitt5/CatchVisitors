"use client";

import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import type { DateRange } from "react-day-picker";
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

// Media sets that can be triggered via keyboard (for manual demo control)
const MEDIA_SETS = {
  attractions: [
    {
      url: "/videos/hotel-room/Rembrandt_Square.jpeg",
      caption: "Rembrandt Square — 7 min walk"
    },
    {
      url: "/videos/hotel-room/anne_frank.avif",
      caption: "Anne Frank House — 12 min walk"
    },
    {
      url: "/videos/hotel-room/rijks.jpg",
      caption: "Rijksmuseum — 15 min walk"
    }
  ],
  rooms: [
    {
      url: "https://images.eu.ctfassets.net/og3b0tarlg4b/5TTLX90ke1oNjcZgHQCb9p/bd42d41a23ae467f860a6d8227ff6b8e/room-03DLXG-image-bfwjp6-Le_Bristol_Paris-DLXG-Chambre_222-HD-4_S.jpg?w=1070&h=808&fm=jpg&fit=fill",
      caption: "Deluxe Room with Garden View — €269/night"
    },
    {
      url: "https://images.eu.ctfassets.net/og3b0tarlg4b/6mfqJ7voUNEhOa7TF4QCO1/9be0cf054fb1aefe1abf330205561d0e/room-DLXB-image-lf3ppz-Le_Bristol_Paris_-_Chambre_Deluxe_Balcon_-_916_-_HD_-_2_S.jpg?w=1070&h=808&fm=jpg&fit=fill",
      caption: "Deluxe Room with Balcony — €289/night"
    },
    {
      url: "https://images.eu.ctfassets.net/og3b0tarlg4b/7DVPIBIel2ZsaZh4043zAN/f63d257385ad9ce6b90c56314dcb2209/room-04PRE-image-Le_Bristol_Paris-Chambre_Prestige-410-HD-2_S.jpg?w=1070&h=808&fm=jpg&fit=fill",
      caption: "Prestige Room — €349/night"
    },
    {
      url: "https://images.eu.ctfassets.net/og3b0tarlg4b/3lIpWcaTAi0et539woVlh8/c4cac37f62b11166f8a2d081a0dea9ee/room-PREB-image-qq36gd-Le_Bristol_RomainRicard_03-RSC_S.jpg?w=1070&h=808&fm=jpg&fit=fill",
      caption: "Prestige Room with Balcony — €379/night"
    }
  ],
  amenities: [
    {
      url: "/videos/hotel-room/rooftop_restaurant.png",
      caption: "Rooftop terrace restaurant"
    },
    {
      url: "/videos/hotel-room/sauna.jpg",
      caption: "Spa: heated pool, sauna, steam room"
    },
    {
      url: "/videos/hotel-room/hotel_gym.jpg",
      caption: "Gym"
    }
  ]
};

// Individual media items mapped by ID for Vapi tool calls
const MEDIA_MAP: Record<string, { url: string; caption: string }[]> = {
  // Attractions
  "rembrandt-square": [{ url: "/videos/hotel-room/Rembrandt_Square.jpeg", caption: "Rembrandt Square — 7 min walk" }],
  "anne-frank-house": [{ url: "/videos/hotel-room/anne_frank.avif", caption: "Anne Frank House — 12 min walk" }],
  "rijksmuseum": [{ url: "/videos/hotel-room/rijks.jpg", caption: "Rijksmuseum — 15 min walk" }],
  // Rooms — multi-image arrays for carousel
  "deluxe-garden": [
    { url: "https://images.eu.ctfassets.net/og3b0tarlg4b/5TTLX90ke1oNjcZgHQCb9p/bd42d41a23ae467f860a6d8227ff6b8e/room-03DLXG-image-bfwjp6-Le_Bristol_Paris-DLXG-Chambre_222-HD-4_S.jpg?w=1070&h=808&fm=jpg&fit=fill", caption: "Deluxe Room with Garden View — €269/night" },
    { url: "https://images.eu.ctfassets.net/og3b0tarlg4b/5wudJWzfb5REcWjL8exDeq/a0a7e6d551b92286f52e6c9859c067f4/room-03DLXG-image-n6a5ni-Le_Bristol_Paris-DLXG-Chambre_222-HD-5_S.jpg?w=1070&h=808&fm=jpg&fit=fill", caption: "Deluxe Room with Garden View — €269/night" },
    { url: "https://images.eu.ctfassets.net/og3b0tarlg4b/HLBZs7GBDCTwoGcIkXilA/5a3929e670646e9a63eac761b1791e65/room-03DLXG-image-2jsdqn-Le_Bristol_Paris-DLXG-Chambre_222-HD-2_S.jpg?w=1070&h=808&fm=jpg&fit=fill", caption: "Deluxe Room with Garden View — €269/night" },
    { url: "https://images.eu.ctfassets.net/og3b0tarlg4b/nIUrZZR0RJ5j1ANGa94nt/0a0649303081f5ff946c141205dc860d/room-03DLXG-image-sxv4tl-Le_Bristol_Paris-DLXG-Chambre_222-HD-1_S.jpg?w=1070&h=808&fm=jpg&fit=fill", caption: "Deluxe Room with Garden View — €269/night" }
  ],
  "deluxe-balcony": [
    { url: "https://images.eu.ctfassets.net/og3b0tarlg4b/6mfqJ7voUNEhOa7TF4QCO1/9be0cf054fb1aefe1abf330205561d0e/room-DLXB-image-lf3ppz-Le_Bristol_Paris_-_Chambre_Deluxe_Balcon_-_916_-_HD_-_2_S.jpg?w=1070&h=808&fm=jpg&fit=fill", caption: "Deluxe Room with Balcony — €289/night" },
    { url: "https://images.eu.ctfassets.net/og3b0tarlg4b/5hcckP0U624pOuhD4wYNUS/22fd2e3e78b2d14cff356a4a86692675/room-DLXB-image-LBP_le_bristol_paris_-_chambre_deluxe_vue_jardin_-_916_-__S.jpg?w=1070&h=808&fm=jpg&fit=fill", caption: "Deluxe Room with Balcony — €289/night" },
    { url: "https://images.eu.ctfassets.net/og3b0tarlg4b/39VLthagr4VnawXvstjBK7/fe8e550b978585382cd1961310bfe9f3/room-DLXB-image-Le_Bristol_Paris_deluxe_room_with_balcony-room3_R.jpg?w=1070&h=808&fm=jpg&fit=fill", caption: "Deluxe Room with Balcony — €289/night" },
    { url: "https://images.eu.ctfassets.net/og3b0tarlg4b/5rb6JXrqjEvpXg78Tqa3HN/7de7eb31f566a21548ac9f299b028574/room-DLXB-image-LBP_deluxe_room_with_balcony-sdb_R.jpg?w=1070&h=808&fm=jpg&fit=fill", caption: "Deluxe Room with Balcony — €289/night" }
  ],
  "prestige-room": [
    { url: "https://images.eu.ctfassets.net/og3b0tarlg4b/7DVPIBIel2ZsaZh4043zAN/f63d257385ad9ce6b90c56314dcb2209/room-04PRE-image-Le_Bristol_Paris-Chambre_Prestige-410-HD-2_S.jpg?w=1070&h=808&fm=jpg&fit=fill", caption: "Prestige Room — €349/night" },
    { url: "https://images.eu.ctfassets.net/og3b0tarlg4b/6Pe4ZMrdqYklN8Ew8mNbGr/e5e34ef470661f26caca63341b4eb06a/room-04PRE-image-Le_Bristol_Paris-Chambre_Prestige-160-HD-3_S.jpg?w=1070&h=808&fm=jpg&fit=fill", caption: "Prestige Room — €349/night" },
    { url: "https://images.eu.ctfassets.net/og3b0tarlg4b/1NUWRn6A9bwCv3xkKFEwpJ/32a49c3630731b246aac26f2104c23ad/room-04PRE-image-LBP-chambre_prestige-160_S.jpg?w=1070&h=808&fm=jpg&fit=fill", caption: "Prestige Room — €349/night" }
  ],
  "prestige-balcony": [
    { url: "https://images.eu.ctfassets.net/og3b0tarlg4b/3lIpWcaTAi0et539woVlh8/c4cac37f62b11166f8a2d081a0dea9ee/room-PREB-image-qq36gd-Le_Bristol_RomainRicard_03-RSC_S.jpg?w=1070&h=808&fm=jpg&fit=fill", caption: "Prestige Room with Balcony — €379/night" },
    { url: "https://images.eu.ctfassets.net/og3b0tarlg4b/3gv383RHFtjjidrNezBiaO/9ba6c771fe7848b095d041c28ff6e877/room-PREB-image-on8gi-Le_Bristol_RomainRicard_02-RSC_S.jpg?w=1070&h=808&fm=jpg&fit=fill", caption: "Prestige Room with Balcony — €379/night" },
    { url: "https://images.eu.ctfassets.net/og3b0tarlg4b/36AhXoGwsKN0Opxy1Bp60p/2013bc0bad1805f6ba42d3a7a7096c17/room-PREB-image-kerbv1-Le_Bristol_RomainRicard_01-RSC_S.jpg?w=1070&h=808&fm=jpg&fit=fill", caption: "Prestige Room with Balcony — €379/night" },
    { url: "https://images.eu.ctfassets.net/og3b0tarlg4b/1sm5ekipLXFE0nuJuUpiqE/75dc3351246b1ada9d5ba2dd6a119176/room-PREB-image-7lxlt8-Le_Bristol_RomainRicard_07-RSC_S.jpg?w=1070&h=808&fm=jpg&fit=fill", caption: "Prestige Room with Balcony — €379/night" }
  ],
  // Amenities
  "rooftop": [{ url: "/videos/hotel-room/rooftop_restaurant.png", caption: "Rooftop terrace restaurant — Canal views, breakfast & evening drinks" }],
  "spa": [{ url: "/videos/hotel-room/sauna.jpg", caption: "Spa — Heated pool, sauna, steam room" }],
  "gym": [{ url: "/videos/hotel-room/hotel_gym.jpg", caption: "Gym — Stay fit during your stay" }]
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pendingMediaItems, setPendingMediaItems] = useState<string[]>([]);
  const [isInBookingMode, setIsInBookingMode] = useState(false);
  const isInBookingModeRef = useRef(false); // Immediate tracking, no async delay

  const dateRange: DateRange = { from: selectedDate, to: checkoutDate };
  const handleRangeSelect = (range: DateRange | undefined) => {
    setSelectedDate(range?.from);
    setCheckoutDate(range?.to);
  };

  // Keyword mapping for transcript matching
  const MEDIA_KEYWORDS: Record<string, string[]> = {
    // Rooms - multiple keywords to catch variations
    "deluxe-garden": ["deluxe garden", "garden view", "deluxe room", "269"],
    "deluxe-balcony": ["deluxe balcony", "balcony room", "289"],
    "prestige-room": ["prestige room", "prestige", "349"],
    "prestige-balcony": ["prestige balcony", "prestige with balcony", "379"],

    // Attractions
    "rembrandt-square": ["rembrandt", "rembrandt square"],
    "anne-frank-house": ["anne frank", "frank house"],
    "rijksmuseum": ["rijksmuseum", "rijks museum", "museum"],

    // Amenities
    "rooftop": ["rooftop", "terrace", "roof top"],
    "spa": ["spa", "pool", "sauna", "steam room"],
    "gym": ["gym", "fitness"],

    // Booking
    "calendar": ["book", "reservation", "reserve", "dates", "check-in"]
  };

  // Check if transcript mentions a specific media item
  const findMatchingMediaItem = (transcript: string, pendingItems: string[]): string | null => {
    const lowerTranscript = transcript.toLowerCase();

    for (const mediaId of pendingItems) {
      const keywords = MEDIA_KEYWORDS[mediaId] || [];
      const isMatch = keywords.some(keyword => lowerTranscript.includes(keyword));

      if (isMatch) {
        console.log(`✅ Transcript match found: "${mediaId}" (keyword detected in: "${transcript}")`);
        return mediaId;
      }
    }

    return null;
  };

  // Show a specific media item
  const showMediaItem = (mediaId: string) => {
    console.log('🖼️  Showing media item:', mediaId);
    console.log('📊 Current booking mode status:', {
      state: isInBookingMode,
      ref: isInBookingModeRef.current,
      showCalendar
    });

    // Special case: calendar
    if (mediaId === 'calendar') {
      console.log('✅ Displaying booking calendar - entering booking mode');
      setShowCalendar(true);
      setCurrentMedia(null);
      setBookingStep('calendar');
      setIsInBookingMode(true);
      isInBookingModeRef.current = true; // Set ref immediately (no async delay)
      console.log('🔒 Booking mode activated - other media will be blocked');
    } else {
      // If in booking mode, ignore all other media requests to keep calendar visible
      // Check ref first (immediate), then state (for safety)
      if (isInBookingModeRef.current || isInBookingMode) {
        console.log('🔒 BLOCKING media request:', mediaId, '- in booking mode, calendar must stay visible');
        console.log('   Booking mode ref:', isInBookingModeRef.current, '| state:', isInBookingMode);
        return;
      }

      // Check if it's an individual media item
      const mediaItems = MEDIA_MAP[mediaId];
      if (mediaItems) {
        console.log('✅ Media item found! Displaying:', mediaItems.length, 'image(s) for', mediaId);
        setCurrentMedia(mediaItems);
        setCurrentMediaIndex(0);
        setShowCalendar(false);
        console.log('🖼️  Image display state updated');
      } else {
        console.warn('⚠️  Media ID not found in MEDIA_MAP:', mediaId);
        console.log('Available media IDs:', Object.keys(MEDIA_MAP));
      }
    }
  };

  // Reset booking mode when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsInBookingMode(false);
      isInBookingModeRef.current = false; // Reset ref too
      console.log('🔓 Booking mode reset - modal opened');
    }
  }, [isOpen]);

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
      console.log('\n🏨 ===== VAPI MESSAGE RECEIVED =====');
      console.log('⏰ Timestamp:', new Date().toISOString());
      console.log('📋 Message Type:', message.type);
      console.log('📋 Message Role:', message.role);
      console.log('📦 Full Message:', JSON.stringify(message, null, 2));

      // STEP 1: Capture tool calls and store pending media items
      // Check multiple possible formats that Vapi might send

      // Format 1: Direct tool_calls in message
      if ((message.type === 'tool-calls' || message.role === 'tool_calls') && message.toolCalls) {
        console.log('🎯 TOOL CALLS DETECTED (format 1: direct toolCalls)');
        console.log('Tool calls array:', message.toolCalls);

        const mediaIds: string[] = [];
        message.toolCalls.forEach((toolCall: any) => {
          if (toolCall.function?.name === 'show_hotel_media') {
            const params = toolCall.function.arguments;
            let mediaId: string;

            // Handle both string and parsed object arguments
            if (typeof params === 'string') {
              try {
                const parsed = JSON.parse(params);
                mediaId = parsed.media_id;
              } catch (e) {
                console.error('Failed to parse tool arguments:', e);
                return;
              }
            } else {
              mediaId = params.media_id;
            }

            if (mediaId) {
              mediaIds.push(mediaId);
              console.log('📋 Adding to pending media items:', mediaId);
            }
          }
        });

        if (mediaIds.length > 0) {
          setPendingMediaItems(prev => {
            const newItems = [...prev, ...mediaIds];
            console.log('📦 Updated pending media items:', newItems);
            return newItems;
          });
        }
      }

      // Alternative format: Check if message contains toolCallList
      if (message.toolCallList && Array.isArray(message.toolCallList)) {
        console.log('🎯 TOOL CALLS DETECTED (format 2 - toolCallList)');
        console.log('Tool calls array:', message.toolCallList);

        const mediaIds: string[] = [];
        message.toolCallList.forEach((toolCall: any) => {
          if (toolCall.function?.name === 'show_hotel_media') {
            const mediaId = toolCall.function.arguments?.media_id;
            if (mediaId) {
              mediaIds.push(mediaId);
              console.log('📋 Adding to pending media items:', mediaId);
            }
          }
        });

        if (mediaIds.length > 0) {
          setPendingMediaItems(prev => {
            const newItems = [...prev, ...mediaIds];
            console.log('📦 Updated pending media items:', newItems);
            return newItems;
          });
        }
      }

      // Alternative format: Direct function call
      if (message.type === 'function-call' && message.functionCall) {
        console.log('🎯 FUNCTION CALL DETECTED (format 3)');
        console.log('Function call:', message.functionCall);
        if (message.functionCall.name === 'show_hotel_media') {
          const mediaId = message.functionCall.parameters?.media_id;
          if (mediaId) {
            console.log('📋 Adding to pending media items:', mediaId);
            setPendingMediaItems(prev => {
              const newItems = [...prev, mediaId];
              console.log('📦 Updated pending media items:', newItems);
              return newItems;
            });
          }
        }
      }

      // Format 4: conversation-update with tool_calls in conversation array
      if (message.type === 'conversation-update' && message.conversation) {
        console.log('🔍 Checking conversation-update for tool calls...');
        const mediaIds: string[] = [];

        message.conversation.forEach((item: any) => {
          if (item.tool_calls && Array.isArray(item.tool_calls)) {
            console.log('🎯 TOOL CALLS DETECTED (format 4: conversation-update)');
            item.tool_calls.forEach((toolCall: any) => {
              if (toolCall.function?.name === 'show_hotel_media') {
                const params = toolCall.function.arguments;
                let mediaId: string;

                if (typeof params === 'string') {
                  try {
                    const parsed = JSON.parse(params);
                    mediaId = parsed.media_id;
                  } catch (e) {
                    console.error('Failed to parse tool arguments:', e);
                    return;
                  }
                } else {
                  mediaId = params.media_id;
                }

                if (mediaId) {
                  mediaIds.push(mediaId);
                  console.log('📋 Found media ID in tool call:', mediaId);
                }
              }
            });
          }
        });

        if (mediaIds.length > 0) {
          setPendingMediaItems(prev => {
            // Deduplicate - only add items that aren't already in the list
            const newItems = mediaIds.filter(id => !prev.includes(id));
            if (newItems.length > 0) {
              const updated = [...prev, ...newItems];
              console.log('📦 Updated pending media items:', updated);
              return updated;
            }
            console.log('📦 No new items to add (already in pending list)');
            return prev;
          });
        }
      }

      console.log('===== END VAPI MESSAGE =====\n');

      // STEP 2: Check transcripts for keyword matches with pending items
      if (message.type === 'transcript' && message.transcript) {
        const role = message.role === 'assistant' ? 'assistant' : 'user';
        const newTranscript = message.transcript.trim();

        // If this is an assistant transcript, check for media keyword matches
        if (role === 'assistant') {
          // Use a callback to get current pending items
          setPendingMediaItems(currentPending => {
            if (currentPending.length > 0) {
              console.log('🔍 Checking transcript for keyword matches...');
              console.log('📝 Transcript:', newTranscript);
              console.log('📋 Pending items:', currentPending);

              const matchedItem = findMatchingMediaItem(newTranscript, currentPending);
              if (matchedItem) {
                console.log('🎯 MATCH FOUND! Showing:', matchedItem);
                showMediaItem(matchedItem);

                // Remove matched item and return updated list
                const updated = currentPending.filter(item => item !== matchedItem);
                console.log('📦 Remaining pending items:', updated);
                return updated;
              }
            }
            return currentPending; // No changes
          });
        }

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
    // Reset booking mode when closing
    setIsInBookingMode(false);
    isInBookingModeRef.current = false;
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
            <div className="px-6 py-4 border-b border-[#C8A96E]/20 bg-[#1C1A17] flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C8A96E]/20 border border-[#C8A96E]/40 flex items-center justify-center">
                  <Mic className="w-5 h-5 text-[#C8A96E]" />
                </div>
                <div>
                  <h3 className="font-serif text-white">AI Concierge</h3>
                  <div className="flex items-center gap-2 text-xs">
                    <span className={`w-2 h-2 rounded-full ${isCallActive ? 'bg-green-400' : 'bg-white/30'}`} />
                    <span className="text-white/50">
                      {isCallActive ? 'Connected' : 'Click microphone to start'}
                    </span>
                  </div>
                </div>
              </div>
              <button onClick={handleClose} className="text-white/40 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Content Area */}
            {mode === 'initial' ? (
              /* Initial State - Show Both Options */
              <div className="flex-1 flex flex-col items-center justify-center p-6">
                <style jsx>{`
                  @keyframes pulseGold {
                    0%, 100% {
                      background: linear-gradient(135deg, rgb(200 169 110) 0%, rgb(168 138 88) 100%);
                      transform: scale(1);
                      box-shadow: 0 0 0 0 rgba(200,169,110,0.4);
                    }
                    50% {
                      background: linear-gradient(135deg, rgb(218 190 135) 0%, rgb(200 169 110) 100%);
                      transform: scale(1.05);
                      box-shadow: 0 0 0 12px rgba(200,169,110,0);
                    }
                  }
                  .pulse-gold {
                    animation: pulseGold 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                  }
                `}</style>
                <button
                  onClick={toggleCall}
                  className="w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-lg pulse-gold"
                >
                  <Mic className="w-12 h-12 text-white" />
                </button>
                <p className="text-base font-serif text-[#1C1A17] mt-4">
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
                      className="flex-1 h-12 bg-white border-[#C8A96E]/30 focus-visible:ring-[#C8A96E]/40"
                    />
                    <Button
                      size="lg"
                      onClick={handleSendMessage}
                      disabled={!textInput.trim() || isSending}
                      className="h-12 px-5 bg-[#C8A96E] hover:bg-[#b8996a] text-white"
                    >
                      {isSending ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                    </Button>
                  </div>
                  <div className="text-center text-xs text-gray-400 mt-3">
                    <p>Demo controls: 1=Attractions, 2=Rooms, 3=Amenities, ←/→=Navigate, C=Calendar, H=Hide</p>
                  </div>
                </div>
              </div>
            ) : mode === 'voice' ? (
              /* Voice Mode - Show Only Voice Controls */
              <div className="flex-1 flex flex-col min-h-0">
                <style jsx>{`
                  @keyframes pulseActive {
                    0%, 100% {
                      background: linear-gradient(135deg, rgb(28 26 23) 0%, rgb(50 46 40) 100%);
                      transform: scale(1);
                      box-shadow: 0 0 0 0 rgba(200,169,110,0.5);
                    }
                    50% {
                      background: linear-gradient(135deg, rgb(50 46 40) 0%, rgb(28 26 23) 100%);
                      transform: scale(1.05);
                      box-shadow: 0 0 0 16px rgba(200,169,110,0);
                    }
                  }
                  .pulse-active {
                    animation: pulseActive 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                  }
                `}</style>
                {/* COMMENTED OUT: Messages/Transcription - Will be brought back later */}
                {/* <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-0">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                          msg.role === 'user'
                            ? 'bg-[#1C1A17] text-white rounded-br-sm'
                            : 'bg-[#F0EDE6] text-[#1C1A17] rounded-bl-sm'
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
                </div> */}

                {/* Voice Controls Only - Centered */}
                <div className="flex-1 flex flex-col items-center justify-center p-6">
                  <button
                    onClick={toggleCall}
                    className={`w-32 h-32 rounded-full flex items-center justify-center transition-all shadow-lg border-2 ${
                      isCallActive
                        ? 'pulse-active border-[#C8A96E]'
                        : 'bg-[#C8A96E] border-[#C8A96E] hover:bg-[#b8996a]'
                    }`}
                  >
                    {isCallActive ? (
                      <MicOff className="w-16 h-16 text-white" />
                    ) : (
                      <Mic className="w-16 h-16 text-white" />
                    )}
                  </button>
                  <p className="text-lg font-serif text-[#1C1A17] mt-6">
                    {isCallActive ? 'End Voice Call' : 'Start Voice Call'}
                  </p>
                  {/* COMMENTED OUT: Demo controls hint - Will be brought back later */}
                  {/* <div className="text-center text-xs text-gray-400 mt-4">
                    <p>Demo controls: 1=Attractions, 2=Rooms, 3=Amenities, ←/→=Navigate, C=Calendar, H=Hide</p>
                  </div> */}
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
                            ? 'bg-[#1C1A17] text-white rounded-br-sm'
                            : 'bg-[#F0EDE6] text-[#1C1A17] rounded-bl-sm'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Text Input Only - No Voice Button */}
                <div className="px-6 py-4 border-t border-[#C8A96E]/20 bg-[#FAFAF5] flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <Input
                      type="text"
                      placeholder="Type your message..."
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      disabled={isSending}
                      className="flex-1 h-12 bg-white border-[#C8A96E]/30 focus-visible:ring-[#C8A96E]/40"
                    />
                    <Button
                      size="lg"
                      onClick={handleSendMessage}
                      disabled={!textInput.trim() || isSending}
                      className="h-12 px-6 bg-[#C8A96E] hover:bg-[#b8996a] text-white"
                    >
                      {isSending ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                    </Button>
                  </div>
                  <div className="text-center text-xs text-gray-400 mt-3">
                    <p>Demo controls: 1=Attractions, 2=Rooms, 3=Amenities, ←/→=Navigate, C=Calendar, H=Hide</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Media Display / Calendar */}
          <div className="w-[55%] bg-[#1C1A17] flex items-center justify-center p-6">
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
              <div className="bg-[#FAFAF5] w-full h-full overflow-y-auto p-8">
                {/* Step 1: Calendar */}
                {bookingStep === 'calendar' && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <CalendarIcon className="w-5 h-5 text-[#C8A96E]" />
                      <h3 className="font-serif text-lg text-[#1C1A17]">Select Your Dates</h3>
                    </div>

                    {/* Date summary bar */}
                    <div className="flex items-center gap-3 mb-4 px-3 py-2 bg-[#F0EDE6] rounded-lg text-sm text-[#1C1A17]">
                      <div className="flex-1 text-center">
                        <span className="block text-[10px] uppercase tracking-wider text-[#6B6560] mb-0.5">Check-in</span>
                        <span className="font-medium">
                          {selectedDate ? selectedDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : '—'}
                        </span>
                      </div>
                      <div className="text-[#C8A96E] font-light">→</div>
                      <div className="flex-1 text-center">
                        <span className="block text-[10px] uppercase tracking-wider text-[#6B6560] mb-0.5">Check-out</span>
                        <span className="font-medium">
                          {checkoutDate ? checkoutDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : '—'}
                        </span>
                      </div>
                      {selectedDate && checkoutDate && (
                        <>
                          <div className="w-px h-8 bg-[#1C1A17]/10" />
                          <div className="text-center pr-1">
                            <span className="block text-[10px] uppercase tracking-wider text-[#6B6560] mb-0.5">Nights</span>
                            <span className="font-semibold text-[#C8A96E]">
                              {Math.ceil((checkoutDate.getTime() - selectedDate.getTime()) / (1000 * 60 * 60 * 24))}
                            </span>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Single range calendar — April + May */}
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={handleRangeSelect}
                      numberOfMonths={2}
                      defaultMonth={new Date(2026, 3, 1)}
                      disabled={(date) => date < new Date()}
                      className="rounded-md border w-full"
                      classNames={{ root: 'w-full' }}
                    />

                    {selectedDate && checkoutDate && (
                      <div className="mt-4">
                        <Button
                          className="w-full bg-[#1C1A17] hover:bg-[#2a2724] text-white"
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
                    <h3 className="font-serif text-lg text-[#1C1A17] mb-4">Choose Your Room</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        { name: 'Deluxe Room with Garden View', price: 269, image: 'https://images.eu.ctfassets.net/og3b0tarlg4b/5TTLX90ke1oNjcZgHQCb9p/bd42d41a23ae467f860a6d8227ff6b8e/room-03DLXG-image-bfwjp6-Le_Bristol_Paris-DLXG-Chambre_222-HD-4_S.jpg?w=1070&h=808&fm=jpg&fit=fill' },
                        { name: 'Deluxe Room with Balcony', price: 289, image: 'https://images.eu.ctfassets.net/og3b0tarlg4b/6mfqJ7voUNEhOa7TF4QCO1/9be0cf054fb1aefe1abf330205561d0e/room-DLXB-image-lf3ppz-Le_Bristol_Paris_-_Chambre_Deluxe_Balcon_-_916_-_HD_-_2_S.jpg?w=1070&h=808&fm=jpg&fit=fill' },
                        { name: 'Prestige Room', price: 349, image: 'https://images.eu.ctfassets.net/og3b0tarlg4b/7DVPIBIel2ZsaZh4043zAN/f63d257385ad9ce6b90c56314dcb2209/room-04PRE-image-Le_Bristol_Paris-Chambre_Prestige-410-HD-2_S.jpg?w=1070&h=808&fm=jpg&fit=fill' },
                        { name: 'Prestige Room with Balcony', price: 379, image: 'https://images.eu.ctfassets.net/og3b0tarlg4b/3lIpWcaTAi0et539woVlh8/c4cac37f62b11166f8a2d081a0dea9ee/room-PREB-image-qq36gd-Le_Bristol_RomainRicard_03-RSC_S.jpg?w=1070&h=808&fm=jpg&fit=fill' },
                      ].map((room) => (
                        <div
                          key={room.name}
                          className={`border cursor-pointer transition overflow-hidden ${
                            selectedRoom?.name === room.name
                              ? 'border-[#C8A96E] bg-[#C8A96E]/10'
                              : 'border-[#1C1A17]/10 hover:border-[#C8A96E]/50 bg-white'
                          }`}
                          onClick={() => setSelectedRoom(room)}
                        >
                          <div className="flex gap-0">
                            <img src={room.image} alt={room.name} className="w-32 h-24 object-cover flex-shrink-0" />
                            <div className="flex-1 px-4 py-3 flex items-center justify-between">
                              <h4 className="font-serif text-[#1C1A17] text-sm leading-snug">{room.name}</h4>
                              <p className="font-serif text-xl text-[#1C1A17] whitespace-nowrap ml-4">€{room.price}<span className="text-xs font-normal text-[#6B6560]">/night</span></p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {selectedRoom && (
                      <div className="mt-4 space-y-2">
                        <div className="p-3 bg-[#F0EDE6] rounded-lg text-sm text-[#1C1A17]">
                          <div className="flex justify-between mb-1">
                            <span>€{selectedRoom.price} × {checkoutDate && selectedDate ? Math.ceil((checkoutDate.getTime() - selectedDate.getTime()) / (1000 * 60 * 60 * 24)) : 1} nights</span>
                            <span>€{selectedRoom.price * (checkoutDate && selectedDate ? Math.ceil((checkoutDate.getTime() - selectedDate.getTime()) / (1000 * 60 * 60 * 24)) : 1)}</span>
                          </div>
                          <div className="flex justify-between font-semibold pt-2 border-t border-[#1C1A17]/10">
                            <span>Total</span>
                            <span>€{selectedRoom.price * (checkoutDate && selectedDate ? Math.ceil((checkoutDate.getTime() - selectedDate.getTime()) / (1000 * 60 * 60 * 24)) : 1)}</span>
                          </div>
                        </div>
                        <Button
                          className="w-full bg-[#1C1A17] hover:bg-[#2a2724] text-white"
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
                    <h3 className="font-serif text-lg text-[#1C1A17] mb-4">Payment Details</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-[#6B6560] uppercase tracking-wide mb-1">Card Number</label>
                        <Input placeholder="1234 5678 9012 3456" className="h-10 border-[#1C1A17]/20" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-[#6B6560] uppercase tracking-wide mb-1">Expiry</label>
                          <Input placeholder="MM/YY" className="h-10 border-[#1C1A17]/20" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-[#6B6560] uppercase tracking-wide mb-1">CVV</label>
                          <Input placeholder="123" className="h-10 border-[#1C1A17]/20" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#6B6560] uppercase tracking-wide mb-1">Cardholder Name</label>
                        <Input placeholder="John Doe" className="h-10 border-[#1C1A17]/20" />
                      </div>
                      <div className="p-3 bg-[#F0EDE6] rounded-lg text-sm mt-4">
                        <div className="flex justify-between font-semibold text-[#1C1A17]">
                          <span>Total to pay</span>
                          <span>€{selectedRoom ? selectedRoom.price * (checkoutDate && selectedDate ? Math.ceil((checkoutDate.getTime() - selectedDate.getTime()) / (1000 * 60 * 60 * 24)) : 1) : 0}</span>
                        </div>
                      </div>
                      <Button
                        className="w-full bg-[#C8A96E] hover:bg-[#b8996a] text-white"
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
                    <div className="w-16 h-16 bg-[#C8A96E]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-[#C8A96E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-serif text-xl text-[#1C1A17] mb-2">Booking Confirmed!</h3>
                    <p className="text-[#6B6560] text-sm mb-4">Your reservation has been successfully confirmed.</p>
                    <div className="bg-[#F0EDE6] rounded-lg p-4 text-left space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#6B6560]">Room:</span>
                        <span className="font-medium text-[#1C1A17]">{selectedRoom?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6B6560]">Check-in:</span>
                        <span className="font-medium text-[#1C1A17]">{selectedDate?.toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6B6560]">Check-out:</span>
                        <span className="font-medium text-[#1C1A17]">{checkoutDate?.toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-[#1C1A17]/10">
                        <span className="text-[#6B6560]">Total Paid:</span>
                        <span className="font-semibold text-[#C8A96E]">€{selectedRoom ? selectedRoom.price * (checkoutDate && selectedDate ? Math.ceil((checkoutDate.getTime() - selectedDate.getTime()) / (1000 * 60 * 60 * 24)) : 1) : 0}</span>
                      </div>
                    </div>
                    <p className="text-xs text-[#6B6560] mt-4">A confirmation email has been sent to your inbox.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-white/40">
                <CalendarIcon className="w-12 h-12 mx-auto mb-4 opacity-30 text-[#C8A96E]" />
                <p className="font-serif text-lg text-white/30">Hotel Haven Amsterdam</p>
                <p className="text-xs mt-1 text-white/20">Images will appear here during your conversation</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
