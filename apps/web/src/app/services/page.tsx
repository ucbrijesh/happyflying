import type {Metadata} from 'next'
import Link from 'next/link'
import {
  Plane,
  Globe,
  Compass,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Users,
} from 'lucide-react'
import {getAllServices, getSiteSettings} from '@/lib/sanity/fetch'

export const metadata: Metadata = {
  title: 'Travel Services — HappyFlying Tours & Travels',
  description:
    'Comprehensive travel services: bespoke holiday packages, airline bookings, luxury cruise reservations, and 24/7 on-ground assistance.',
}

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([
    getAllServices(),
    getSiteSettings(),
  ])

  const serviceList =
    services.length > 0
      ? services
      : [
          {
            _id: 's1',
            _type: 'service' as const,
            title: 'Bespoke Holiday Packages',
            slug: {current: 'bespoke-holidays'},
            shortDescription:
              'Custom tailored domestic and international itineraries designed around your preferences and pace.',
            icon: 'globe',
            features: [
              'Customized Day-by-Day Itineraries',
              'Handpicked 4-Star & 5-Star Accommodations',
              'Private Dedicated AC Vehicles',
              '24/7 On-Ground Concierge Assistance',
            ],
          },
          {
            _id: 's2',
            _type: 'service' as const,
            title: 'Flight & Cruise Ticketing',
            slug: {current: 'flights-cruises'},
            shortDescription:
              'Seamless domestic & international airline bookings alongside premium catamaran cruise reservations.',
            icon: 'plane',
            features: [
              'Competitive Group & Family Fares',
              'Instant Makruzz / Nautika Cruise Holds',
              'Flexible Rescheduling Support',
              'Airport Meet & Greet Assistance',
            ],
          },
          {
            _id: 's3',
            _type: 'service' as const,
            title: 'Luxury Honeymoons & Anniversaries',
            slug: {current: 'luxury-honeymoons'},
            shortDescription:
              'Romantic beachfront resorts, private sunset cruises, and candlelight dinners curated for couples.',
            icon: 'sparkles',
            features: [
              'Private Beach Villa Stays',
              'Candlelight Beach Dinners',
              'Couples Scuba & Snorkeling Sessions',
              'Complimentary Honeymoon Cake & Decor',
            ],
          },
          {
            _id: 's4',
            _type: 'service' as const,
            title: 'Corporate & Group Offsites',
            slug: {current: 'corporate-retreats'},
            shortDescription:
              'End-to-end event management, team offsites, conference halls, and island group excursions.',
            icon: 'users',
            features: [
              'Dedicated Event Managers',
              'Charter Cruise & Bus Bookings',
              'Conference & Team Building Activities',
              'GST Invoicing & Corporate Billing',
            ],
          },
        ]

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto w-full space-y-12">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
          <Globe className="h-3.5 w-3.5" /> What We Offer
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Comprehensive Travel & Concierge Services
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
          From personalized luxury vacations to seamless flight and catamaran ticketing, discover how HappyFlying crafts stress-free journeys.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {serviceList.map((service) => (
          <div
            key={service._id}
            className="rounded-[32px] border border-slate-200/80 bg-white p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-sky-600 to-indigo-600 text-white shadow">
                <Plane className="h-6 w-6 text-[#F3B604]" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">
                <Link href={`/services/${service.slug.current}`} className="hover:text-sky-600 transition-colors">
                  {service.title}
                </Link>
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {service.shortDescription}
              </p>

              {service.features && service.features.length > 0 && (
                <ul className="space-y-2 pt-2 border-t border-slate-100 text-xs sm:text-sm text-slate-700">
                  {service.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="pt-4">
              <Link
                href={`/services/${service.slug.current}`}
                className="inline-flex items-center gap-2 rounded-2xl bg-[#0A1320] px-5 py-3 text-xs font-bold text-[#F3B604] hover:bg-slate-800 transition-colors"
              >
                <span>Learn More & Enquire</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
