import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare, FileText, Sparkles } from "lucide-react";

export function EdgeSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#1F2937] to-[#111827] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
              Be The First.{" "}
              <span className="bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">
                Get The Edge.
              </span>
            </h2>

            <div className="space-y-4 text-gray-300 text-lg">
              <p>
                Right now,{" "}
                <span className="text-white font-semibold">
                  NO employment lawyers
                </span>{" "}
                in your city are using this technology.
              </p>
              <p>
                While your competitors send visitors to voicemail and contact
                forms,{" "}
                <span className="text-[#3B82F6] font-semibold">
                  YOU'LL be having real conversations.
                </span>
              </p>
              <p className="text-white font-semibold">
                This advantage won't last long.
              </p>
              <p>
                In 6 months, everyone will have this. Be first. Lock in pilot
                pricing while you still can.
              </p>
            </div>

            <Button
              asChild
              size="lg"
              className="mt-8 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg px-8 py-6 text-lg font-semibold shadow-lg shadow-[#2563EB]/25 hover:shadow-xl transition-all hover:scale-105"
            >
              <a href="#book-demo" className="flex items-center gap-2">
                Book Your Demo Call - Limited Spots
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
          </div>

          {/* Right Side - Visual Comparison */}
          <div className="relative">
            {/* Competitors Card */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gray-600 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="font-semibold text-gray-400">Your Competitors</p>
                  <p className="text-sm text-gray-500">Traditional Contact Form</p>
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4 space-y-3">
                <div className="h-3 bg-gray-700 rounded w-3/4" />
                <div className="h-3 bg-gray-700 rounded w-1/2" />
                <div className="h-10 bg-gray-700 rounded w-full" />
                <div className="h-10 bg-gray-700 rounded w-full" />
                <div className="h-8 bg-gray-600 rounded w-1/3" />
              </div>
              <p className="text-center text-gray-500 text-sm mt-3">
                95% of visitors leave without filling this out
              </p>
            </div>

            {/* Your Website Card */}
            <div className="bg-gradient-to-br from-[#2563EB]/20 to-[#7C3AED]/20 backdrop-blur-sm rounded-2xl p-6 border border-[#2563EB]/30 relative">
              <div className="absolute -top-3 -right-3">
                <div className="bg-[#10B981] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  With CatchVisitors
                </div>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">Your Website</p>
                  <p className="text-sm text-gray-400">AI Voice Assistant</p>
                </div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#2563EB]/30 flex-shrink-0" />
                  <div className="bg-[#2563EB]/20 rounded-lg p-2 text-sm text-gray-200">
                    "Hi! I'm here to help. What questions do you have about your
                    employment situation?"
                  </div>
                </div>
                <div className="flex items-start gap-3 justify-end">
                  <div className="bg-white/20 rounded-lg p-2 text-sm text-gray-200">
                    "Can they fire me without cause?"
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-600 flex-shrink-0" />
                </div>
              </div>
              <p className="text-center text-[#10B981] text-sm mt-3 font-medium">
                Instant engagement, 24/7 availability
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
