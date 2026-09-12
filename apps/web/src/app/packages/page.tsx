import type {Metadata} from 'next'
import {Sparkles} from 'lucide-react'
import {getAllPackages, getAllDestinations} from '@/lib/sanity/fetch'
import {PackagesFilterView} from '@/components/PackagesFilterView'
import {ALL_PACKAGES, ALL_DESTINATIONS} from '@/lib/data/packagesData'

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

  // Merge live Sanity packages or fallback to full verified collection
  const initialPackages = packages.length > 0 ? packages : ALL_PACKAGES
  const initialDestinations = destinations.length > 0 ? destinations : ALL_DESTINATIONS

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
