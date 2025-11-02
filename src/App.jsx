import { useMemo, useState } from "react";
import Header from "./components/Header";
import KeywordForm from "./components/KeywordForm";
import Results from "./components/Results";
import Pricing from "./components/Pricing";

function generateSuggestions({ mode, query, count }) {
  // Lightweight, on-device heuristics for demo purposes only.
  const seed = query.toLowerCase().replace(/https?:\/\//, "").replace(/www\./, "");
  const base = mode === "url" ? seed.split("/")[0]?.split(".")[0] || "keyword" : seed.split(/\s+/)[0] || "keyword";

  const intents = ["informational", "commercial", "transactional", "navigational"];
  const variations = [
    "best", "top", "cheap", "vs", "near me", "how to", "review", "under 100", "for beginners", "for small business",
    "template", "ideas", "examples", "guide", "checklist", "2025", "alternatives", "free", "premium", "local"
  ];

  const items = [];
  for (let i = 0; i < count; i++) {
    const v = variations[i % variations.length];
    const intent = intents[(i + base.length) % intents.length];
    const volume = Math.max(70, Math.floor(5000 / (i + 2)) + (base.length * 7) % 90);
    const difficulty = Math.min(95, Math.max(5, Math.floor((i * 3 + base.length * 4) % 100)));
    const ctr = Math.max(5, 60 - Math.floor(difficulty / 2));
    const keyword = mode === "url" ? `${base} ${v}` : `${v} ${base}`;
    items.push({ keyword, intent, volume, difficulty, ctr });
  }

  const intentCounts = items.reduce((acc, it) => { acc[it.intent] = (acc[it.intent] || 0) + 1; return acc; }, {});
  const intentBreakdown = Object.fromEntries(Object.entries(intentCounts).map(([k, v]) => [k, Math.round((v / items.length) * 100)]));
  const difficulty = Math.round(items.reduce((s, it) => s + it.difficulty, 0) / items.length);

  return { suggestions: items, intentBreakdown, difficulty };
}

function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async (payload) => {
    setLoading(true);
    // In production, this would call the backend API using VITE_BACKEND_URL.
    // For this sandbox, we generate results locally for immediate feedback.
    await new Promise((r) => setTimeout(r, 500));
    const data = generateSuggestions(payload);
    setResult(data);
    setLoading(false);
  };

  const heroStats = useMemo(() => [
    { label: "Marketers", value: "20k+" },
    { label: "Avg. ROI", value: "6.3x" },
    { label: "DB Keywords", value: "120M+" },
  ], []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <Header />

      <main className="max-w-6xl mx-auto px-4 mt-10">
        <section className="text-center">
          <div className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-indigo-100 text-indigo-700">
            Freemium • Upgrade for bulk & tracking
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-4">
            Generate long-tail keywords with AI and predict ranking difficulty
          </h1>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Paste a seed keyword or competitor URL to uncover intent-rich opportunities. Export, track, and scale with a simple subscription.
          </p>
          <div className="grid grid-cols-3 max-w-xl mx-auto mt-6">
            {heroStats.map((s) => (
              <div key={s.label} className="py-2">
                <p className="text-xl font-semibold">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-10">
          <KeywordForm onAnalyze={handleAnalyze} />
          <Results data={result} loading={loading} />
        </div>

        <Pricing />

        <footer className="py-10 text-center text-sm text-gray-500">
          Built for marketers and bloggers. Not affiliated with Ahrefs or SEMrush.
        </footer>
      </main>
    </div>
  );
}

export default App;
