"use client";

import { useState } from "react";
import { HotelHero } from "@/components/hotels/hotel-hero";
import { VoiceBotModal } from "@/components/hotels/voice-bot-modal";

export default function HotelsLanding() {
  const [isVoiceBotOpen, setIsVoiceBotOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <HotelHero onOpenVoiceBot={() => setIsVoiceBotOpen(true)} />
      <VoiceBotModal
        isOpen={isVoiceBotOpen}
        onClose={() => setIsVoiceBotOpen(false)}
      />

      {/* Additional sections can be added here */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif text-center mb-12">Our Rooms</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Room cards */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074"
                alt="Deluxe Room"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Deluxe Canal View</h3>
                <p className="text-gray-600 mb-4">Spacious room with stunning canal views</p>
                <p className="text-2xl font-bold">€199 <span className="text-sm font-normal text-gray-500">/night</span></p>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070"
                alt="Premium Suite"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Premium Suite</h3>
                <p className="text-gray-600 mb-4">Luxury suite with private terrace</p>
                <p className="text-2xl font-bold">€299 <span className="text-sm font-normal text-gray-500">/night</span></p>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=2074"
                alt="Executive Suite"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Executive Suite</h3>
                <p className="text-gray-600 mb-4">Ultimate luxury with panoramic views</p>
                <p className="text-2xl font-bold">€399 <span className="text-sm font-normal text-gray-500">/night</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
