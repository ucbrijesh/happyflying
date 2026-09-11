import Link from 'next/link'
import {Calendar, MapPin, Star, ArrowRight, Sparkles} from 'lucide-react'
import type {TravelPackage} from '@happyflying/types'
import {SanityImage} from './SanityImage'

interface PackageCardProps {
  pkg: TravelPackage
}

export function PackageCard({pkg}: PackageCardProps) {
  const destinationName = pkg.destination?.name || 'Tropical Island'
  const duration = pkg.duration || '5 Days / 4 Nights'
  const rating = pkg.rating || 4.8
  const reviewCount = pkg.reviewCount || 24
  const displayPrice = pkg.pricing?.displayPrice || 'Call Us'

  // Default fallback image if Sanity asset is not uploaded
  const fallbackImageSrc = 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80'

  return (
    <article className="group flex flex-col overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-sky-300/80">
      {/* Card Image Header */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        {pkg.hero?.asset ? (
          <SanityImage
            value={pkg.hero}
            width={640}
            height={400}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            alt={pkg.hero.alt || pkg.title}
          />
        ) : (
          <img
            src={fallbackImageSrc}
            alt={pkg.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {pkg.packageType && (
            <span className="rounded-full bg-[#F3B604] px-3 py-1 text-[11px] font-extrabold text-[#0A1320] shadow-sm">
              {pkg.packageType}
            </span>
          )}
          {pkg.featured && (
            <span className="rounded-full bg-sky-600 px-3 py-1 text-[11px] font-bold text-white shadow-sm flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> Featured
            </span>
          )}
        </div>

        {/* Rating Floating Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-slate-900/80 backdrop-blur-md px-2.5 py-1 text-xs font-bold text-amber-400 border border-white/10">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span>{rating}</span>
          <span className="text-slate-400 text-[10px]">({reviewCount})</span>
        </div>

        {/* Destination & Duration Bottom Overlay */}
        <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-white text-xs font-semibold">
          <span className="flex items-center gap-1 drop-shadow">
            <MapPin className="h-3.5 w-3.5 text-[#F3B604]" />
            {destinationName}
          </span>
          <span className="flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-md px-2.5 py-0.5 border border-white/20">
            <Calendar className="h-3 w-3 text-white" />
            {duration}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-2">
          <Link href={`/packages/${pkg.slug}`}>
            {pkg.title}
          </Link>
        </h3>

        {pkg.summary && (
          <p className="mt-2.5 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {pkg.summary}
          </p>
        )}

        {/* Highlights Tags */}
        {pkg.categories && pkg.categories.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {pkg.categories.slice(0, 3).map((cat, i) => (
              <span
                key={i}
                className="rounded-lg bg-sky-50 px-2 py-0.5 text-[10px] font-semibold text-sky-700 border border-sky-100"
              >
                {cat}
              </span>
            ))}
          </div>
        )}

        {/* Card Footer: Price & CTA */}
        <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-400">
              Starting From
            </span>
            <span className="text-base sm:text-lg font-black text-slate-900">
              {displayPrice}
            </span>
          </div>

          <Link
            href={`/packages/${pkg.slug}`}
            className="inline-flex items-center gap-1.5 rounded-2xl bg-[#0A1320] px-4 py-2.5 text-xs font-bold text-[#F3B604] shadow hover:bg-slate-800 group-hover:scale-105 transition-all"
          >
            <span>View Details</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  )
}
