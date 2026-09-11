import {sanityFetch} from '@/sanity/lib/live'
import {
  SITE_SETTINGS_QUERY,
  TESTIMONIALS_QUERY,
  FAQS_QUERY,
  TEAM_MEMBERS_QUERY,
  PACKAGES_QUERY,
  FEATURED_PACKAGES_QUERY,
  PACKAGE_BY_SLUG_QUERY,
  DESTINATIONS_QUERY,
  DESTINATION_BY_SLUG_QUERY,
  SERVICES_QUERY,
  SERVICE_BY_SLUG_QUERY,
  BLOG_POSTS_QUERY,
  BLOG_POST_BY_SLUG_QUERY,
} from './queries'
import type {
  SiteSettings,
  TravelPackage,
  Destination,
  Service,
  BlogPost,
  Testimonial,
  FAQ,
  TeamMember,
} from '@happyflying/types'

// Fallback site settings
export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  companyName: 'HappyFlying Tours & Travels LLP',
  tagline: 'Wings to wonder, journeys with heart, and travel crafted around you.',
  phone: '+91 9900113691',
  whatsapp: '919900113691',
  email: 'operations@happyflyingtravels.com',
  address: 'No 145, 3rd Floor, 80 Feet Road KHB Colony, 5th Block, Koramangala, Bangalore, Karnataka 560034',
  footerText: 'Where every journey takes wing with elegance, care, and unforgettable discovery. Headquartered in Koramangala, Bangalore.',
  socialLinks: [
    {_key: 'ig', platform: 'instagram', url: 'https://www.instagram.com/happyflying.in'},
    {_key: 'wa', platform: 'whatsapp', url: 'https://wa.me/919900113691'},
    {_key: 'yt', platform: 'youtube', url: 'https://youtube.com'},
  ],
  navigation: [
    {_key: 'nav-1', label: 'Home', href: '/'},
    {_key: 'nav-2', label: 'Packages', href: '/packages'},
    {_key: 'nav-3', label: 'Destinations', href: '/destinations'},
    {_key: 'nav-4', label: 'Services', href: '/services'},
    {_key: 'nav-5', label: 'About', href: '/about'},
    {_key: 'nav-6', label: 'Blog', href: '/blog'},
    {_key: 'nav-7', label: 'Travel Planner', href: '/travel-planner'},
    {_key: 'nav-8', label: 'Contact', href: '/contact'},
  ],
  bookingCta: {
    title: 'Book & Customise Your Holiday',
    description: 'Speak directly with our Bangalore travel concierges for instant seat holds, custom dates, or group discounts.',
    phone: '+91 9900113691',
    whatsapp: '919900113691',
    email: 'operations@happyflyingtravels.com',
    buttonText: 'Inquire on WhatsApp',
  },
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const res = await sanityFetch({query: SITE_SETTINGS_QUERY})
    const data = res.data as unknown as SiteSettings | null
    return data && data.companyName ? data : DEFAULT_SITE_SETTINGS
  } catch {
    return DEFAULT_SITE_SETTINGS
  }
}

export async function getAllPackages(): Promise<TravelPackage[]> {
  try {
    const res = await sanityFetch({query: PACKAGES_QUERY})
    const data = res.data as unknown as TravelPackage[] | null
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

export async function getFeaturedPackages(): Promise<TravelPackage[]> {
  try {
    const res = await sanityFetch({query: FEATURED_PACKAGES_QUERY})
    const data = res.data as unknown as TravelPackage[] | null
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

export async function getPackageBySlug(slug: string): Promise<TravelPackage | null> {
  try {
    const res = await sanityFetch({
      query: PACKAGE_BY_SLUG_QUERY,
      params: {slug},
    })
    const data = res.data as unknown as TravelPackage | null
    return data && data.title ? data : null
  } catch {
    return null
  }
}

export async function getAllDestinations(): Promise<Destination[]> {
  try {
    const res = await sanityFetch({query: DESTINATIONS_QUERY})
    const data = res.data as unknown as Destination[] | null
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

export async function getDestinationBySlug(slug: string): Promise<Destination | null> {
  try {
    const res = await sanityFetch({
      query: DESTINATION_BY_SLUG_QUERY,
      params: {slug},
    })
    const data = res.data as unknown as Destination | null
    return data && data.name ? data : null
  } catch {
    return null
  }
}

export async function getAllServices(): Promise<Service[]> {
  try {
    const res = await sanityFetch({query: SERVICES_QUERY})
    const data = res.data as unknown as Service[] | null
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const res = await sanityFetch({
      query: SERVICE_BY_SLUG_QUERY,
      params: {slug},
    })
    const data = res.data as unknown as Service | null
    return data && data.title ? data : null
  } catch {
    return null
  }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await sanityFetch({query: BLOG_POSTS_QUERY})
    const data = res.data as unknown as BlogPost[] | null
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const res = await sanityFetch({
      query: BLOG_POST_BY_SLUG_QUERY,
      params: {slug},
    })
    const data = res.data as unknown as BlogPost | null
    return data && data.title ? data : null
  } catch {
    return null
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const res = await sanityFetch({query: TESTIMONIALS_QUERY})
    const data = res.data as unknown as Testimonial[] | null
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

export async function getFaqs(): Promise<FAQ[]> {
  try {
    const res = await sanityFetch({query: FAQS_QUERY})
    const data = res.data as unknown as FAQ[] | null
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const res = await sanityFetch({query: TEAM_MEMBERS_QUERY})
    const data = res.data as unknown as TeamMember[] | null
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}
