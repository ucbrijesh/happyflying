import Link from 'next/link'
import {MapPin, Clock, ArrowRight} from 'lucide-react'
import type {Destination} from '@happyflying/types'
import {SanityImage} from './SanityImage'

interface DestinationCardProps {
  destination: Destination
}

export function DestinationCard({destination}: DestinationCardProps) {
  const fallbackImageSrc = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'

  return (
    <article className="group relative overflow-hidden rounded-[32px] border border-slate-200/80 bg-slate-900 text-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl">
      <div className="aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden">
        {destination.heroImage?.asset ? (
          <SanityImage
            value={destination.heroImage}
            width={600}
            height={800}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-85 group-hover:opacity-95"
            alt={destination.heroImage.alt || destination.name}
          />
        ) : (
          <img
            src={fallbackImageSrc}
            alt={destination.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-85 group-hover:opacity-95"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />
      </div>

      <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#F3B604] mb-2">
          <MapPin className="h-3.5 w-3.5" />
          <span>{destination.region || destination.country || 'Paradise'}</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-[#F3B604] transition-colors leading-tight">
          <Link href={`/destinations/${destination.slug.current}`}>
            {destination.name}
          </Link>
        </h3>

        {destination.shortDescription && (
          <p className="mt-2 text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
            {destination.shortDescription}
          </p>
        )}

        {destination.idealDuration && (
          <div className="mt-4 flex items-center gap-2 text-xs text-slate-300">
            <Clock className="h-3.5 w-3.5 text-sky-400" />
            <span>Ideal Duration: {destination.idealDuration}</span>
          </div>
        )}

        <div className="mt-5 pt-4 border-t border-white/15 flex items-center justify-between">
          <Link
            href={`/destinations/${destination.slug.current}`}
            className="inline-flex items-center gap-2 text-xs font-bold text-white group-hover:text-[#F3B604] transition-colors"
          >
            <span>Explore Island Tours</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  )
}
