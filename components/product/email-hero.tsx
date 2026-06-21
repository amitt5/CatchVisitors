import { Play } from "lucide-react";
import { EmailCard } from "@/components/product/email-card";
import { AskIslaPill } from "@/components/product/ask-isla-pill";

export function EmailHero() {
  return (
    <section className="pt-32 md:pt-40 px-6">
      <div className="max-w-6xl mx-auto">
        <div
          className="relative rounded-3xl overflow-hidden px-8 md:px-14 py-14 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
          style={{ background: "linear-gradient(135deg, #02524B 0%, #2E9F6E 100%)" }}
        >
          <AskIslaPill className="absolute top-6 right-6" />

          <EmailCard
            subject="New report available now!"
            recipient="Jen"
            recipientEmail="jen@northwindclinics.com"
            action="Let's book time!"
          >
            <p>
              Hi Jen! We thought you might be interested in the new report that was just
              published:{" "}
              <span className="text-[#02524B] underline">How to manage spend on a global scale</span>.
              If you'd like to chat about the details, our team is ready to connect. Just use
              the link below.
            </p>
          </EmailCard>

          <div className="text-white">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.1] mb-5">
              Send dynamic, intelligent AI emails at an infinite scale.
            </h1>
            <p className="text-white/80 text-base md:text-lg leading-relaxed mb-8">
              Rigid journey builders are for yesterday. With Isla the AI Agent, you can
              nurture and convert inbound leads in the email inbox with zero human
              intervention. This means more pipeline, less pain.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button className="bg-white text-[#02524b] text-sm font-semibold px-5 py-3 rounded-full">
                Schedule a demo
              </button>
              <button className="flex items-center gap-2 border border-white/30 text-white text-sm font-semibold px-5 py-3 rounded-full hover:bg-white/10 transition-colors">
                <Play className="w-3.5 h-3.5" />
                Watch demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
