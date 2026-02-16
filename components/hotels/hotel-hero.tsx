"use client";

import { Button } from "@/components/ui/button";
import { Phone, MapPin } from "lucide-react";

interface HotelHeroProps {
  onOpenVoiceBot: () => void;
}

export function HotelHero({ onOpenVoiceBot }: HotelHeroProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Hero Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/amsterdam.mp4" type="video/mp4" />
        </video>
        {/* Video overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-6 flex justify-between items-center">
        <div className="text-white">
          <h1 className="text-2xl font-serif">Hotel Haven Amsterdam</h1>
          <div className="flex items-center gap-2 mt-1 text-sm">
            <MapPin className="w-3 h-3" />
            <span>Singel, Amsterdam</span>
          </div>
        </div>
        {/* <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-1 text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
            Menu
          </Button>
        </div> */}
      </header>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-6 mt-32">
        <h2 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">
          Experience Amsterdam<br />in Luxury
        </h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl text-white/90">
          Boutique canal-side hotel in the heart of Amsterdam's historic center
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            size="lg"
            className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-6 h-auto"
          >
            Book Your Stay
          </Button>
          <Button
            size="lg"
            className="bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6 h-auto"
            onClick={onOpenVoiceBot}
          >
            <Phone className="w-5 h-5 mr-2" />
            Talk to Our AI Concierge
          </Button>
        </div>

        <p className="mt-6 text-sm text-white/70">
          Available 24/7 to answer questions and help with bookings
        </p>
      </div>

      {/* Quick Info Bar */}
      {/* <div className="absolute bottom-0 left-0 right-0 z-10 bg-black/40 backdrop-blur-sm border-t border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap justify-between items-center text-white text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>5 min walk to Anne Frank Museum</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>Free cancellation up to 24h</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            <span>4.9/5 rating (2,847 reviews)</span>
          </div>
        </div>
      </div> */}
    </div>
  );
}
