import {notFound} from 'next/navigation'
import Link from 'next/link'
import type {Metadata} from 'next'
import {Calendar, User, ChevronLeft, ArrowRight, Sparkles} from 'lucide-react'
import {client} from '@/sanity/client'
import {BLOG_POST_SLUGS_QUERY} from '@/lib/sanity/queries'
import {getBlogPostBySlug, getSiteSettings} from '@/lib/sanity/fetch'
import {SanityImage} from '@/components/SanityImage'
import {CustomPortableText} from '@/components/CustomPortableText'

interface BlogPostPageProps {
  params: Promise<{slug: string}>
}

export async function generateStaticParams() {
  try {
    const slugs = await client
      .withConfig({useCdn: false})
      .fetch<{slug: string}[]>(BLOG_POST_SLUGS_QUERY)
    return slugs.map((s) => ({slug: s.slug}))
  } catch {
    return [{slug: 'top-things-to-know-andaman'}]
  }
}

export async function generateMetadata({params}: BlogPostPageProps): Promise<Metadata> {
  const {slug} = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    if (slug === 'top-things-to-know-andaman') {
      return {
        title: 'Top 7 Things to Know Before Your First Andaman Island Trip',
        description: 'Complete guide on ferry timings, permits, water sports, and seasons in Andaman.',
      }
    }
    return {title: 'Post Not Found — HappyFlying'}
  }

  return {
    title: `${post.title} — HappyFlying Travel Blog`,
    description: post.excerpt || post.title,
  }
}

export default async function BlogPostDetailPage({params}: BlogPostPageProps) {
  const {slug} = await params
  const [post, settings] = await Promise.all([
    getBlogPostBySlug(slug),
    getSiteSettings(),
  ])

  if (!post) {
    if (slug !== 'top-things-to-know-andaman') {
      return notFound()
    }
  }

  const data = post || {
    _id: 'b1',
    _type: 'blogPost' as const,
    title: 'Top 7 Things to Know Before Your First Andaman Island Trip',
    slug: {current: 'top-things-to-know-andaman'},
    publishedAt: '2026-09-10T00:00:00.000Z',
    excerpt:
      'Everything you need to know about ferry timings, island permits, water sports safety, and best seasons to visit the Andaman Islands.',
    categories: ['Andaman Travel', 'Travel Guide'],
    author: {
      _id: 't1',
      _type: 'teamMember' as const,
      name: 'HappyFlying Travel Concierge',
      role: 'Destination Specialist',
    },
  }

  return (
    <article className="py-12 sm:py-20 px-4 sm:px-6 max-w-4xl mx-auto w-full space-y-8">
      <div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-100 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>All Travel Stories</span>
        </Link>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-600">
          <span>{data.categories?.[0] || 'Travel Guide'}</span>
          {data.publishedAt && (
            <>
              <span>•</span>
              <span className="text-slate-500 font-normal normal-case">
                {new Date(data.publishedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </>
          )}
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {data.title}
        </h1>

        {data.excerpt && (
          <p className="text-base sm:text-xl text-slate-600 leading-relaxed">
            {data.excerpt}
          </p>
        )}

        <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white font-bold text-xs">
            {data.author?.name ? data.author.name.charAt(0) : 'H'}
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900">{data.author?.name || 'HappyFlying Team'}</div>
            <div className="text-xs text-slate-500">{data.author?.role || 'Travel Specialist'}</div>
          </div>
        </div>
      </div>

      {data.mainImage?.asset ? (
        <div className="my-8 overflow-hidden rounded-[32px] border border-slate-200 shadow-md">
          <SanityImage
            value={data.mainImage}
            width={1200}
            height={675}
            priority
            className="w-full h-auto object-cover"
            alt={data.title}
          />
        </div>
      ) : (
        <div className="my-8 overflow-hidden rounded-[32px] border border-slate-200 shadow-md">
          <img
            src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=85"
            alt={data.title}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {data.body ? (
        <div className="prose prose-zinc max-w-none">
          <CustomPortableText value={data.body} />
        </div>
      ) : (
        <div className="space-y-6 text-slate-700 text-base leading-relaxed">
          <h2 className="text-2xl font-bold text-slate-900">1. Ferry Timings are Critical</h2>
          <p>
            Private catamarans like Makruzz and Nautika connect Port Blair, Havelock, and Neil Island. Always book your ferry passes in advance during peak season (October through May) to secure preferred morning sailing slots.
          </p>

          <h2 className="text-2xl font-bold text-slate-900">2. Carry Government ID</h2>
          <p>
            Island authorities require physical or digital copies of government photo IDs (Aadhaar or Passport) at airport arrival, jetty boarding points, and water sports complexes.
          </p>

          <h2 className="text-2xl font-bold text-slate-900">3. Radhanagar Sunset is Unmissable</h2>
          <p>
            Ranked among Asia&apos;s best beaches, Radhanagar Beach on Havelock Island offers powdery white sands and stunning golden hour sunsets. Plan to arrive by 3:30 PM to enjoy the calm waters before sunset.
          </p>
        </div>
      )}

      {/* Explore Andaman package link CTA */}
      <div className="rounded-3xl border border-sky-200 bg-sky-50/70 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 mt-12">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Inspired to experience Andaman?</h3>
          <p className="text-xs sm:text-sm text-slate-600">Check out our complete 5D/4N Andaman package with private cabs & cruise tickets.</p>
        </div>
        <Link
          href="/packages/andaman-trip"
          className="inline-flex items-center gap-2 rounded-2xl bg-[#0A1320] px-6 py-3 text-xs font-bold text-[#F3B604] shadow hover:bg-slate-800 shrink-0"
        >
          <span>View Andaman Trip</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  )
}
