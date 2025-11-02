import { Rocket, Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow">
            <Rocket size={18} />
          </div>
          <div>
            <p className="font-semibold leading-4">LongTail AI</p>
            <p className="text-xs text-gray-500 -mt-0.5 flex items-center gap-1">
              SEO keyword intelligence <Sparkles size={14} />
            </p>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
          <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
          <a href="#tool" className="text-gray-600 hover:text-gray-900">Try it</a>
        </nav>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-sm rounded-md border">Sign in</button>
          <button className="px-3 py-1.5 text-sm rounded-md bg-gray-900 text-white">Get started</button>
        </div>
      </div>
    </header>
  );
}
