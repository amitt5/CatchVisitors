export function ComparisonSection() {
  return (
    <section id="comparison" className="py-24 md:py-32 bg-white border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4 block">
            Compare
          </span>
          <h2
            className="text-4xl md:text-5xl font-normal leading-tight tracking-tight"
            style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}
          >
            Why this beats the alternatives
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm min-w-[700px]">
            <thead>
              <tr>
                <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-gray-400"></th>
                <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-orange-600 bg-orange-50 rounded-t-xl">
                  CatchVisitors
                </th>
                <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Receptionist
                </th>
                <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Chatbot
                </th>
                <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Contact Form
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="p-3.5 font-medium text-gray-900">Available 24/7</td>
                <td className="p-3.5 bg-orange-50 font-medium text-green-600">✓</td>
                <td className="p-3.5 text-gray-600 text-red-600 font-bold">✗</td>
                <td className="p-3.5 text-gray-600 text-green-600">✓</td>
                <td className="p-3.5 text-gray-600 text-green-600">✓</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="p-3.5 font-medium text-gray-900">Voice conversation</td>
                <td className="p-3.5 bg-orange-50 font-medium text-green-600">✓</td>
                <td className="p-3.5 text-gray-600 text-green-600">✓</td>
                <td className="p-3.5 text-gray-600 text-red-600 font-bold">✗</td>
                <td className="p-3.5 text-gray-600 text-red-600 font-bold">✗</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="p-3.5 font-medium text-gray-900">Qualifies leads</td>
                <td className="p-3.5 bg-orange-50 font-medium text-green-600">✓</td>
                <td className="p-3.5 text-gray-600 text-gray-400">Sometimes</td>
                <td className="p-3.5 text-gray-600 text-gray-400">Basic</td>
                <td className="p-3.5 text-gray-600 text-red-600 font-bold">✗</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="p-3.5 font-medium text-gray-900">Books into calendar</td>
                <td className="p-3.5 bg-orange-50 font-medium text-green-600">✓</td>
                <td className="p-3.5 text-gray-600 text-green-600">✓</td>
                <td className="p-3.5 text-gray-600 text-gray-400">Some</td>
                <td className="p-3.5 text-gray-600 text-red-600 font-bold">✗</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="p-3.5 font-medium text-gray-900">Multi-language</td>
                <td className="p-3.5 bg-orange-50 font-medium text-gray-900">
                  <span className="text-green-600">✓</span> 50+ languages
                </td>
                <td className="p-3.5 text-gray-600 text-gray-400">If bilingual</td>
                <td className="p-3.5 text-gray-600 text-gray-400">Limited</td>
                <td className="p-3.5 text-gray-600 text-red-600 font-bold">✗</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="p-3.5 font-medium text-gray-900">Self-improving</td>
                <td className="p-3.5 bg-orange-50 font-medium text-green-600">✓</td>
                <td className="p-3.5 text-gray-600 text-red-600 font-bold">✗</td>
                <td className="p-3.5 text-gray-600 text-red-600 font-bold">✗</td>
                <td className="p-3.5 text-gray-600 text-red-600 font-bold">✗</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="p-3.5 font-medium text-gray-900">Monthly cost</td>
                <td className="p-3.5 bg-orange-50 font-medium text-gray-900">€399/mo</td>
                <td className="p-3.5 text-gray-600">€3,000–5,000/mo</td>
                <td className="p-3.5 text-gray-600">€50–200/mo</td>
                <td className="p-3.5 text-gray-600">Free</td>
              </tr>
              <tr>
                <td className="p-3.5 font-medium text-gray-900">Conversion rate</td>
                <td className="p-3.5 bg-orange-50 font-bold text-gray-900">High</td>
                <td className="p-3.5 text-gray-600">Medium</td>
                <td className="p-3.5 text-gray-600">Low</td>
                <td className="p-3.5 text-gray-600">Very low</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
