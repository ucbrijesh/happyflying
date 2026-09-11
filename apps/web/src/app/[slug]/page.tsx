import {notFound} from 'next/navigation'
import Link from 'next/link'
import type {Metadata} from 'next'
import {sanityFetch} from '@/sanity/lib/live'
import {PAGE_QUERY} from '@/sanity/lib/queries'
import {CustomPortableText} from '@/components/CustomPortableText'

interface PageProps {
  params: Promise<{slug: string}>
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {slug} = await params
  const {data: page} = await sanityFetch({
    query: PAGE_QUERY,
    params: {slug},
    stega: false,
  })

  if (!page) {
    if (slug === 'about') {
      return {title: 'About Us — HappyFlying'}
    }
    return {title: 'Page Not Found — HappyFlying'}
  }

  return {
    title: `${page.title} — HappyFlying`,
    description: page.subheading || `${page.title} on HappyFlying`,
  }
}

export default async function DynamicPage({params}: PageProps) {
  const {slug} = await params
  const {data: page} = await sanityFetch({
    query: PAGE_QUERY,
    params: {slug},
  })

  if (!page) {
    // Built-in fallback for /about if not yet created in Studio
    if (slug === 'about') {
      return (
        <div className="py-16 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <Link href="/" className="text-sm font-medium text-sky-600 hover:text-sky-800 transition-colors mb-6 inline-block">
              ← Back to Home
            </Link>
            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl">
              About HappyFlying
            </h1>
            <p className="mt-6 text-xl text-zinc-600 leading-relaxed">
              HappyFlying was created to elevate the flight experience for travelers, aviation geeks, and wanderers around the globe.
            </p>
            <div className="mt-8 space-y-4 text-zinc-700 leading-relaxed">
              <p>
                From in-depth cabin reviews and route guides to aviation industry updates, our mission is to make every journey in the skies joyful and stress-free.
              </p>
              <p>
                This site is powered by Next.js App Router and Sanity as a headless CMS, delivering real-time updates and live visual editing.
              </p>
            </div>
          </div>
        </div>
      )
    }
    return notFound()
  }

  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link href="/" className="text-sm font-medium text-sky-600 hover:text-sky-800 transition-colors mb-6 inline-block">
          ← Back to Home
        </Link>
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl">
          {page.heading || page.title}
        </h1>
        {page.subheading && (
          <p className="mt-4 text-xl text-zinc-600 leading-relaxed">
            {page.subheading}
          </p>
        )}
        <div className="mt-8 prose prose-zinc max-w-none">
          <CustomPortableText value={page.body} />
        </div>
      </div>
    </div>
  )
}
