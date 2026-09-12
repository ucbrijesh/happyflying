import {notFound} from 'next/navigation'
import Link from 'next/link'
import type {Metadata} from 'next'
import {
  Calendar,
  MapPin,
  Star,
  ShieldCheck,
  ChevronLeft,
  MessageSquare,
  Phone,
  Hotel as HotelIcon,
  Activity as ActivityIcon,
  Ship,
  Sparkles,
  HelpCircle,
  Clock,
} from 'lucide-react'
import {client} from '@/sanity/client'
import {PACKAGE_BY_SLUG_QUERY, PACKAGE_SLUGS_QUERY} from '@/lib/sanity/queries'
import {getPackageBySlug, getSiteSettings} from '@/lib/sanity/fetch'
import {ALL_PACKAGES} from '@/lib/data/packagesData'
import {SanityImage} from '@/components/SanityImage'
import {ItineraryTimeline} from '@/components/ItineraryTimeline'
import {InclusionsExclusions} from '@/components/InclusionsExclusions'
import {PackageCard} from '@/components/PackageCard'
import {ProductOfferJsonLd, FaqJsonLd} from '@/components/JsonLd'

interface PackagePageProps {
  params: Promise<{slug: string}>
}

export async function generateStaticParams() {
  try {
    const slugs = await client
      .withConfig({useCdn: false})
      .fetch<{slug: string}[]>(PACKAGE_SLUGS_QUERY)
    
    const set = new Set<string>()
    if (Array.isArray(slugs)) {
      slugs.forEach((item) => {
        if (item?.slug) set.add(item.slug)
      })
    }
    ALL_PACKAGES.forEach((p) => {
      if (p.slug?.current) set.add(p.slug.current)
    })
    return Array.from(set).map((slug) => ({slug}))
  } catch {
    return ALL_PACKAGES.map((p) => ({slug: p.slug.current}))
  }
}

