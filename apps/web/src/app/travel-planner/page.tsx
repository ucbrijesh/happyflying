'use client'

import {useState} from 'react'
import {
  Compass,
  Sparkles,
  Send,
  Calendar,
  Users,
  MapPin,
  CheckCircle2,
  Phone,
  MessageSquare,
  Bot,
  Plane,
} from 'lucide-react'

export default function TravelPlannerPage() {
  const [destination, setDestination] = useState('Andaman Islands')
  const [duration, setDuration] = useState('5 Days / 4 Nights')
  const [travelType, setTravelType] = useState('Honeymoon & Luxury')
  const [budget, setBudget] = useState('Premium Luxury (4-Star / 5-Star)')
  const [generatedPlan, setGeneratedPlan] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)
    setGeneratedPlan(null)

    setTimeout(() => {
      setIsGenerating(false)
      setGeneratedPlan(`✨ Custom ${duration} ${travelType} Itinerary for ${destination}:

• Day 1 (Port Blair Arrival): Airport welcome & transfer in private AC vehicle. Relaxation at Corbyn's Cove Beach. Cellular Jail visit & Light and Sound show entry.
• Day 2 (Port Blair → Havelock): Prime-slot private catamaran cruise on Makruzz (Premium Class). Beachfront resort check-in. Radhanagar Beach sunset excursion.
• Day 3 (Elephant Beach & Neil Island): Speedboat ride to Elephant Beach with complimentary coral snorkeling. Afternoon cruise to Neil Island and Laxmanpur sunset.
• Day 4 (Neil Island → Port Blair): Natural Rock Formation (Howrah Bridge) exploration & Bharatpur Beach lagoon. Afternoon catamaran cruise back to Port Blair.
• Day 5 (Departure): Hotel checkout & assisted airport drop.

Included Highlights:
✓ Private dedicated AC cab for all island transfers (point to point)
✓ Makruzz / Nautika Premium Class Cruise tickets pre-issued
✓ 4-Star Resort accommodations with complimentary Breakfast & Dinner (MAP)
✓ 24/7 dedicated personal tour coordinator in Bangalore`)
    }, 1200)
  }

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 max-w-5xl mx-auto w-full space-y-12">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3B604]/20 text-[#0A1320] text-xs font-bold uppercase tracking-wider mb-3">
          <Bot className="h-3.5 w-3.5 text-sky-600" /> TravelIntell AI Assistant
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          AI-Powered Smart Travel Planner
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
          Craft your customized travel itinerary in seconds. Select your destination, duration, and style to receive an instant suggested plan, then chat directly with our Bangalore concierges to lock in dates.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Form Controls */}
        <div className="lg:col-span-5 rounded-[32px] border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-5">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <Compass className="h-4 w-4 text-sky-600" /> Trip Parameters
          </h2>

          <form onSubmit={handleGenerate} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Destination
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-sky-500 focus:outline-none"
              >
                <option value="Andaman Islands">Andaman & Nicobar Islands</option>
                <option value="Kerala Backwaters">Kerala Backwaters & Munnar</option>
                <option value="Himachal & Kashmir">Himachal & Kashmir Mountains</option>
                <option value="Bali Tropical">Bali & Southeast Asia</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-sky-500 focus:outline-none"
              >
                <option value="4 Days / 3 Nights">4 Days / 3 Nights</option>
                <option value="5 Days / 4 Nights">5 Days / 4 Nights (Recommended)</option>
                <option value="6 Days / 5 Nights">6 Days / 5 Nights</option>
                <option value="7 Days / 6 Nights">7 Days / 6 Nights (Grand Tour)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Travel Style & Theme
              </label>
              <select
                value={travelType}
                onChange={(e) => setTravelType(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-sky-500 focus:outline-none"
              >
                <option value="Honeymoon & Luxury">Honeymoon & Romantic Luxury</option>
                <option value="Family Holiday">Family Vacation with Kids</option>
                <option value="Beach & Backwaters">Relaxed Beach & Island Vibes</option>
                <option value="Adventure & Snorkeling">Adventure & Scuba Diving</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Budget Tier
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-sky-500 focus:outline-none"
              >
                <option value="Premium Luxury (4-Star / 5-Star)">Premium Luxury (4-Star / 5-Star)</option>
                <option value="Deluxe Comfort (3-Star / 4-Star)">Deluxe Comfort (3-Star / 4-Star)</option>
                <option value="Ultra Luxury Private Villas">Ultra Luxury Private Villas</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#0A1320] py-3.5 text-xs sm:text-sm font-bold text-[#F3B604] shadow hover:bg-slate-800 transition-transform active:scale-95 disabled:opacity-50 mt-2"
            >
              <Sparkles className="h-4 w-4" />
              <span>{isGenerating ? 'Synthesizing Itinerary...' : 'Generate AI Itinerary'}</span>
            </button>
          </form>
        </div>

        {/* Results Preview Card */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Generated Itinerary Plan
              </span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                Live Preview
              </span>
            </div>

            {generatedPlan ? (
              <div className="space-y-5 animate-in fade-in duration-300">
                <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm text-slate-800 leading-relaxed bg-slate-50/80 p-5 rounded-2xl border border-slate-200/80">
                  {generatedPlan}
                </pre>

                <div className="p-4 rounded-2xl bg-[#0A1320] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-[#F3B604]">Like this customized plan?</span>
                    <p className="text-[11px] text-slate-300">Lock dates & get real-time ferry holds with our Bangalore team.</p>
                  </div>
                  <a
                    href={`https://wa.me/919900113691?text=${encodeURIComponent(
                      `Hi HappyFlying! I generated a ${duration} ${travelType} plan for ${destination} on your AI planner. Can you share quotation and date availability?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#25D366] px-4 py-2 text-xs font-bold text-white shadow shrink-0"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>Inquire on WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="py-16 text-center text-slate-400 space-y-2">
                <Compass className="h-10 w-10 text-slate-300 mx-auto animate-pulse" />
                <p className="text-xs sm:text-sm">
                  Click &ldquo;Generate AI Itinerary&rdquo; to preview your tailor-made holiday.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
