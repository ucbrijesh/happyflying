import type {Metadata} from 'next'
import {
  MapPin,
  Mail,
  Phone,
  MessageSquare,
  Clock,
  Sparkles,
} from 'lucide-react'
import {getSiteSettings} from '@/lib/sanity/fetch'
import {EnquiryForm} from '@/components/EnquiryForm'

export const metadata: Metadata = {
  title: 'Contact Us — HappyFlying Tours & Travels Bangalore',
  description:
    'Contact HappyFlying Tours & Travels. Reach our Bangalore office in Koramangala or speak with our travel concierges directly on WhatsApp.',
}

export default async function ContactPage() {
  const settings = await getSiteSettings()
  const phone = settings.phone || '+91 9900113691'
  const whatsapp = settings.whatsapp || '919900113691'
  const email = settings.email || 'operations@happyflyingtravels.com'
  const address =
    settings.address ||
    'No 145, 3rd Floor, 80 Feet Road KHB Colony, 5th Block, Koramangala, Bangalore, Karnataka 560034'

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto w-full space-y-12">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
          <MessageSquare className="h-3.5 w-3.5" /> Direct Concierge Line
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Get in Touch with Our Travel Specialists
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
          Planning a family holiday, romantic island honeymoon, or customized group retreat? Connect with our Bangalore travel team for instant consultation and transparent quotes.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-10 items-start">
        {/* Left Column: Direct Contact Details & Info */}
        <div className="space-y-6">
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 sm:p-8 space-y-6 shadow-sm">
            <h2 className="text-xl font-extrabold text-slate-900">Bangalore Headquarters</h2>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <span className="block font-bold text-slate-900">Office Address</span>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">{address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 shrink-0">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <span className="block font-bold text-slate-900">Phone Support</span>
                  <a
                    href={`tel:${phone.replace(/\s+/g, '')}`}
                    className="text-sky-700 font-semibold hover:underline"
                  >
                    {phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shrink-0">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <div>
                  <span className="block font-bold text-slate-900">WhatsApp Concierge</span>
                  <a
                    href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 font-semibold hover:underline"
                  >
                    Chat directly on WhatsApp
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <span className="block font-bold text-slate-900">Email Inquiries</span>
                  <a
                    href={`mailto:${email}`}
                    className="text-sky-700 font-semibold hover:underline"
                  >
                    {email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-slate-100">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-50 text-slate-600 shrink-0">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <span className="block font-bold text-slate-900">Working Hours</span>
                  <p className="text-slate-500 text-xs">Mon - Sat: 9:00 AM - 8:00 PM IST</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 2 Columns: Interactive Enquiry Form */}
        <div className="lg:col-span-2 rounded-[36px] border border-slate-200/80 bg-white p-6 sm:p-10 shadow-lg">
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold text-slate-900">Send an Online Inquiry</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Share your travel details below and our travel concierge will get back to you within a few hours.
            </p>
          </div>

          <EnquiryForm settings={settings} />
        </div>
      </div>
    </div>
  )
}
