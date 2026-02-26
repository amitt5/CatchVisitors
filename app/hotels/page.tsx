"use client";

import { useState } from "react";
import { HotelHero } from "@/components/hotels/hotel-hero";
import { VoiceBotModal } from "@/components/hotels/voice-bot-modal";
import { HotelNav } from "@/components/hotels/hotel-nav";
import { HotelAbout } from "@/components/hotels/hotel-about";
import { HotelRooms } from "@/components/hotels/hotel-rooms";
import { HotelAtmosphere } from "@/components/hotels/hotel-atmosphere";
import { HotelAmenities } from "@/components/hotels/hotel-amenities";
import { HotelFAQ } from "@/components/hotels/hotel-faq";
import { HotelFooter } from "@/components/hotels/hotel-footer";

export default function HotelsLanding() {
  const [isVoiceBotOpen, setIsVoiceBotOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFAF5]">
      <HotelNav onOpenVoiceBot={() => setIsVoiceBotOpen(true)} />
      <HotelHero onOpenVoiceBot={() => setIsVoiceBotOpen(true)} />
      <VoiceBotModal
        isOpen={isVoiceBotOpen}
        onClose={() => setIsVoiceBotOpen(false)}
      />
      <HotelAbout />
      <HotelRooms />
      <HotelAtmosphere />
      <HotelAmenities />
      <HotelFAQ />
      <HotelFooter />
    </div>
  );
}
