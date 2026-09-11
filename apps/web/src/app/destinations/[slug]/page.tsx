import {notFound} from 'next/navigation'
import Link from 'next/link'
import type {Metadata} from 'next'
import {
  MapPin,
  Clock,
  Sun,
  Sparkles,
  ChevronLeft,
  CheckCircle2,
  HelpCircle,
  MessageSquare,
  Phone,
  Compass,
} from 'lucide-react'
import {client} from '@/sanity/client'
import {DESTINATION_SLUGS_QUERY} from '@/lib/sanity/queries'
import {getDestinationBySlug, getSiteSettings} from '@/lib/sanity/fetch'
import {SanityImage} from '@/components/SanityImage'
import {PackageCard} from '@/components/PackageCard'
import {FaqJsonLd} from '@/components/JsonLd'

interface DestinationPageProps {
  params: Promise<{slug: string}>
}

export async function generateStaticParams() {
  try {
    const slugs = await client
      .withConfig({useCdn: false})
      .fetch<{slug: string}[]>(DESTINATION_SLUGS_QUERY)
    return slugs.map((item) => ({
      slug: item.slug,
    }))
  } catch {
    return [{slug: 'andaman'}]
  }
}

export async function generateMetadata({params}: DestinationPageProps): Promise<Metadata> {
  const {slug} = await params
  const destination = await getDestinationBySlug(slug)

  if (!destination) {
    if (slug === 'andaman') {
      return {
        title: 'Andaman Travel Guide & Tour Packages',
        description: 'Complete island travel guide for Andaman & Nicobar Islands.',
      }
    }
    return {title: 'Destination Not Found — HappyFlying'}
  }

  const seo = destination.seo
  return {
    title: seo?.metaTitle || `${destination.name} Travel Guide & Packages`,
    description: seo?.metaDescription || destination.shortDescription || `Explore ${destination.name} with HappyFlying`,
    keywords: seo?.keywords || [destination.name, 'travel guide', 'island packages'],
  }
}

