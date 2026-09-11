import type {Metadata} from 'next'
import Link from 'next/link'
import {Calendar, User, ArrowRight, Sparkles} from 'lucide-react'
import {getAllBlogPosts} from '@/lib/sanity/fetch'
import {SanityImage} from '@/components/SanityImage'

export const metadata: Metadata = {
  title: 'Travel Blog & Guides — HappyFlying Tours & Travels',
  description:
    'Travel tips, island guides, flight secrets, and itinerary inspiration curated by HappyFlying destination specialists.',
}

export default async function BlogPage() {
  const posts = await getAllBlogPosts()

  const list =
    posts.length > 0
      ? posts
      : [
          {
            _id: 'b1',
            _type: 'blogPost' as const,
            title: 'Top 7 Things to Know Before Your First Andaman Island Trip',
            slug: {current: 'top-things-to-know-andaman'},
            publishedAt: '2026-09-10T00:00:00.000Z',
            excerpt:
              'Everything you need to know about ferry timings, island permits, water sports safety, and best seasons to visit the Andaman Islands.',
            categories: ['Andaman Travel', 'Travel Guide'],
          },
        ]

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto w-full space-y-12">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="h-3.5 w-3.5" /> Destination Insights
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Travel Blog & Guides
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
          Expert recommendations, ferry guidelines, packing advice, and island secrets to help you plan an extraordinary holiday.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {list.map((post) => (
          <article
            key={post._id}
            className="group flex flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100 relative">
              {post.mainImage?.asset ? (
                <SanityImage
                  value={post.mainImage}
                  width={600}
                  height={375}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt={post.title}
                />
              ) : (
                <img
                  src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80"
                  alt={post.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              )}
            </div>

            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center gap-2 text-[11px] font-semibold text-sky-600 uppercase tracking-wider mb-2">
                <span>{post.categories?.[0] || 'Travel Guide'}</span>
                {post.publishedAt && (
                  <>
                    <span>•</span>
                    <span className="text-slate-400 font-normal">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </>
                )}
              </div>

              <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                <Link href={`/blog/${post.slug.current}`}>{post.title}</Link>
              </h3>

              {post.excerpt && (
                <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between text-xs">
                {post.author?.name ? (
                  <span className="text-slate-600 font-medium">By {post.author.name}</span>
                ) : (
                  <span className="text-slate-500">HappyFlying Concierge</span>
                )}
                <Link
                  href={`/blog/${post.slug.current}`}
                  className="inline-flex items-center gap-1 font-bold text-sky-700 group-hover:translate-x-1 transition-transform"
                >
                  <span>Read Article</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