export async function generateMetadata({params}: PackagePageProps): Promise<Metadata> {
  const {slug} = await params
  const pkg = await getPackageBySlug(slug)
  const fallbackPkg = ALL_PACKAGES.find((p) => p.slug.current === slug)
  const target = pkg || fallbackPkg

  if (!target) {
    return {title: 'Tour Package Not Found — HappyFlying'}
  }

  const seo = target.seo
  return {
    title: seo?.metaTitle || `${target.title} — HappyFlying Tours & Travels`,
    description: seo?.metaDescription || target.summary || `Book ${target.title} with HappyFlying Tours & Travels`,
    keywords: seo?.keywords || [target.title, target.destination?.name || 'Travel', 'holiday package'],
    openGraph: {
      title: seo?.metaTitle || target.title,
      description: seo?.metaDescription || target.summary,
      images: [
        {
          url:
            seo?.openGraphImage?.asset?.url ||
            target.hero?.asset?.url ||
            'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}

export default async function PackageDetailPage({params}: PackagePageProps) {
  const {slug} = await params
  const [pkg, settings] = await Promise.all([
    getPackageBySlug(slug),
    getSiteSettings(),
  ])

  const fallbackPkg = ALL_PACKAGES.find((p) => p.slug.current === slug)
  const packageData = pkg || fallbackPkg

  if (!packageData) {
    return notFound()
  }

  const whatsappNumber = settings.whatsapp ? settings.whatsapp.replace(/[^0-9]/g, '') : '919900113691'
  const phone = settings.phone || '+91 9900113691'
  const whatsappMessage = encodeURIComponent(
    `Hi HappyFlying! I am interested in booking the "${packageData.title}" package.`
  )

  const heroImageSrc =
    packageData.hero?.asset?.url ||
    'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=85'

  return (
    <div className="bg-slate-50 min-h-screen pb-24 text-slate-900">
      <ProductOfferJsonLd
        title={packageData.title}
        description={packageData.summary}
        price={packageData.pricing?.finalPrice || 24999}
        image={heroImageSrc}
        rating={packageData.rating || 4.8}
        reviewCount={packageData.reviewCount || 48}
      />

      {packageData.faqs && (
        <FaqJsonLd
          faqs={packageData.faqs.map((f) => ({
            question: f.question,
            answer: typeof f.answer === 'string' ? f.answer : 'Details available in full itinerary',
          }))}
        />
      )}

      {/* 1. BREADCRUMB */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-2">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/packages" className="hover:text-slate-900 transition-colors">
            Packages
          </Link>
          <span>/</span>
          <span className="font-semibold text-slate-900 truncate max-w-xs sm:max-w-md">
            {packageData.title}
          </span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-2 space-y-8">
        {/* Back Button */}
        <div>
          <Link
            href="/packages"
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-100 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back to All Packages</span>
          </Link>
        </div>

        {/* 2. PACKAGE HERO CARD (Split layout with details) */}
        <section className="relative overflow-hidden rounded-[36px] border border-sky-900/30 bg-[#0A1320] text-white shadow-2xl">
          <div className="grid lg:grid-cols-2">
            {/* Hero Image */}
            <div className="relative h-80 lg:h-auto min-h-[380px] bg-slate-950 overflow-hidden">
              {packageData.hero?.asset ? (
                <SanityImage
                  value={packageData.hero}
                  width={1000}
                  height={750}
                  priority
                  className="h-full w-full object-cover"
                  alt={packageData.hero.alt || packageData.title}
                />
              ) : (
                <img
                  src={heroImageSrc}
                  alt={packageData.title}
                  className="h-full w-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1320] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0A1320]" />
            </div>

            {/* Hero Overview Details */}
            <div className="flex flex-col justify-between p-6 sm:p-10 lg:p-12 space-y-6">
              <div className="space-y-4">
                {/* Badges & Rating */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#F3B604] px-3.5 py-1 text-xs font-extrabold text-[#0A1320]">
                    {packageData.packageType || 'Domestic Tour'}
                  </span>
                  <span className="flex items-center gap-1 rounded-full bg-white/15 backdrop-blur-md px-3 py-1 text-xs font-bold text-amber-300 border border-white/10">
                    <Star className="h-3.5 w-3.5 fill-amber-300" />
                    <span>{packageData.rating || 4.8}</span>
                    <span className="text-slate-300 font-normal">({packageData.reviewCount || 48} reviews)</span>
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  {packageData.title}
                </h1>

                <div className="flex items-center gap-2 text-xs sm:text-sm text-sky-200">
                  <MapPin className="h-4 w-4 text-[#F3B604] shrink-0" />
                  <span>{packageData.destination?.name || 'Andaman & Nicobar'}</span>
                  {packageData.destination?.region && (
                    <span className="text-slate-400">• {packageData.destination.region}</span>
                  )}
                </div>

                {packageData.summary && (
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-h-48 overflow-y-auto pr-2">
                    {packageData.summary}
                  </p>
                )}
              </div>

              {/* Duration & Starting Price */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/15">
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                    Trip Duration
                  </span>
                  <span className="flex items-center gap-1.5 text-lg sm:text-xl font-extrabold text-white">
                    <Calendar className="h-4 w-4 text-[#F3B604]" />
                    {packageData.duration}
                  </span>
                </div>

                <div className="text-right">
                  <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                    Package Rate
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-[#F3B604]">
                    {packageData.pricing?.displayPrice || 'Call Us'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. MAIN TWO-COLUMN CONTENT AREA */}
        <div className="grid gap-10 lg:grid-cols-3 items-start">
          {/* LEFT 2 COLUMNS: Overview, Highlights, Timeline, Hotels, Inclusions */}
          <div className="lg:col-span-2 space-y-10">
            {/* Top Highlights Grid */}
            {packageData.highlights && packageData.highlights.length > 0 && (
              <section className="rounded-[32px] border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-slate-900 font-extrabold text-xl">
                  <Sparkles className="h-5 w-5 text-[#F3B604]" />
                  <h2>Tour Highlights</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {packageData.highlights.map((h, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 rounded-2xl bg-sky-50/60 p-3.5 border border-sky-100/80 text-xs sm:text-sm text-slate-800"
                    >
                      <span className="h-2 w-2 rounded-full bg-sky-600 shrink-0 mt-1.5" />
                      <span className="font-medium">{h}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Day-by-Day Timeline Itinerary */}
            <section className="rounded-[32px] border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <ItineraryTimeline days={packageData.itinerary} />
            </section>

            {/* Inclusions & Exclusions */}
            <section>
              <InclusionsExclusions
                inclusions={packageData.inclusions}
                exclusions={packageData.exclusions}
                importantNotes={packageData.importantNotes}
                cancellationPolicy={packageData.cancellationPolicy}
              />
            </section>

            {/* Hotels & Stays Section */}
            {packageData.hotels && packageData.hotels.length > 0 && (
              <section className="rounded-[32px] border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center gap-2 text-slate-900 font-extrabold text-xl">
                  <HotelIcon className="h-5 w-5 text-sky-600" />
                  <h2>Accommodations & Resorts</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  {packageData.hotels.map((hotel, i) => (
                    <div
                      key={hotel._id || i}
                      className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50/50 p-4 space-y-3"
                    >
                      {hotel.heroImage?.asset && (
                        <div className="aspect-[16/9] w-full rounded-xl overflow-hidden">
                          <SanityImage
                            value={hotel.heroImage}
                            width={500}
                            height={280}
                            className="h-full w-full object-cover"
                            alt={hotel.name}
                          />
                        </div>
                      )}
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-slate-900 text-sm">{hotel.name}</h3>
                          {hotel.starRating && (
                            <span className="flex items-center text-xs font-bold text-amber-500">
                              ★ {hotel.starRating}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-1">{hotel.category}</p>
                        {hotel.mealPlan && (
                          <div className="mt-2 text-[11px] font-semibold text-sky-700 bg-sky-100/70 px-2.5 py-0.5 rounded-md inline-block">
                            Meal Plan: {hotel.mealPlan}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Package FAQs */}
            {packageData.faqs && packageData.faqs.length > 0 && (
              <section className="rounded-[32px] border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-slate-900 font-extrabold text-xl">
                  <HelpCircle className="h-5 w-5 text-sky-600" />
                  <h2>Frequently Asked Questions</h2>
                </div>
                <div className="space-y-3">
                  {packageData.faqs.map((faq, i) => (
                    <div key={faq._id || i} className="rounded-2xl bg-slate-50 p-4 border border-slate-200/80">
                      <h3 className="text-sm font-bold text-slate-900">{faq.question}</h3>
                      <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                        {typeof faq.answer === 'string' ? faq.answer : JSON.stringify(faq.answer)}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* RIGHT 1 COLUMN: STICKY BOOKING CARD */}
          <div className="space-y-6 lg:sticky lg:top-24">
            <div className="rounded-[32px] border border-sky-900/30 bg-[#0A1320] text-white p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F3B604]/20 px-3 py-1 text-xs font-bold text-[#F3B604]">
                  <ShieldCheck className="h-3.5 w-3.5" /> Certified Tour Guarantee
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold">Book & Customise</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Speak directly with our Bangalore travel concierges for instant seat holds, custom dates, or group discounts.
                </p>
              </div>

              {/* Pricing breakdown summary */}
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Starting Rate</span>
                  <span className="font-bold text-white">{packageData.pricing?.displayPrice || 'Call Us'}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Occupancy</span>
                  <span className="font-semibold text-white">{packageData.pricing?.occupancy || 'Double Sharing'}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Cruise Tickets</span>
                  <span className="font-semibold text-emerald-400">Included (Premium)</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>AC Dedicated Vehicle</span>
                  <span className="font-semibold text-emerald-400">Included (Point to Point)</span>
                </div>
              </div>

              {/* Direct Booking CTAs */}
              <div className="space-y-3 pt-2">
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] py-4 text-sm font-bold text-white shadow-md transition-all hover:scale-105 active:scale-95"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Inquire on WhatsApp</span>
                </a>

                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#F3B604] py-4 text-sm font-bold text-slate-950 shadow-md transition-all hover:bg-amber-400 hover:scale-105 active:scale-95"
                >
                  <Phone className="h-4 w-4 fill-current" />
                  <span>Call Advisor ({phone})</span>
                </a>
              </div>

              <div className="pt-4 border-t border-white/10 text-center text-[11px] text-slate-400">
                HappyFlying Tours & Travels LLP • Bangalore, Karnataka
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
