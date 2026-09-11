'use client'

import {useState} from 'react'
import {
  Clock,
  MapPin,
  Utensils,
  Car,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Info,
  Ship,
} from 'lucide-react'
import type {ItineraryDay} from '@happyflying/types'

interface ItineraryTimelineProps {
  days?: ItineraryDay[]
}

export function ItineraryTimeline({days}: ItineraryTimelineProps) {
  const [expandedDays, setExpandedDays] = useState<number[]>([1]) // First day open by default

  if (!days || days.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-200 p-8 text-center text-slate-500">
        Itinerary details being updated by destination concierges.
      </div>
    )
  }

  const toggleDay = (dayNum: number) => {
    if (expandedDays.includes(dayNum)) {
      setExpandedDays(expandedDays.filter((d) => d !== dayNum))
    } else {
      setExpandedDays([...expandedDays, dayNum])
    }
  }

  const toggleAll = () => {
    if (expandedDays.length === days.length) {
      setExpandedDays([])
    } else {
      setExpandedDays(days.map((d) => d.dayNumber))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-100 text-sky-800 font-bold text-xs">
            <Clock className="h-4 w-4" />
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Day-by-Day Detailed Itinerary
          </h2>
        </div>
        <button
          onClick={toggleAll}
          className="text-xs font-bold text-sky-700 hover:text-sky-900 hover:underline"
        >
          {expandedDays.length === days.length ? 'Collapse All' : 'Expand All Days'}
        </button>
      </div>

      {/* Vertical Timeline Structure */}
      <div className="relative space-y-4 before:absolute before:left-4 sm:before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-sky-500 before:via-amber-400 before:to-sky-300">
        {days.map((day) => {
          const isExpanded = expandedDays.includes(day.dayNumber)

          return (
            <div
              key={day._id || day.dayNumber}
              className="relative pl-10 sm:pl-14 transition-all"
            >
              {/* Timeline Pin Dot */}
              <button
                onClick={() => toggleDay(day.dayNumber)}
                className={`absolute left-2 sm:left-3 top-4 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full border-2 transition-all ${
                  isExpanded
                    ? 'border-[#F3B604] bg-[#0A1320] text-[#F3B604] shadow-md scale-110'
                    : 'border-slate-300 bg-white text-slate-600 hover:border-sky-500'
                }`}
                aria-label={`Toggle Day ${day.dayNumber}`}
              >
                <span className="text-[10px] font-black">{day.dayNumber}</span>
              </button>

              {/* Day Card */}
              <div
                className={`rounded-[26px] border bg-white p-5 sm:p-6 shadow-sm transition-all duration-200 ${
                  isExpanded
                    ? 'border-sky-300/90 shadow-md ring-1 ring-sky-100'
                    : 'border-slate-200/80 hover:border-slate-300'
                }`}
              >
                {/* Clickable Header */}
                <button
                  onClick={() => toggleDay(day.dayNumber)}
                  className="w-full flex items-start justify-between text-left gap-4 group"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="rounded-full bg-[#0A1320] px-2.5 py-0.5 text-[11px] font-bold text-[#F3B604]">
                        DAY {day.dayNumber}
                      </span>
                      {day.location && (
                        <span className="flex items-center gap-1 text-xs font-semibold text-slate-500">
                          <MapPin className="h-3 w-3 text-sky-600" />
                          {day.location}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                      {day.title}
                    </h3>
                  </div>

                  <div className="shrink-0 p-1.5 rounded-full bg-slate-50 group-hover:bg-sky-50 text-slate-500 group-hover:text-sky-600 transition-colors">
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </div>
                </button>

                {/* Expanded Content Body */}
                {isExpanded && (
                  <div className="mt-5 pt-5 border-t border-slate-100 space-y-4 text-xs sm:text-sm animate-in fade-in-50 duration-200">
                    {/* Narrative Description */}
                    {day.description && typeof day.description === 'string' && (
                      <p className="text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50/60 p-4 rounded-2xl border border-slate-100">
                        {day.description}
                      </p>
                    )}

                    {/* Time breakdown if available */}
                    <div className="grid sm:grid-cols-3 gap-3">
                      {day.morning && (
                        <div className="rounded-2xl bg-amber-50/60 p-3.5 border border-amber-100/80">
                          <span className="block font-bold text-[11px] uppercase tracking-wider text-amber-900 mb-1">
                            🌅 Morning
                          </span>
                          <p className="text-slate-700 text-xs leading-relaxed">
                            {typeof day.morning === 'string' ? day.morning : 'Morning sightseeing and island activity'}
                          </p>
                        </div>
                      )}
                      {day.afternoon && (
                        <div className="rounded-2xl bg-sky-50/60 p-3.5 border border-sky-100/80">
                          <span className="block font-bold text-[11px] uppercase tracking-wider text-sky-900 mb-1">
                            ☀️ Afternoon
                          </span>
                          <p className="text-slate-700 text-xs leading-relaxed">
                            {typeof day.afternoon === 'string' ? day.afternoon : 'Afternoon transfers and exploration'}
                          </p>
                        </div>
                      )}
                      {day.evening && (
                        <div className="rounded-2xl bg-indigo-50/60 p-3.5 border border-indigo-100/80">
                          <span className="block font-bold text-[11px] uppercase tracking-wider text-indigo-900 mb-1">
                            🌇 Evening & Sunset
                          </span>
                          <p className="text-slate-700 text-xs leading-relaxed">
                            {typeof day.evening === 'string' ? day.evening : 'Evening relaxation and sunset view'}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Transfers Included */}
                    {day.transfers && day.transfers.length > 0 && (
                      <div className="space-y-2">
                        <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          Included Transport & Transfers
                        </span>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {day.transfers.map((t, idx) => (
                            <div
                              key={t._key || idx}
                              className="flex items-center gap-2.5 rounded-xl bg-slate-50 px-3.5 py-2 border border-slate-100 text-xs text-slate-800"
                            >
                              {t.mode === 'cruise' || t.mode === 'speed-boat' ? (
                                <Ship className="h-4 w-4 text-sky-600 shrink-0" />
                              ) : (
                                <Car className="h-4 w-4 text-emerald-600 shrink-0" />
                              )}
                              <div>
                                <div className="font-semibold">{t.title}</div>
                                {t.vehicleType && <div className="text-[10px] text-slate-500">{t.vehicleType}</div>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Meals & Overnight pill */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                      {day.meals && day.meals.length > 0 && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-700 font-semibold">
                          <Utensils className="h-3.5 w-3.5 text-amber-600" />
                          <span>Meals: {day.meals.join(', ')}</span>
                        </div>
                      )}
                      {day.overnight && (
                        <div className="text-xs text-sky-800 bg-sky-50 px-3 py-1 rounded-full font-medium border border-sky-100">
                          🛌 {day.overnight}
                        </div>
                      )}
                    </div>

                    {/* Important Day Note */}
                    {day.importantNote && (
                      <div className="flex items-start gap-2 rounded-2xl bg-amber-50/80 p-3 text-xs text-amber-900 border border-amber-200/80">
                        <Info className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                        <span><strong>Note:</strong> {day.importantNote}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
