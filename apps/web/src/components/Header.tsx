'use client'

import {useState} from 'react'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {Phone, Menu, X} from 'lucide-react'
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
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between gap-4">
          {/* Brand Logo with Image */}
          <Link
            href="/"
            className="flex items-center gap-3 group hover:opacity-95 transition-opacity"
            aria-label="HappyFlying Tours & Travels Home"
          >
            <div className="relative h-11 sm:h-14 w-auto flex items-center justify-center overflow-hidden rounded-xl bg-slate-50/80 p-1 border border-slate-200/60 shadow-xs">
              <img
                src="/happyflyinglogo.avif"
                alt="HappyFlying Tours & Travels"
                className="h-9 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 leading-none">
                HAPPY<span className="text-sky-600">FLYING</span>
              </span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500 mt-0.5">
                Tours & Travels
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navLinks.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
              return (
                <Link
                  key={item._key || item.href}
                  href={item.href}
                  target={item.isExternal ? '_blank' : undefined}
                  className={`rounded-full px-3.5 py-2 text-xs xl:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#F3B604] text-[#0A1320] shadow-sm'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Desktop Direct Call CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-bold shadow-sm transition-all duration-200 bg-[#F3B604] hover:bg-amber-400 text-[#0A1320] hover:scale-105"
              aria-label={`Call ${phone}`}
            >
              <Phone className="h-4 w-4 fill-current" />
              <span>Call NOW</span>
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold bg-[#F3B604] text-[#0A1320] shadow-sm"
              aria-label="Call HappyFlying"
            >
              <Phone className="h-3.5 w-3.5 fill-current" />
              <span>Call</span>
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 pt-2 border-t border-slate-100 animate-in fade-in duration-200">
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
