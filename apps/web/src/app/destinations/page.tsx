import type {Metadata} from 'next'
import {MapPin, Compass} from 'lucide-react'
import {getAllDestinations} from '@/lib/sanity/fetch'
import {DestinationCard} from '@/components/DestinationCard'
import {ALL_DESTINATIONS} from '@/lib/data/packagesData'

export const metadata: Metadata = {
  title: 'Destinations — HappyFlying Tours & Travels',
  description:
    'Explore exotic islands and bespoke vacation destinations curated by HappyFlying.',
}

export default async function DestinationsPage() {
  const destinations = await getAllDestinations()

  const list = destinations.length > 0 ? destinations : ALL_DESTINATIONS

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto w-full space-y-12">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
          <Compass className="h-3.5 w-3.5" /> Destination Explorer
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Handpicked Tropical & Cultural Destinations
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
          From tranquil secluded beaches to lush tropical archipelagos, discover destinations where every detail is taken care of by HappyFlying concierges.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {list.map((destination) => (
          <DestinationCard key={destination._id} destination={destination} />
        ))}
      </div>
    </div>
  )
}
