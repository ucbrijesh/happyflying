import Link from 'next/link'
import { Compass, Home, PhoneCall, Sparkles } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="min-h-[75vh] flex items-center justify-center px-4 py-20 bg-gradient-to-b from-sky-50/50 via-white to-sky-50/30">
      <div className="max-w-2xl mx-auto text-center">
        <div className="relative inline-flex items-center justify-center w-24 h-24 mb-8 rounded-3xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-xl shadow-sky-500/20">
          <Compass className="w-12 h-12 animate-[spin_12s_linear_infinite]" />
          <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-slate-900 text-xs font-bold ring-4 ring-white">
            ?
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/80 text-sky-800 text-xs font-bold tracking-wider uppercase mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          Lost in Paradise?
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight mb-4">
          Destination Uncharted (404)
        </h1>
        <p className="text-lg text-slate-600 mb-8 max-w-lg mx-auto leading-relaxed">
          The tropical island, itinerary, or page you were looking for seems to have drifted off course or no longer exists. Let us guide you back to calm waters.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 text-white font-semibold shadow-lg hover:bg-slate-800 transition-all active:scale-[0.98]"
          >
            <Home className="w-4 h-4" />
            Return to Homepage
          </Link>
          <Link
            href="/packages"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-sky-600 text-white font-semibold shadow-lg shadow-sky-600/25 hover:bg-sky-700 transition-all active:scale-[0.98]"
          >
            <Compass className="w-4 h-4" />
            Explore Packages
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-all active:scale-[0.98]"
          >
            <PhoneCall className="w-4 h-4" />
            Speak with Concierge
          </Link>
        </div>
      </div>
    </main>
  )
}
