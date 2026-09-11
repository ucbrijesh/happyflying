import Link from 'next/link'
import {Plane, MapPin, Mail, Phone, MessageSquare} from 'lucide-react'
import type {SiteSettings} from '@happyflying/types'

interface FooterProps {
  settings: SiteSettings
}

export function Footer({settings}: FooterProps) {
  const companyName = settings.companyName || 'HappyFlying Tours & Travels LLP'
  const address = settings.address || 'No 145, 3rd Floor, 80 Feet Road KHB Colony, 5th Block, Koramangala, Bangalore, Karnataka 560034'
  const email = settings.email || 'operations@happyflyingtravels.com'
  const phone = settings.phone || '+91 9900113691'
  const whatsapp = settings.whatsapp || '919900113691'

  return (
    <footer className="border-t border-sky-900/40 bg-[#0A1320] px-4 sm:px-6 py-12 sm:py-16 text-white mt-auto">
      <div className="max-w-7xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand Column */}
        <div className="space-y-4">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-sky-600 to-indigo-600 text-white shadow">
              <Plane className="h-5 w-5 text-[#F3B604] transform -rotate-45" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">
              HAPPY<span className="text-[#F3B604]">FLYING</span>
            </span>
          </Link>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm">
            {settings.footerText || 'Where every journey takes wing with elegance, care, and unforgettable discovery. Headquartered in Koramangala, Bangalore.'}
          </p>

          <div className="pt-2 space-y-2 text-xs text-slate-300">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
              <span>{address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-[#F3B604] shrink-0" />
              <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                {email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
              <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                {phone}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-3">
            <a
              href="https://www.instagram.com/happyflying.in"
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 hover:scale-110 transition-transform shadow-md text-white"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-9 w-9 place-items-center rounded-full bg-[#25D366] hover:scale-110 transition-transform shadow-md text-white"
              aria-label="WhatsApp"
            >
              <MessageSquare className="h-4 w-4 text-white" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-9 w-9 place-items-center rounded-full bg-red-600 hover:scale-110 transition-transform shadow-md text-white"
              aria-label="YouTube"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Explore Links */}
        <div>
          <h3 className="mb-4 font-bold text-sm uppercase tracking-wider text-[#F3B604]">
            Popular Tours
          </h3>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
            <li>
              <Link href="/packages/andaman-trip" className="hover:text-white transition-colors">
                Andaman 5D/4N Island Trip
              </Link>
            </li>
            <li>
              <Link href="/destinations/andaman" className="hover:text-white transition-colors">
                Andaman Islands Guide
              </Link>
            </li>
            <li>
              <Link href="/packages" className="hover:text-white transition-colors">
                All Holiday Packages
              </Link>
            </li>
            <li>
              <Link href="/travel-planner" className="hover:text-white transition-colors">
                AI Travel Planner
              </Link>
            </li>
          </ul>
        </div>

        {/* Services & Company */}
        <div>
          <h3 className="mb-4 font-bold text-sm uppercase tracking-wider text-[#F3B604]">
            Services & Company
          </h3>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
            <li>
              <Link href="/services" className="hover:text-white transition-colors">
                Bespoke Tour Design
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition-colors">
                About HappyFlying
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-white transition-colors">
                Travel Blog & Insights
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact & Support
              </Link>
            </li>
          </ul>
        </div>

        {/* Sanity Studio & Assurance */}
        <div className="space-y-4">
          <h3 className="font-bold text-sm uppercase tracking-wider text-[#F3B604]">
            Certified Travel Partner
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Headquartered in Bangalore with 10+ years of travel excellence, 100% verified hotels, and dedicated point-of-contact tour coordinators.
          </p>
          <div className="rounded-2xl border border-sky-700/40 bg-white/5 p-4 text-xs space-y-2">
            <div className="font-semibold text-sky-300">100% CMS-Driven Platform</div>
            <p className="text-slate-400">
              Content is powered live via Sanity.io Content Lake with instant visual editing.
            </p>
            <a
              href="http://localhost:3333"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-[#F3B604] hover:underline font-medium text-xs mt-1"
            >
              Open Sanity Studio ↗
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
        <p>© {new Date().getFullYear()} {companyName}. All rights reserved.</p>
        <p>Crafted for Luxury Travel Experiences • Bangalore, India</p>
      </div>
    </footer>
  )
}
