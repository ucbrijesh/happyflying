import type {Metadata} from 'next'
import Link from 'next/link'
import {
  ShieldCheck,
  Crown,
  Users,
  MapPin,
  Sparkles,
  Plane,
  HeartHandshake,
  Award,
} from 'lucide-react'
import {getSiteSettings, getTeamMembers} from '@/lib/sanity/fetch'
import {SanityImage} from '@/components/SanityImage'

export const metadata: Metadata = {
  title: 'About HappyFlying Tours & Travels — Bangalore Travel Agency',
  description:
    'Discover our story, leadership team, and mission to craft bespoke luxury vacations and authentic island journeys from Bangalore, India.',
}

export default async function AboutPage() {
  const [settings, team] = await Promise.all([
    getSiteSettings(),
    getTeamMembers(),
  ])

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto w-full space-y-16">
      {/* Hero Intro */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider">
          <Plane className="h-3.5 w-3.5 text-sky-600" /> About HappyFlying
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Wings to Wonder, Journeys with Heart.
        </h1>
        <p className="text-base sm:text-xl text-slate-600 leading-relaxed font-normal">
          Headquartered in Koramangala, Bangalore, HappyFlying Tours & Travels LLP was established with a singular mission: to make luxury, experiential, and bespoke travel completely stress-free and joyful.
        </p>
      </div>

      {/* Story & Values Grid */}
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-sm sm:text-base text-slate-700 leading-relaxed">
          <p>
            Whether sailing across the Andaman Sea on a high-speed catamaran cruise, snorkeling alongside pristine coral reefs in Havelock, or witnessing history at Cellular Jail, we believe that true travel luxury is seamless peace of mind.
          </p>
          <p>
            With 10+ years of travel experience, our team curates verified 4-star and 5-star hotel stays, pre-books private dedicated AC vehicles with trusted local drivers, and assigns a single personal tour coordinator to every single traveler.
          </p>
          <div className="p-6 rounded-3xl bg-sky-50/70 border border-sky-100 space-y-2">
            <h3 className="font-extrabold text-slate-900 text-base">The HappyFlying Promise</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Zero hidden costs, 100% verified hotels, pre-issued cruise tickets, and on-ground field executives awaiting your arrival at every island port.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
              <Award className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">10+ Years Expertise</h4>
            <p className="text-xs text-slate-500">Over a decade of curating memorable island and heritage holidays.</p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">100% Verified Stays</h4>
            <p className="text-xs text-slate-500">Every resort and vehicle is personally inspected and verified.</p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
              <HeartHandshake className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Single Point of Contact</h4>
            <p className="text-xs text-slate-500">Dedicated personal concierge reachable 24/7 on WhatsApp & Call.</p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
              <MapPin className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Bangalore HQ</h4>
            <p className="text-xs text-slate-500">Accessible office in Koramangala 5th Block, Bangalore.</p>
          </div>
        </div>
      </div>

      {/* Team / Leadership Section */}
      {team.length > 0 && (
        <div className="space-y-8 pt-8 border-t border-slate-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-sky-700">
              Our People
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Meet Your Travel Concierges
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <div
                key={member._id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4"
              >
                {member.image?.asset && (
                  <div className="aspect-square w-full rounded-2xl overflow-hidden bg-slate-100">
                    <SanityImage
                      value={member.image}
                      width={400}
                      height={400}
                      className="h-full w-full object-cover"
                      alt={member.name}
                    />
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{member.name}</h3>
                  <p className="text-xs font-semibold text-sky-600">{member.role}</p>
                  {member.bio && (
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">{member.bio}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
