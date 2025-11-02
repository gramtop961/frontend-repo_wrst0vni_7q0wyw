import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    tagline: "Great to try the tool",
    features: [
      "10 searches/day",
      "25 suggestions per search",
      "Basic difficulty & intent",
    ],
    cta: "Start free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$29/mo",
    tagline: "For bloggers & creators",
    features: [
      "Unlimited searches",
      "Bulk analysis (100 at once)",
      "SERP tracking (50 keywords)",
      "CSV & PDF exports",
      "Priority support",
    ],
    cta: "Upgrade to Pro",
    highlight: true,
  },
  {
    name: "Agency",
    price: "$79/mo",
    tagline: "For teams & agencies",
    features: [
      "All Pro features",
      "Bulk analysis (1,000 at once)",
      "SERP tracking (1,000 keywords)",
      "Team seats (5 included)",
    ],
    cta: "Scale with Agency",
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="mt-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Simple, freemium pricing</h2>
        <p className="text-gray-600 mt-2">Start free. Upgrade when you need bulk analysis, SERP tracking and exports.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.name} className={`border rounded-2xl p-6 bg-white ${plan.highlight ? "ring-2 ring-indigo-500" : ""}`}>
            <div className="flex items-baseline justify-between">
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <span className="text-sm text-gray-500">{plan.tagline}</span>
            </div>
            <p className="text-3xl font-bold mt-2">{plan.price}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-gray-700">
                  <Check size={16} className="text-green-600"/> {f}
                </li>
              ))}
            </ul>
            <button className={`mt-6 w-full px-4 py-2 rounded-md font-medium ${plan.highlight ? "bg-indigo-600 text-white" : "border"}`}>{plan.cta}</button>
          </div>
        ))}
      </div>
    </section>
  );
}
