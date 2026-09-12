import type {Metadata} from 'next'
import {Geist, Geist_Mono} from 'next/font/google'
import './globals.css'
import {SanityLive} from '@/sanity/lib/live'
import {VisualEditing} from 'next-sanity/visual-editing'
import {draftMode} from 'next/headers'
import {Header} from '@/components/Header'
import {Footer} from '@/components/Footer'
import {FloatingContact} from '@/components/FloatingContact'
import {TravelAgencyJsonLd} from '@/components/JsonLd'
import {getSiteSettings} from '@/lib/sanity/fetch'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const defaultSeo = settings.defaultSeo

  return {
    title: {
      default: defaultSeo?.metaTitle || 'HappyFlying Tours & Travels | Luxury Tours & Bespoke Travel',
      template: '%s — HappyFlying Tours & Travels',
    },
    description:
      defaultSeo?.metaDescription ||
      'Wings to wonder, Indian heritage trails & bespoke international holidays crafted around you.',
    keywords: defaultSeo?.keywords || [
      'luxury travel',
      'andaman tour packages',
      'bespoke tours',
      'bangalore travel agency',
      'honeymoon travel',
    ],
    metadataBase: new URL('https://happyflying.vercel.app'),
    openGraph: {
      title: defaultSeo?.metaTitle || 'HappyFlying Tours & Travels',
      description: defaultSeo?.metaDescription || 'Where every journey takes wing with elegance and care.',
      url: 'https://happyflying.vercel.app',
      siteName: 'HappyFlying Tours & Travels',
      images: [
        {
          url: defaultSeo?.openGraphImage?.asset?.url || 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85',
          width: 1200,
          height: 630,
        },
      ],
      type: 'website',
    },
    icons: {
      icon: '/favicon.ico',
    },
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isDraftMode = (await draftMode()).isEnabled
  const settings = await getSiteSettings()

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-[#F3B604] selection:text-slate-900">
        <TravelAgencyJsonLd
          name={settings.companyName}
          telephone={settings.phone}
          email={settings.email}
          address={settings.address}
        />
        <Header settings={settings} />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />
        <FloatingContact settings={settings} />
        <SanityLive />
        {isDraftMode && <VisualEditing />}
      </body>
    </html>
  )
}
