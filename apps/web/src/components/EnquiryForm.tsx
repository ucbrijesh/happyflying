'use client'

import {useState} from 'react'
import {Send, CheckCircle2, AlertCircle, Phone, MessageSquare} from 'lucide-react'
import type {EnquiryFormData, SiteSettings} from '@happyflying/types'

interface EnquiryFormProps {
  defaultPackage?: string
  defaultDestination?: string
  settings?: SiteSettings
  onSuccess?: () => void
}

export function EnquiryForm({
  defaultPackage = '',
  defaultDestination = '',
  settings,
  onSuccess,
}: EnquiryFormProps) {
  const [formData, setFormData] = useState<EnquiryFormData>({
    name: '',
    phone: '',
    email: '',
    destination: defaultDestination,
    package: defaultPackage,
    travelDates: '',
    adults: 2,
    children: 0,
    message: '',
  })

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const whatsappNumber = settings?.whatsapp ? settings.whatsapp.replace(/[^0-9]/g, '') : '919900113691'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit inquiry. Please try WhatsApp or Call directly.')
      }

      setStatus('success')
      if (onSuccess) {
        setTimeout(onSuccess, 2000)
      }
    } catch (err: unknown) {
      console.error(err)
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-8 text-center space-y-4">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="text-xl font-bold text-emerald-950">Inquiry Received!</h3>
        <p className="text-sm text-emerald-800 max-w-md mx-auto">
          Thank you, {formData.name}. Our Bangalore travel concierge will contact you on <strong>{formData.phone}</strong> shortly with custom package options.
        </p>
        <div className="pt-2">
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              `Hi HappyFlying! I just submitted an inquiry for ${formData.package || formData.destination || 'holiday package'}. My name is ${formData.name}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl bg-[#25D366] px-5 py-2.5 text-xs font-bold text-white shadow hover:scale-105 transition-transform"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Connect on WhatsApp for Instant Quote</span>
          </a>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      {status === 'error' && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-700 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Full Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Vikram Rao"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Phone / WhatsApp Number *
          </label>
          <input
            type="tel"
            required
            placeholder="+91 99001 13691"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Email Address *
          </label>
          <input
            type="email"
            required
            placeholder="name@example.com"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Target Destination / Package
          </label>
          <input
            type="text"
            placeholder="e.g. Andaman 5D/4N Trip"
            value={formData.package || formData.destination}
            onChange={(e) => setFormData({...formData, package: e.target.value})}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Travel Dates
          </label>
          <input
            type="text"
            placeholder="e.g. Nov 2026"
            value={formData.travelDates}
            onChange={(e) => setFormData({...formData, travelDates: e.target.value})}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-3 py-3 text-xs sm:text-sm text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Adults
          </label>
          <input
            type="number"
            min={1}
            max={50}
            value={formData.adults}
            onChange={(e) => setFormData({...formData, adults: parseInt(e.target.value) || 1})}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-3 py-3 text-xs sm:text-sm text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Children
          </label>
          <input
            type="number"
            min={0}
            max={20}
            value={formData.children}
            onChange={(e) => setFormData({...formData, children: parseInt(e.target.value) || 0})}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-3 py-3 text-xs sm:text-sm text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
          Special Preferences / Requirements (Optional)
        </label>
        <textarea
          rows={3}
          placeholder="e.g. Honeymoon candlelight dinner, water sports preference, flight requirements from Bangalore..."
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none transition-colors"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#0A1320] py-4 text-sm font-bold text-[#F3B604] shadow-lg hover:bg-slate-800 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
      >
        <Send className="h-4 w-4 text-[#F3B604]" />
        <span>{status === 'submitting' ? 'Submitting Inquiry...' : 'Submit Tour Inquiry'}</span>
      </button>

      <p className="text-center text-[11px] text-slate-500">
        🔒 We value your privacy. No spam. 100% confidential holiday planning.
      </p>
    </form>
  )
}
