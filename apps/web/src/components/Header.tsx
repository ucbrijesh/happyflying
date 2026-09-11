'use client'

import {useState} from 'react'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {Phone, Menu, X, Plane, Compass} from 'lucide-react'
import type {SiteSettings} from '@happyflying/types'

interface HeaderProps {
  settings: SiteSettings
}

export function Header({settings}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = settings.navigation || [
    {_key: '1', label: 'Home', href: '/'},
    {_key: '2', label: 'Packages', href: '/packages'},
    {_key: '3', label: 'Destinations', href: '/destinations'},
    {_key: '4', label: 'Services', href: '/services'},
    {_key: '5', label: 'About', href: '/about'},
    {_key: '6', label: 'Blog', href: '/blog'},
    {_key: '7', label: 'Travel Planner', href: '/travel-planner'},
    {_key: '8', label: 'Contact', href: '/contact'},
  ]

  const phone = settings.phone || '+91 9900113691'

  return (
    <header className="fixed inset-x-0 top-0 z-50 py-2 sm:py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group hover:opacity-95 transition-opacity"
            aria-label="HappyFlying Tours & Travels Home"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#0A1320] via-sky-800 to-sky-600 text-white shadow-md group-hover:scale-105 transition-transform border border-sky-400/30">
              <Plane className="h-5 w-5 text-[#F3B604] transform -rotate-45" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 leading-none">
                HAPPY<span className="text-sky-600">FLYING</span>
              </span>
              <span className="text-[10px] font-semibold tracking-widest uppercase text-slate-500 mt-0.5">
                Tours & Travels
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Pill */}
          <div className="hidden lg:flex flex-1 max-w-3xl items-center justify-between bg-white/90 backdrop-blur-md rounded-full pl-3 pr-2 py-1.5 shadow-sm border border-slate-200/80 mx-4">
            <nav className="flex items-center gap-1">
              {navLinks.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                return (
                  <Link
                    key={item._key || item.href}
                    href={item.href}
                    target={item.isExternal ? '_blank' : undefined}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-[#F3B604] text-[#0A1320] shadow-sm'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/70'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            {/* Direct Call Pill Button */}
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold shadow-sm transition-all duration-200 bg-[#F3B604] hover:bg-amber-400 text-[#0A1320] hover:scale-105"
              aria-label={`Call ${phone}`}
            >
              <Phone className="h-3.5 w-3.5 fill-current" />
              <span>Call NOW</span>
            </a>
          </div>

          {/* Mobile Right Bar */}
          <div className="flex lg:hidden items-center gap-2 bg-white/90 backdrop-blur-md rounded-full px-2 py-1 shadow-sm border border-slate-200/80">
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold bg-[#F3B604] text-[#0A1320]"
              aria-label="Call HappyFlying"
            >
              <Phone className="h-3 w-3 fill-current" />
              <span>Call</span>
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="h-8 w-8 flex items-center justify-center rounded-full text-slate-800 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200 p-4 shadow-xl animate-in fade-in duration-200">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item._key || item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`rounded-2xl px-4 py-2.5 text-sm font-semibold transition-colors flex items-center justify-between ${
                      isActive ? 'bg-[#F3B604] text-[#0A1320]' : 'text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="text-xs">●</span>}
                  </Link>
                )
              })}
              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2 mt-2">
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-[#0A1320] py-3 text-sm font-bold text-white shadow hover:bg-slate-800"
                >
                  <Phone className="h-4 w-4 text-[#F3B604]" />
                  <span>Call {phone}</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
