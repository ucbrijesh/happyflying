import Link from 'next/link'
import {
  Sparkles,
  Plane,
  Compass,
  ArrowRight,
  ShieldCheck,
  Crown,
  Users,
  MapPin,
  Calendar,
  MessageSquare,
  Phone,
  CheckCircle2,
} from 'lucide-react'
import {
  getSiteSettings,
  getFeaturedPackages,
  getAllDestinations,
  getTestimonials,
} from '@/lib/sanity/fetch'
import {PackageCard} from '@/components/PackageCard'
import {DestinationCard} from '@/components/DestinationCard'
import {PartnerMarquee} from '@/components/PartnerMarquee'
import {TestimonialSlider} from '@/components/TestimonialSlider'

export default async function HomePage() {
  const [settings, featuredPackages, destinations, testimonials] = await Promise.all([
    getSiteSettings(),
    getFeaturedPackages(),
    getAllDestinations(),
    getTestimonials(),
  ])

  const whatsappNumber = settings.whatsapp ? settings.whatsapp.replace(/[^0-9]/g, '') : '919900113691'
  const phone = settings.phone || '+91 9900113691'

  return (
    <div className="flex flex-col">
      {/* 1. LUXURY HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950 text-white px-4 sm:px-6 py-20 sm:py-28">
        {/* Background Image / Ambient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85"
            alt="Tropical Paradise"
            className="h-full w-full object-cover opacity-35 filter brightness-75 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/80" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6 sm:space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-slate-900/60 backdrop-blur-xl px-4 py-1.5 text-xs sm:text-sm font-semibold text-sky-200">
            <Sparkles className="h-4 w-4 text-[#F3B604]" />
            <span>{settings.companyName || 'HappyFlying Tours & Travels LLP'}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Explore the World <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-sky-400 via-[#F3B604] to-emerald-400 bg-clip-text text-transparent">
              Beyond Limits
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-xl text-slate-200 leading-relaxed font-normal">
            {settings.tagline ||
              'Wings to wonder, Indian heritage trails & bespoke international holidays crafted around you.'}
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/packages"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#F3B604] px-8 py-4 text-sm font-bold text-slate-950 shadow-xl transition-all duration-300 hover:scale-105 hover:bg-amber-400"
            >
              <span>Explore Tour Packages</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/travel-planner"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-md px-8 py-4 text-sm font-bold text-white shadow-xl transition-all duration-300 hover:bg-white/20"
            >
              <Compass className="h-4 w-4 text-[#F3B604]" />
              <span>AI Travel Planner</span>
            </Link>

            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hi HappyFlying! I want to plan my next vacation.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-4 text-sm font-bold text-white shadow-xl transition-all duration-300 hover:scale-105"
            >
              <MessageSquare className="h-4 w-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>

          {/* Quick Assurance Badges */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[#F3B604]" /> 100% Certified Agency
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[#F3B604]" /> Verified 4-Star & 5-Star Stays
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[#F3B604]" /> 24/7 On-Ground Concierge
            </span>
          </div>
        </div>
      </section>

      {/* 2. FEATURED TOUR PACKAGES SECTION */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-700 mb-2">
              <Sparkles className="h-3.5 w-3.5" /> Handcrafted Holiday Packages
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Featured Island & Heritage Getaways
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl">
              From the exotic turquoise beaches of Andaman to luxury retreats, explore our highest-rated vacation packages.
            </p>
          </div>

          <Link
            href="/packages"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-sky-700 hover:text-sky-900 transition-colors"
          >
            <span>View All Packages</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {featuredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPackages.map((pkg) => (
              <PackageCard key={pkg._id} pkg={pkg} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Fallback Andaman Card if dataset not seeded yet */}
            <PackageCard
              pkg={{
                _id: 'pkg-andaman-trip',
                _type: 'travelPackage',
                title: 'Andaman Trip — Exotic 5D/4N Island Getaway',
                slug: {current: 'andaman-trip'},
                duration: '4 N / 5 D',
                rating: 4.8,
                reviewCount: 48,
                packageType: 'Domestic Tour',
                featured: true,
                categories: ['Heritage & Nature', 'Beach & Backwaters', 'Honeymoon & Luxury'],
                summary:
                  'PRIVATE CAB + Makruzz Cruise + 4-Star Resort + Elephant Beach Snorkeling + Cellular Jail Light & Sound Show.',
                destination: {
                  _id: 'dest-andaman',
                  _type: 'destination',
                  name: 'Andaman & Nicobar',
                  slug: {current: 'andaman'},
                },
                pricing: {
                  _id: 'p1',
                  _type: 'pricing',
                  finalPrice: 24999,
                  displayPrice: 'Call Us / Custom Quote',
                  title: 'Standard',
                },
              }}
            />
          </div>
        )}
      </section>

      {/* 3. AI TRAVEL PLANNER TEASER SECTION */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-slate-900 to-[#0A1320] text-white">
        <div className="max-w-5xl mx-auto rounded-[36px] border border-sky-500/30 bg-white/5 p-8 sm:p-14 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#F3B604]/10 blur-3xl" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-sky-300">
                <Compass className="h-3.5 w-3.5" /> Smart Travel Concierge
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                HappyFlying <br />
                <span className="bg-gradient-to-r from-sky-400 via-[#F3B604] to-emerald-300 bg-clip-text text-transparent">
                  TravelIntell AI Assistant
                </span>
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Generate custom multi-day island itineraries, discover flight connections, and receive personalized holiday advice tailored to your budget and travel preferences.
              </p>
              <div className="pt-2">
                <Link
                  href="/travel-planner"
                  className="inline-flex items-center gap-2 rounded-full bg-[#F3B604] px-8 py-3.5 text-sm font-bold text-slate-950 shadow hover:bg-amber-400 transition-all hover:scale-105"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Launch AI Travel Planner</span>
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-sky-400/30 bg-slate-900/80 p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-amber-500" />
                <div className="h-3 w-3 rounded-full bg-emerald-500" />
                <span className="text-xs font-mono text-slate-400 ml-2">travelintell.assistant.ai</span>
              </div>
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="rounded-2xl bg-slate-800/80 p-3.5 text-slate-200">
                  <span className="text-[#F3B604] font-bold">You:</span> Plan a 5-day honeymoon in Andaman with private cruises and beach dinners.
                </div>
                <div className="rounded-2xl bg-sky-950/60 p-3.5 text-sky-100 border border-sky-800/40">
                  <span className="text-sky-400 font-bold">TravelIntell:</span> Perfect! I recommend 2 nights in Port Blair + 1 night Havelock (Radhanagar Sunset) + 1 night Neil Island. Includes Makruzz Catamaran cruise & private AC vehicle.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DESTINATION DISCOVERY */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-700">
            Curated Destinations
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Discover Your Next Dream Destination
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Handpicked islands and cultural regions curated with local insights and luxury hospitality.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.length > 0 ? (
            destinations.map((dest) => (
              <DestinationCard key={dest._id} destination={dest} />
            ))
          ) : (
            <DestinationCard
              destination={{
                _id: 'dest-andaman',
                _type: 'destination',
                name: 'Andaman & Nicobar Islands',
                slug: {current: 'andaman'},
                region: 'Bay of Bengal',
                country: 'India',
                shortDescription: 'Turquoise ocean waters, powder white sand beaches, and deep coral reef biodiversity.',
                idealDuration: '5 - 7 Days',
              }}
            />
          )}
        </div>
      </section>

      {/* 5. TRUSTED GLOBAL PARTNERS & AIRLINES */}
      <section className="py-16 px-4 sm:px-6 bg-[#0A1320] text-white">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
              Trusted Global Airline & Hospitality Network
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
              Partners That Elevate Every Journey
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-300">
              Connecting top-tier airlines, luxury resort groups, and on-ground logistics for seamless holidays.
            </p>
          </div>

          <PartnerMarquee />
        </div>
      </section>

      {/* 6. WHY CHOOSE HAPPYFLYING */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-700">
              Why Choose HappyFlying
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Your Trusted Bangalore Travel Partner for Domestic & Global Holidays
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Headquartered in Koramangala, Bangalore, HappyFlying brings 10+ years of travel craftsmanship, 100% verified hotels, pre-booked catamaran cruises, and 24/7 on-ground assistance to every trip.
            </p>
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-sky-700 hover:text-sky-900"
              >
                <span>Read our full story</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">100% Certified Agency</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Registered travel LLP providing complete travel safety, transparent invoicing, and zero hidden charges.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
                <Crown className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Handcrafted Packages</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tailor-made itineraries with private dedicated AC vehicles and prime-slot Makruzz / Nautika cruise tickets.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Verified Local Guides</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                On-ground executives at airports, ferry jetties, and attraction gates for seamless coordination.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">24/7 Concierge Support</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dedicated personal tour coordinator reachable anytime via WhatsApp or phone throughout your journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TRAVELER TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="py-16 sm:py-24 px-4 sm:px-6 bg-slate-100/60">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-700">
                Traveler Stories
              </span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Loved by Families & Honeymooners
              </h2>
              <p className="mt-2 text-slate-600 text-sm">
                Real feedback from travelers who explored the world with HappyFlying Tours & Travels.
              </p>
            </div>

            <TestimonialSlider testimonials={testimonials} />
          </div>
        </section>
      )}

      {/* 8. FINAL LUXURY CTA SECTION */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-slate-950 text-white">
        <div className="max-w-5xl mx-auto rounded-[36px] bg-gradient-to-r from-sky-900 via-[#0A1320] to-slate-900 border border-sky-500/30 p-8 sm:p-14 text-center space-y-6 shadow-2xl">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F3B604]/20 text-[#F3B604] text-xs font-bold uppercase tracking-wider">
            Ready for takeoff?
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Let's Craft Your Dream Holiday Today
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed">
            Speak directly with our destination concierges in Bangalore for customized dates, luxury cruise upgrades, and instant group discounts.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hi HappyFlying! I would like to enquire about holiday packages.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-sm font-bold text-white shadow-lg hover:scale-105 transition-transform"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Inquire on WhatsApp</span>
            </a>
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 rounded-full bg-[#F3B604] px-8 py-4 text-sm font-bold text-slate-950 shadow-lg hover:bg-amber-400 transition-transform"
            >
              <Phone className="h-4 w-4 fill-current" />
              <span>Call Advisor ({phone})</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
