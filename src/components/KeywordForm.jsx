import { useState } from "react";
import { Search, Link as LinkIcon } from "lucide-react";

export default function KeywordForm({ onAnalyze }) {
  const [mode, setMode] = useState("keyword");
  const [query, setQuery] = useState("");
  const [count, setCount] = useState(25);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onAnalyze({ mode, query: query.trim(), count: Math.max(5, Math.min(200, Number(count) || 25)) });
  };

  return (
    <section id="tool" className="w-full">
      <div className="bg-white border rounded-xl p-4 sm:p-6 shadow-sm">
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            className={`px-3 py-1.5 rounded-md text-sm border ${mode === "keyword" ? "bg-gray-900 text-white" : "bg-white"}`}
            onClick={() => setMode("keyword")}
          >
            <span className="inline-flex items-center gap-2"><Search size={16}/> Seed keyword</span>
          </button>
          <button
            className={`px-3 py-1.5 rounded-md text-sm border ${mode === "url" ? "bg-gray-900 text-white" : "bg-white"}`}
            onClick={() => setMode("url")}
          >
            <span className="inline-flex items-center gap-2"><LinkIcon size={16}/> Competitor URL</span>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-[1fr,180px,140px]">
          <input
            type={mode === "url" ? "url" : "text"}
            placeholder={mode === "url" ? "e.g. https://example.com/blog/post" : "e.g. best coffee makers under $100"}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <input
            type="number"
            min={5}
            max={200}
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
            placeholder="Results"
          />
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-3 py-2 font-medium">
            Analyze
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-2">
          Free plan: up to 25 suggestions per search. Upgrade for bulk analysis, SERP tracking and exports.
        </p>
      </div>
    </section>
  );
}
