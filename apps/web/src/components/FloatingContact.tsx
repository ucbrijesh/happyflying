'use client'

import {useState} from 'react'
import {Phone, MessageSquare, Sparkles} from 'lucide-react'
import type {SiteSettings} from '@happyflying/types'
import {EnquiryModal} from './EnquiryModal'

interface FloatingContactProps {
  settings: SiteSettings
  packageTitle?: string
}

export function FloatingContact({settings, packageTitle}: FloatingContactProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const whatsappNumber = settings.whatsapp ? settings.whatsapp.replace(/[^0-9]/g, '') : '919900113691'
  const phoneNumber = settings.phone ? settings.phone.replace(/\s+/g, '') : '+919900113691'

  const whatsappMessage = packageTitle
    ? encodeURIComponent(`Hi HappyFlying, I am interested in the ${packageTitle} package.`)
    : encodeURIComponent(`Hi HappyFlying, I would like to plan a holiday trip.`)

  return (
    <>
      {/* Desktop Floating Right Action Buttons */}
      <aside aria-label="Quick Contact Options" className="fixed bottom-6 right-6 z-40 hidden sm:flex flex-col items-end gap-3">
        <a
          href={`tel:${phoneNumber}`}
          className="group flex items-center gap-2 rounded-full bg-[#F3B604] px-4 py-3 text-slate-900 font-bold shadow-xl transition-all duration-300 hover:scale-105 hover:bg-amber-400 border border-white/40"
          aria-label={`Call ${settings.phone || '+91 9900113691'}`}
          title="Direct Call"
        >
          <Phone className="h-4 w-4 fill-current" />
          <span className="text-xs tracking-wide">Call Now</span>
        </a>

        <a
          href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-white font-bold shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#20bd5a] border border-white/30"
          aria-label="WhatsApp Inquiry"
          title="Chat on WhatsApp"
        >
          <MessageSquare className="h-4 w-4 fill-current" />
          <span className="text-xs tracking-wide">WhatsApp</span>
        </a>
      </aside>

      {/* Mobile Bottom Sticky Bar */}
      <nav aria-label="Mobile Quick Actions" className="fixed bottom-0 inset-x-0 z-40 sm:hidden bg-white/95 backdrop-blur-lg border-t border-slate-200 px-3 py-2.5 shadow-2xl flex items-center gap-2">
        <a
          href={`tel:${phoneNumber}`}
          className="flex-1 flex items-center justify-center gap-1.5 rounded-2xl bg-slate-100 py-3 text-xs font-bold text-slate-900 active:bg-slate-200"
          aria-label="Call Advisor"
        >
          <Phone className="h-3.5 w-3.5 text-slate-900" />
          <span>Call</span>
        </a>

        <a
          href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 rounded-2xl bg-[#25D366] py-3 text-xs font-bold text-white shadow active:opacity-90"
          aria-label="WhatsApp Advisor"
        >
          <MessageSquare className="h-3.5 w-3.5 fill-current" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={() => setModalOpen(true)}
          className="flex-1 flex items-center justify-center gap-1.5 rounded-2xl bg-[#0A1320] py-3 text-xs font-bold text-[#F3B604] shadow active:bg-slate-800"
        >
          <Sparkles className="h-3.5 w-3.5 text-[#F3B604]" />
          <span>Enquire</span>
        </button>
      </nav>

      {/* Reusable Enquiry Modal */}
      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultPackage={packageTitle}
        settings={settings}
      />
    </>
  )
}
