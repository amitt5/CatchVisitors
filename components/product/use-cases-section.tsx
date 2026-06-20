import { ArrowDown } from "lucide-react";
import { Fragment, type ReactNode } from "react";

export interface UseCase {
  title: string;
  description: string;
  steps: string[];
  preview: ReactNode;
}

export function UseCasesSection({
  heading,
  description,
  cases,
}: {
  heading: string;
  description: string;
  cases: UseCase[];
}) {
  return (
    <section className="bg-[#f7f7fa] py-20 px-6">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#02524b] mb-4">
          {heading}
        </h2>
        <p className="text-[#02524b]/70 text-base leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {cases.map((useCase) => (
          <div key={useCase.title} className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden">
            <div className="p-6">
              <div className="text-[11px] font-semibold tracking-wide text-[#544CD1] mb-2">
                USE CASE
              </div>
              <div className="text-lg font-semibold text-[#02524b] mb-2">{useCase.title}</div>
              <p className="text-sm text-[#02524b]/70 leading-relaxed">{useCase.description}</p>
            </div>
            <div className="bg-gradient-to-br from-[#f3effc] to-[#e9e3fb] p-5">
              <div className="flex flex-col items-center gap-2 mb-4">
                {useCase.steps.map((step, i) => (
                  <Fragment key={i}>
                    {i > 0 && <ArrowDown className="w-3.5 h-3.5 text-[#544CD1]" />}
                    <div className="bg-white rounded-full px-3 py-1.5 text-xs text-[#02524b] shadow-sm text-center">
                      {step}
                    </div>
                  </Fragment>
                ))}
              </div>
              {useCase.preview}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
