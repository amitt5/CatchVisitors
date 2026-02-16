import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    price: "€100",
    minutes: "100 minutes",
    description: "Small businesses Getting started",
    features: [
      "100 conversation minutes",
      "Calendar integration",
      "50+ languages",
      "Email & CRM sync",
      "Call transcripts",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "€200",
    minutes: "300 minutes",
    description: "Growing businesses Higher volume",
    features: [
      "300 conversation minutes",
      "Calendar integration",
      "50+ languages",
      "Email & CRM sync",
      "Call transcripts",
      "Priority support",
      "Custom voice training",
    ],
    cta: "Get Started",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    minutes: "Let's Talk",
    description: "High-volume businesses, Discounted per-minute rates",
    features: [
      "Unlimited minutes",
      "Volume discounts",
      "Dedicated support",
      "Custom integrations",
      "Advanced analytics",
      "SLA guarantee",
      "White-label option",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4 block">
            Pricing
          </span>
          <h2
            className="text-4xl md:text-5xl font-normal leading-tight tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}
          >
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pay only for what you use. No hidden fees, no long-term contracts.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 bg-white border rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                plan.highlighted
                  ? 'border-gray-900 shadow-md'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3
                  className="text-2xl font-normal mb-2"
                  style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}
                >
                  {plan.name}
                </h3>
                <div className="mb-1">
                  <span className="text-4xl font-normal" style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}>
                    {plan.price}
                  </span>
                  {plan.price !== "Custom" && (
                    <span className="text-gray-500 ml-2">/month</span>
                  )}
                </div>
                <p className="text-sm font-medium text-gray-900 mb-2">
                  {plan.minutes}
                </p>
                <p className="text-sm text-gray-600">
                  {plan.description}
                </p>
              </div>

              <Button
                className={`w-full rounded-full mb-6 ${
                  plan.highlighted
                    ? 'bg-gray-900 hover:bg-gray-800 text-white'
                    : 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-200'
                }`}
              >
                {plan.cta}
              </Button>

              <div className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-gray-900" strokeWidth={2.5} />
                    </div>
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 mt-12">
          All plans include calendar integration, multilingual support, and automatic CRM sync.
        </p>
      </div>
    </section>
  );
}
