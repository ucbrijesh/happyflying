import type {Metadata} from 'next'
import {Sparkles} from 'lucide-react'
import {getAllPackages, getAllDestinations} from '@/lib/sanity/fetch'
import {PackagesFilterView} from '@/components/PackagesFilterView'

export const metadata: Metadata = {
  title: 'All Travel & Holiday Packages — HappyFlying',
  description:
    'Discover curated Andaman island holidays, bespoke domestic tours, and international luxury getaways.',
}

export default async function PackagesPage() {
  const [packages, destinations] = await Promise.all([
    getAllPackages(),
    getAllDestinations(),
  ])

  // If live CMS has not seeded yet, fallback to Andaman package
  const initialPackages =
    packages.length > 0
      ? packages
      : [
          {
            _id: 'pkg-andaman-trip',
            _type: 'travelPackage' as const,
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
              _type: 'destination' as const,
              name: 'Andaman & Nicobar',
              slug: {current: 'andaman'},
            },
            pricing: {
              _id: 'p1',
              _type: 'pricing' as const,
              finalPrice: 24999,
              displayPrice: 'Call Us / Custom Quote',
              title: 'Standard',
            },
          },
        ]

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto w-full">
      {/* Page Header */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="h-3.5 w-3.5" /> Curated Travel Collections
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Find Your Perfect Holiday
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
          Explore all custom island packages, honeymoon trails, and family retreats. Every package is customizable with private vehicles and luxury catamaran cruises.
        </p>
      </div>

      {/* Filter & Listing View */}
      <PackagesFilterView
        initialPackages={initialPackages}
        destinations={destinations}
      />
    </div>
  )
}
