import { BadgeCheck, TrendingUp, BarChart3 } from "lucide-react";

function DifficultyBadge({ score }) {
  const color = score < 30 ? "bg-green-100 text-green-700" : score < 60 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700";
  const label = score < 30 ? "Easy" : score < 60 ? "Moderate" : "Hard";
  return (
    <span className={`px-2 py-1 rounded-md text-xs font-semibold ${color}`}>{label} • {score}</span>
  );
}

export default function Results({ data, loading }) {
  if (loading) {
    return (
      <div className="mt-6 animate-pulse bg-white border rounded-xl p-6">
        <div className="h-5 w-40 bg-gray-200 rounded mb-4" />
        <div className="grid sm:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-24 bg-gray-100 rounded" />
          ))}
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { suggestions = [], intentBreakdown = {}, difficulty = 0 } = data;

  return (
    <section className="mt-6 grid gap-6">
      <div className="bg-white border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={18} className="text-indigo-600"/>
          <h3 className="font-semibold">Keyword Suggestions</h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {suggestions.map((s, idx) => (
            <div key={idx} className="border rounded-lg p-3 hover:shadow-sm transition">
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium leading-5">{s.keyword}</p>
                <DifficultyBadge score={s.difficulty} />
              </div>
              <p className="text-xs text-gray-500 mt-1">Intent: {s.intent}</p>
              <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                <span>Vol: {s.volume}</span>
                <span>CTR: {s.ctr}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border rounded-xl p-6 grid sm:grid-cols-3 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 size={18} className="text-indigo-600"/>
            <h3 className="font-semibold">Search Intent</h3>
          </div>
          <ul className="space-y-2 text-sm">
            {Object.entries(intentBreakdown).map(([k, v]) => (
              <li key={k} className="flex items-center justify-between">
                <span className="capitalize">{k}</span>
                <span className="text-gray-600">{v}%</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="sm:col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <BadgeCheck size={18} className="text-indigo-600"/>
            <h3 className="font-semibold">Overall Ranking Difficulty</h3>
          </div>
          <div className="border rounded-lg p-4 flex items-center justify-between">
            <p className="text-gray-600">Estimated based on competition density, SERP diversity and content depth.</p>
            <DifficultyBadge score={difficulty} />
          </div>
        </div>
      </div>
    </section>
  );
}