export default async function DestinationDetailPage({params}: DestinationPageProps) {
  const {slug} = await params
  const [destination, settings] = await Promise.all([
    getDestinationBySlug(slug),
    getSiteSettings(),
  ])

  if (!destination) {
    if (slug !== 'andaman') {
      return notFound()
    }
  }

  const data = destination || {
    _id: 'dest-andaman',
    _type: 'destination' as const,
    name: 'Andaman & Nicobar Islands',
    slug: {current: 'andaman'},
    country: 'India',
    region: 'Bay of Bengal',
    shortDescription:
      'An emerald tropical paradise featuring turquoise waters, powder-white sandy beaches, vibrant coral reefs, and profound historical heritage.',
    bestTimeToVisit: 'October to May (Sunny days, calm seas, optimal snorkeling & water clarity)',
    idealDuration: '5 Days / 4 Nights to 7 Days / 6 Nights',
    highlights: [
      'Radhanagar Beach — Ranked among Asia\'s Best Beaches',
      'Historic Cellular Jail National Memorial & Light and Sound Show',
      'Elephant Beach coral snorkeling and water sports',
      'Scenic catamaran cruise on Makruzz / Nautika',
      'Neil Island\'s Natural Rock Formation (Howrah Bridge)',
    ],
    thingsToDo: [
      'Scuba Diving & Coral Snorkeling at Elephant Beach',
      'Witnessing golden sunsets at Radhanagar & Laxmanpur Beach',
      'Island hopping by luxury catamaran cruise',
      'Visiting Cellular Jail and Ross Island colonial ruins',
      'Relaxing at barefoot beach cafes & seafood dining',
    ],
    travelTips: [
      'Carry valid government-issued photo ID cards at all airport and ferry checkpoints.',
      'Book catamaran ferry tickets in advance during peak travel season (Oct - Jan).',
      'Point-to-point private cabs are the most reliable and comfortable mode of island travel.',
      'Always follow local harbor master and safety instructions during water sports.',
    ],
  }

  const whatsappNumber = settings.whatsapp ? settings.whatsapp.replace(/[^0-9]/g, '') : '919900113691'
  const phone = settings.phone || '+91 9900113691'

  const heroImageSrc =
    data.heroImage?.asset?.url ||
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85'

  return (
    <div className="bg-slate-50 min-h-screen pb-24 text-slate-900 space-y-12">
      {data.faqs && (
        <FaqJsonLd
          faqs={data.faqs.map((f) => ({
            question: f.question,
            answer: typeof f.answer === 'string' ? f.answer : 'Consult itinerary for details',
          }))}
        />
      )}

      {/* Hero Section */}
      <div className="relative h-[65vh] min-h-[420px] bg-slate-950 text-white overflow-hidden">
        {data.heroImage?.asset ? (
          <SanityImage
            value={data.heroImage}
            width={1600}
            height={900}
            priority
            className="h-full w-full object-cover opacity-50"
            alt={data.name}
          />
        ) : (
          <img
            src={heroImageSrc}
            alt={data.name}
            className="h-full w-full object-cover opacity-50"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 flex flex-col justify-between py-8">
          <div>
            <Link
              href="/destinations"
              className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-white hover:bg-white/30 transition-colors border border-white/20"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>All Destinations</span>
            </Link>
          </div>

          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F3B604]">
              <MapPin className="h-4 w-4" />
              <span>{data.region || data.country}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              {data.name}
            </h1>
            {data.shortDescription && (
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
                {data.shortDescription}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Quick Facts Bar */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.bestTimeToVisit && (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 shrink-0">
                <Sun className="h-6 w-6" />
              </div>
              <div>
                <span className="block text-xs uppercase font-bold tracking-wider text-slate-400">
                  Best Time to Visit
                </span>
                <span className="text-sm font-bold text-slate-900 mt-1 block">
                  {data.bestTimeToVisit}
                </span>
              </div>
            </div>
          )}

          {data.idealDuration && (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-600 shrink-0">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <span className="block text-xs uppercase font-bold tracking-wider text-slate-400">
                  Ideal Trip Length
                </span>
                <span className="text-sm font-bold text-slate-900 mt-1 block">
                  {data.idealDuration}
                </span>
              </div>
            </div>
          )}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 shrink-0">
              <Compass className="h-6 w-6" />
            </div>
            <div>
              <span className="block text-xs uppercase font-bold tracking-wider text-slate-400">
                Concierge Support
              </span>
              <span className="text-sm font-bold text-slate-900 mt-1 block">
                24/7 On-Ground Island Assistance
              </span>
            </div>
          </div>
        </div>

        {/* Highlights & Things to Do */}
        <div className="grid lg:grid-cols-2 gap-8">
          {data.highlights && data.highlights.length > 0 && (
            <div className="rounded-[32px] border border-slate-200 bg-white p-6 sm:p-8 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-xl">
                <Sparkles className="h-5 w-5 text-[#F3B604]" />
                <h2>Top Destination Highlights</h2>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                {data.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {data.thingsToDo && data.thingsToDo.length > 0 && (
            <div className="rounded-[32px] border border-slate-200 bg-white p-6 sm:p-8 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-xl">
                <Compass className="h-5 w-5 text-sky-600" />
                <h2>Top Things to Experience</h2>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                {data.thingsToDo.map((t, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="h-2 w-2 rounded-full bg-[#F3B604] shrink-0 mt-1.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Essential Travel Tips */}
        {data.travelTips && data.travelTips.length > 0 && (
          <div className="rounded-[32px] border border-sky-200 bg-sky-50/50 p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-extrabold text-sky-950">
              💡 Essential Island Travel Tips
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {data.travelTips.map((tip, i) => (
                <div key={i} className="rounded-2xl bg-white p-4 text-xs sm:text-sm text-slate-700 border border-sky-100 shadow-sm">
                  {tip}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Packages for this destination */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Popular Tour Packages for {data.name}
            </h2>
            <Link
              href="/packages"
              className="text-xs sm:text-sm font-bold text-sky-700 hover:underline"
            >
              Browse all packages →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <PackageCard
              pkg={{
                _id: 'pkg-andaman-trip',
                _type: 'travelPackage' as const,
                title: 'Andaman Trip — Exotic 5D/4N Island Getaway',
                slug: {current: 'andaman-trip'},
                duration: '4 N / 5 D',
                rating: 4.8,
                reviewCount: 48,
                packageType: 'Domestic Tour',
                featured: true,
                categories: ['Heritage & Nature', 'Beach & Backwaters'],
                summary: 'PRIVATE CAB + Makruzz Cruise + 4-Star Resort + Elephant Beach Snorkeling.',
                destination: {
                  _id: 'dest-andaman',
                  _type: 'destination' as const,
                  name: data.name,
                  slug: data.slug,
                },
                pricing: {
                  _id: 'p1',
                  _type: 'pricing' as const,
                  finalPrice: 24999,
                  displayPrice: 'Call Us / Custom Quote',
                  title: 'Standard',
                },
              }}
            />
          </div>
        </div>

        {/* Destination CTA */}
        <div className="rounded-[36px] bg-[#0A1320] text-white p-8 sm:p-12 text-center space-y-5 border border-sky-900/40 shadow-2xl">
          <h2 className="text-2xl sm:text-4xl font-extrabold">
            Ready to Plan Your Trip to {data.name}?
          </h2>
          <p className="max-w-xl mx-auto text-xs sm:text-sm text-slate-300">
            Talk to our Bangalore destination specialists for customized date holds, resort upgrades, and private cruises.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi HappyFlying, I would like to plan a vacation to ${data.name}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-3.5 text-xs sm:text-sm font-bold text-white shadow hover:scale-105 transition-transform"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Inquire on WhatsApp</span>
            </a>
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 rounded-full bg-[#F3B604] px-8 py-3.5 text-xs sm:text-sm font-bold text-slate-950 shadow hover:bg-amber-400 transition-transform"
            >
              <Phone className="h-4 w-4 fill-current" />
              <span>Call Concierge ({phone})</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
