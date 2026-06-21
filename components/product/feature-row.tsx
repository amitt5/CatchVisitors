import type { ReactNode } from "react";

export function FeatureRow({
  id,
  title,
  description,
  cta,
  reverse,
  visual,
}: {
  id?: string;
  title: string;
  description: string;
  cta?: string;
  reverse?: boolean;
  visual: ReactNode;
}) {
  return (
    <section id={id} className="px-6 py-16 md:py-20 scroll-mt-24">
      <div
        className={`max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${
          reverse ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#02524b] mb-4">
            {title}
          </h2>
          <p className="text-[#02524b]/70 text-base leading-relaxed mb-6">{description}</p>
          {cta && (
            <button className="bg-[#02524B] text-white text-sm font-semibold px-5 py-2.5 rounded-full">
              {cta}
            </button>
          )}
        </div>
        <div className="relative">{visual}</div>
      </div>
    </section>
  );
}
