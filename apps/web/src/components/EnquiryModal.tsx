'use client'

import {X} from 'lucide-react'
import type {SiteSettings} from '@happyflying/types'
import {EnquiryForm} from './EnquiryForm'

interface EnquiryModalProps {
  isOpen: boolean
  onClose: () => void
  defaultPackage?: string
  defaultDestination?: string
  settings?: SiteSettings
}

export function EnquiryModal({
  isOpen,
  onClose,
  defaultPackage,
  defaultDestination,
  settings,
}: EnquiryModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-100">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close Modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-[11px] font-bold uppercase tracking-wider mb-2">
            ✈️ Custom Travel Quote
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">
            Book & Customise Your Journey
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Fill in your trip details and our Bangalore destination concierge will craft your custom itinerary.
          </p>
        </div>

        <EnquiryForm
          defaultPackage={defaultPackage}
          defaultDestination={defaultDestination}
          settings={settings}
          onSuccess={onClose}
        />
      </div>
    </div>
  )
}
