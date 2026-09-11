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
    return slugs.map((item) => ({
      slug: item.slug,
    }))
  } catch {
    return [{slug: 'andaman-trip'}]
  }
}

export async function generateMetadata({params}: PackagePageProps): Promise<Metadata> {
  const {slug} = await params
  const pkg = await getPackageBySlug(slug)

  if (!pkg) {
    if (slug === 'andaman-trip') {
      return {
        title: 'Andaman Trip — 5D/4N Island Holiday Package',
        description: 'Explore Andaman with private AC cabs, Makruzz cruise, Radhanagar sunset, and Elephant beach snorkeling.',
      }
    }
    return {title: 'Tour Package Not Found — HappyFlying'}
  }

  const seo = pkg.seo
  return {
    title: seo?.metaTitle || `${pkg.title} — HappyFlying Tours & Travels`,
    description: seo?.metaDescription || pkg.summary || `Book ${pkg.title} with HappyFlying Tours & Travels`,
    keywords: seo?.keywords || [pkg.title, pkg.destination?.name || 'Andaman', 'holiday package'],
    openGraph: {
      title: seo?.metaTitle || pkg.title,
      description: seo?.metaDescription || pkg.summary,
      images: [
        {
          url:
            seo?.openGraphImage?.asset?.url ||
            pkg.hero?.asset?.url ||
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

  if (!pkg) {
    // If not found in live Sanity Lake yet, check if it's the Andaman seed fallback
    if (slug !== 'andaman-trip') {
      return notFound()
    }
  }

  // Use Sanity package or fallback to Andaman reference data
  const packageData = pkg || {
    _id: 'pkg-andaman-trip',
    _type: 'travelPackage',
    title: 'Andaman Trip — Exotic 5D/4N Island Getaway',
    slug: {current: 'andaman-trip'},
    packageCode: 'HF-AND-01',
    packageType: 'Domestic Tour',
    categories: ['Heritage & Nature', 'Family Holiday', 'Beach & Backwaters', 'Honeymoon & Luxury'],
    status: 'active',
    duration: '4 N / 5 D',
    rating: 4.8,
    reviewCount: 48,
    summary:
      'PRIVATE CAB - Airport Pick Up + Port Blair Hotel to Cellular Jail + Corbyns Cove Beach + Havelock Jetty to Hotel + Radhanagar Beach + Neil Jetty to Hotel + Elephant Beach Snorkeling + Laxmanpur + Bharatpur + Natural Rock Formation + Airport Drop.\n\nTICKETS & ACTIVITIES - Cellular Jail Entry + Light & Sound Show + Cruise Port Blair to Havelock (Makruzz / Nautika Premium Class) + Cruise Havelock to Neil + Elephant Beach Boat Ride Tickets + Cruise Neil to Port Blair.\n\nHOTEL STAY - 2 Nights in Port Blair, 1 Night in Havelock, 1 Night in Neil Island with Complimentary Breakfast & Dinner.',
    highlights: [
      'All Island Sightseeing by Private Dedicated AC Vehicle',
      'Makruzz / Nautika Premium Class Catamaran Cruise Tickets Included',
      'Elephant Beach Speedboat Ride & Coral Reef Snorkeling',
      'Radhanagar Beach Sunset (Ranked among Asia\'s Best Beaches)',
      'Cellular Jail National Memorial Entry & Light and Sound Show',
      '2 Nights Port Blair, 1 Night Havelock, 1 Night Neil with Breakfast + Dinner',
    ],
    destination: {
      _id: 'dest-andaman',
      _type: 'destination',
      name: 'Andaman & Nicobar Islands',
      slug: {current: 'andaman'},
      region: 'Bay of Bengal',
      bestTimeToVisit: 'October to May',
    },
    inclusions: [
      'Accommodation in rooms as given at hotels in Port Blair, Havelock and Neil with breakfast + dinner and all taxes on Double sharing basis.',
      'Daily breakfast except on day of arrival.',
      'Meet and greet service at Veer Savarkar Airport, Port Blair.',
      'All sightseeing by 01 Private AC Vehicle at all the islands (point to point within city limits).',
      'Transfer to Port Blair / Havelock / Neil in Private Catamaran Nautika / Makruzz (Premium Class).',
      'Full-day tour with all transfers including airport pick up and drop.',
      'All entry tickets, ferry tickets and permit charges.',
      'Packed breakfast provided if your tour or ferry departs early morning.',
      'Dedicated Personal Tour Coordinator for single point of contact.',
      'On-ground field executives at all major entry & exit points (Airport, Jetty, Jail, Water sports complex).',
    ],
    exclusions: [
      'Lunch is not included unless explicitly chosen as a custom meal plan add-on.',
      'Vehicle not at disposal at any of the islands (cabs are point to point as per itinerary).',
      'No extra pickup or drop included for unscheduled dining/shopping.',
      'Personal expenses, laundry, telephone calls, alcoholic & non-alcoholic beverages.',
      'Any expense arising due to unforeseen weather or flight delays.',
    ],
    importantNotes: [
      'Guest must carry valid government photo identification (Aadhaar / Passport / Voter ID) at all times.',
      'Ferry sailing timings are subject to weather and port authorities\' discretion.',
      'Hotels have standard checkout times (typically 9:00 AM - 10:00 AM). Luggage may be kept in reception kiosk for afternoon departures.',
      'Snorkeling depends on harbor association safety regulations on that day.',
    ],
    cancellationPolicy: [
      '30+ days prior to departure: 15% cancellation fee.',
      '15 to 29 days prior to departure: 50% cancellation fee.',
      'Less than 15 days prior to departure: 100% cancellation fee.',
      'Cruise and flight tickets are subject to carrier cancellation terms.',
    ],
    pricing: {
      _id: 'p1',
      _type: 'pricing',
      title: 'Standard Plan',
      finalPrice: 24999,
      displayPrice: 'Call Us / Custom Quote',
      occupancy: 'Double Sharing (2 Adults)',
      mealPlan: 'Complimentary Breakfast & Dinner (MAP)',
    },
    itinerary: [
      {
        _id: 'day-1',
        _type: 'itineraryDay',
        dayNumber: 1,
        title: 'Airport Pickup, Carbyn\'s Cove Beach & Cellular Jail Light & Sound Show',
        location: 'Port Blair',
        description:
          'Airport Welcome: Arrive at Veer Savarkar International Airport, Port Blair, where our HappyFlying representative greets you with warmth and assists with a smooth transfer to your hotel.\n\nCarbyn\'s Cove Beach: Stroll along the shoreline, enjoy the sea breeze, or relax by turquoise waters.\n\nCellular Jail Visit: Explore the historic corridors that narrate India\'s freedom struggle.\n\nLight & Sound Show: Watch the heroic chapters of Kala Pani come alive through light and narration.',
        morning: 'Airport welcome and private cab transfer to hotel.',
        afternoon: 'Seaside drive to Carbyn\'s Cove Beach.',
        evening: 'Cellular Jail visit and historic Light & Sound Show.',
        overnight: 'Overnight stay at Hotel in Port Blair',
        meals: ['Dinner Included'],
        importantNote: 'Airport pickup is timed according to your flight arrival.',
      },
      {
        _id: 'day-2',
        _type: 'itineraryDay',
        dayNumber: 2,
        title: 'Port Blair to Havelock (Private Cruise) & Radhanagar Beach Sunset',
        location: 'Havelock Island (Swaraj Dweep)',
        description:
          'Private Cruise to Havelock: Board a premium private catamaran cruise (Makruzz / Nautika in Premium Class) to Havelock Island.\n\nResort Check-In: Smooth transfer to your beach resort for lunch and relaxation.\n\nRadhanagar Beach Sunset: In the afternoon, visit world-famous Radhanagar Beach (Beach No. 7). Walk along powdery white sands and witness an unforgettable sunset.',
        morning: 'Morning private cruise to Havelock Island.',
        afternoon: 'Resort check-in and leisure.',
        evening: 'Radhanagar Beach sunset excursion.',
        overnight: 'Overnight stay at Beach Resort in Havelock Island',
        meals: ['Breakfast Included', 'Dinner Included'],
        importantNote: 'Ferry tickets have allocated seats; please arrive at jetty 45 mins prior to sailing.',
      },
      {
        _id: 'day-3',
        _type: 'itineraryDay',
        dayNumber: 3,
        title: 'Elephant Beach Snorkeling & Cruise to Neil Island',
        location: 'Neil Island (Shaheed Dweep)',
        description:
          'Speedboat to Elephant Beach: Ride across the waters to Havelock\'s richest coral reef.\n\nComplimentary Snorkeling: Explore vibrant underwater corals with a guided session.\n\nCruise to Neil Island: Board your afternoon private cruise to scenic Neil Island.\n\nLaxmanpur Beach Sunset: Enjoy a tranquil evening sunset at Laxmanpur Beach.',
        morning: 'Elephant Beach speedboat trip & coral reef snorkeling.',
        afternoon: 'Catamaran cruise to Neil Island and resort check-in.',
        evening: 'Sunset walk at Laxmanpur Beach.',
        overnight: 'Overnight stay at Resort in Neil Island',
        meals: ['Breakfast Included', 'Dinner Included'],
        importantNote: 'Snorkeling is subject to local weather and harbor safety permits.',
      },
      {
        _id: 'day-4',
        _type: 'itineraryDay',
        dayNumber: 4,
        title: 'Natural Rock Formation, Bharatpur Beach & Return to Port Blair',
        location: 'Neil Island to Port Blair',
        description:
          'Natural Rock Formation: Visit Neil\'s living coral arch (Howrah Bridge) formed by ocean tides over centuries.\n\nBharatpur Beach: Enjoy the calm coral lagoon, perfect for swimming and relaxation.\n\nCruise to Port Blair: Board your private cruise back to Port Blair for your final evening.',
        morning: 'Explore Natural Rock Formation and Bharatpur Beach.',
        afternoon: 'Cruise from Neil Island back to Port Blair.',
        evening: 'Port Blair hotel check-in & local souvenir shopping at Aberdeen Bazaar.',
        overnight: 'Overnight stay at Hotel in Port Blair',
        meals: ['Breakfast Included', 'Dinner Included'],
        importantNote: 'Wear comfortable grip shoes for walking on the coral walkway at Natural Bridge.',
      },
      {
        _id: 'day-5',
        _type: 'itineraryDay',
        dayNumber: 5,
        title: 'Drop to Port Blair Airport with Sweet Memories',
        location: 'Port Blair Departure',
        description:
          'Check out from your hotel with heart-warming memories of your exotic Andaman island adventure. Our representative drops you safely at Veer Savarkar International Airport for your flight back home.',
        morning: 'Hotel checkout and assisted airport transfer in private vehicle.',
        overnight: 'Departure Day',
        meals: ['Breakfast Included'],
        importantNote: 'Packed breakfast provided if your departure flight is early morning.',
      },
    ],
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
