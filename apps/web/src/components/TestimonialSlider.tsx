import {Star, Quote} from 'lucide-react'
import type {Testimonial} from '@happyflying/types'
import {SanityImage} from './SanityImage'

interface TestimonialSliderProps {
  testimonials?: Testimonial[]
}

export function TestimonialSlider({testimonials = []}: TestimonialSliderProps) {
  if (!testimonials || testimonials.length === 0) {
    return null
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {testimonials.map((item, idx) => (
        <div
          key={item._id || idx}
          className="relative flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow"
        >
          <Quote className="absolute top-6 right-6 h-8 w-8 text-sky-100 -scale-x-100" />

          <div>
            <div className="flex items-center gap-1 mb-4">
              {[...Array(item.rating || 5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>

            <p className="text-sm text-slate-700 leading-relaxed italic relative z-10">
              "{item.comment}"
            </p>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3">
            {item.avatar?.asset ? (
              <SanityImage
                value={item.avatar}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover border border-slate-200"
                alt={item.name}
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-sky-600 to-indigo-600 text-white font-bold text-xs">
                {item.name.charAt(0)}
              </div>
            )}
            <div>
              <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
              <p className="text-xs text-slate-500">{item.role || 'Happy Traveler'}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
