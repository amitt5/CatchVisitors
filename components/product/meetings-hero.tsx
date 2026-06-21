import { SchedulerCard } from "@/components/product/scheduler-card";
import { AskIslaPill } from "@/components/product/ask-isla-pill";

export function MeetingsHero() {
  return (
    <section className="pt-32 md:pt-40 px-6">
      <div className="max-w-6xl mx-auto">
        <div
          className="relative rounded-3xl overflow-hidden px-8 md:px-14 py-14 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
          style={{ background: "linear-gradient(135deg, #02524B 0%, #2E9F6E 100%)" }}
        >
          <AskIslaPill className="absolute top-6 right-6" />

          <SchedulerCard
            greeting="Hi, Jen! Ready to schedule your demo?"
            subtext="Let's get a meeting on the books for you and the Northwind Clinics crew! Select a 1-hour time slot with your dedicated sales rep."
          />

          <div className="text-white">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.1] mb-5">
              Automate meeting scheduling for qualified buyers.
            </h1>
            <p className="text-white/80 text-base md:text-lg leading-relaxed mb-8">
              Buyers shouldn't jump through hoops to get a meeting booked. With Isla the
              AI Agent, you can turn buyer interest into booked meetings with just a few
              clicks. No more back-and-forth and no more missed pipeline.
            </p>
            <button className="bg-white text-[#02524b] text-sm font-semibold px-5 py-3 rounded-full">
              Schedule a demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
