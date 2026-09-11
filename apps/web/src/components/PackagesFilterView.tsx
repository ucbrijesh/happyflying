'use client'

import {useState, useMemo} from 'react'
import {Search, SlidersHorizontal, Sparkles, Filter} from 'lucide-react'
import type {TravelPackage, Destination} from '@happyflying/types'
import {PackageCard} from './PackageCard'

interface PackagesFilterViewProps {
  initialPackages: TravelPackage[]
  destinations: Destination[]
}

export function PackagesFilterView({
  initialPackages,
  destinations,
}: PackagesFilterViewProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDestination, setSelectedDestination] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'featured' | 'rating' | 'title'>('featured')

  // Available unique package types
  const packageTypes = useMemo(() => {
    const types = new Set<string>()
    initialPackages.forEach((p) => {
      if (p.packageType) types.add(p.packageType)
    })
    return Array.from(types)
  }, [initialPackages])

  const filteredPackages = useMemo(() => {
    return initialPackages
      .filter((pkg) => {
        // Search filter
        const matchesSearch =
          searchQuery === '' ||
          pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pkg.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pkg.destination?.name?.toLowerCase().includes(searchQuery.toLowerCase())

        // Destination filter
        const matchesDest =
          selectedDestination === 'all' ||
          pkg.destination?.slug?.current === selectedDestination ||
          pkg.destination?._id === selectedDestination

        // Package type filter
        const matchesType =
          selectedType === 'all' || pkg.packageType === selectedType

        return matchesSearch && matchesDest && matchesType
      })
      .sort((a, b) => {
        if (sortBy === 'rating') {
          return (b.rating || 0) - (a.rating || 0)
        }
        if (sortBy === 'title') {
          return a.title.localeCompare(b.title)
        }
        // default: featured
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
      })
  }, [initialPackages, searchQuery, selectedDestination, selectedType, sortBy])

  return (
    <div className="space-y-8">
      {/* Search & Filter Control Bar */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
        <div className="grid gap-4 md:grid-cols-4 items-center">
          {/* Search Input */}
          <div className="relative md:col-span-2">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by destination, package, or island..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 py-3 text-sm text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none transition-colors"
            />
          </div>

          {/* Destination Selector */}
          <div>
            <select
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none transition-colors cursor-pointer"
            >
              <option value="all">All Destinations</option>
              {destinations.map((d) => (
                <option key={d._id} value={d.slug?.current || d._id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Selector */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'featured' | 'rating' | 'title')}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none transition-colors cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="rating">Highest Rated</option>
              <option value="title">Alphabetical (A - Z)</option>
            </select>
          </div>
        </div>

        {/* Package Type Pills */}
        {packageTypes.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
              <Filter className="h-3 w-3" /> Filter Theme:
            </span>
            <button
              onClick={() => setSelectedType('all')}
              className={`rounded-full px-3.5 py-1 text-xs font-semibold transition-all ${
                selectedType === 'all'
                  ? 'bg-[#0A1320] text-[#F3B604] shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Themes
            </button>
            {packageTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`rounded-full px-3.5 py-1 text-xs font-semibold transition-all ${
                  selectedType === type
                    ? 'bg-[#0A1320] text-[#F3B604] shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results Count Summary */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-slate-600 px-1">
        <span>
          Showing <strong>{filteredPackages.length}</strong> {filteredPackages.length === 1 ? 'package' : 'packages'}
        </span>
        {(searchQuery || selectedDestination !== 'all' || selectedType !== 'all') && (
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedDestination('all')
              setSelectedType('all')
            }}
            className="text-xs font-bold text-sky-700 hover:underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Package Grid */}
      {filteredPackages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <PackageCard key={pkg._id} pkg={pkg} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-white p-12 text-center space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-700 text-xl">
            ✈️
          </div>
          <h3 className="text-lg font-bold text-slate-900">No packages matched your filter</h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
            Try resetting your filters or search keywords to view all available holiday tours.
          </p>
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedDestination('all')
              setSelectedType('all')
            }}
            className="rounded-full bg-[#0A1320] px-5 py-2 text-xs font-bold text-[#F3B604]"
          >
            Show All Tours
          </button>
        </div>
      )}
    </div>
  )
}
