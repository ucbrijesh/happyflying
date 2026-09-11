export interface SanityReference {
  _ref: string
  _type: 'reference'
}

export interface SanityImageWithAlt {
  _type?: 'imageWithAlt' | 'image'
  asset?: {
    _ref?: string
    _id?: string
    url?: string
    metadata?: {
      lqip?: string
      dimensions?: {
        width: number
        height: number
        aspectRatio: number
      }
    }
  }
  alt?: string
  caption?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

export interface Money {
  amount: number
  currency: string
  formatted?: string
}

export interface Location {
  address?: string
  city?: string
  state?: string
  country?: string
  lat?: number
  lng?: number
  mapUrl?: string
}

export interface PackageHighlight {
  _key?: string
  title: string
  description?: string
  icon?: string
}

export interface InclusionItem {
  _key?: string
  item: string
  category?: 'stay' | 'transfers' | 'meals' | 'activities' | 'tickets' | 'support' | 'general'
}

export interface ExclusionItem {
  _key?: string
  item: string
}

export interface TransferItem {
  _key?: string
  title: string
  mode?: 'flight' | 'cruise' | 'private-cab' | 'ferry' | 'speed-boat'
  from?: string
  to?: string
  vehicleType?: string
  details?: string
}

export interface SocialLink {
  _key?: string
  platform: string
  url: string
  icon?: string
}

export interface ContactCTA {
  title?: string
  description?: string
  phone?: string
  whatsapp?: string
  email?: string
  buttonText?: string
}

export interface SEO {
  metaTitle?: string
  metaDescription?: string
  keywords?: string[]
  openGraphImage?: SanityImageWithAlt
  canonicalUrl?: string
  noIndex?: boolean
}

export interface NavItem {
  _key?: string
  label: string
  href: string
  isExternal?: boolean
  children?: NavItem[]
}

export interface SiteSettings {
  _id: string
  _type: 'siteSettings'
  companyName: string
  tagline?: string
  logo?: SanityImageWithAlt
  phone: string
  whatsapp: string
  email: string
  address: string
  socialLinks?: SocialLink[]
  defaultSeo?: SEO
  navigation?: NavItem[]
  footerText?: string
  bookingCta?: ContactCTA
}

export interface Destination {
  _id: string
  _type: 'destination'
  name: string
  slug: {current: string}
  country?: string
  region?: string
  shortDescription?: string
  description?: unknown[]
  heroImage?: SanityImageWithAlt
  gallery?: SanityImageWithAlt[]
  highlights?: string[]
  bestTimeToVisit?: string
  idealDuration?: string
  thingsToDo?: string[]
  travelTips?: string[]
  faqs?: FAQ[]
  relatedPackages?: TravelPackage[]
  seo?: SEO
}

export interface ItineraryDay {
  _id: string
  _type: 'itineraryDay'
  dayNumber: number
  title: string
  location?: string
  description?: string | unknown[]
  morning?: string | unknown[]
  afternoon?: string | unknown[]
  evening?: string | unknown[]
  overnight?: string
  meals?: string[]
  activities?: Activity[]
  transfers?: TransferItem[]
  images?: SanityImageWithAlt[]
  mapLocation?: Location
  importantNote?: string
}

export interface Hotel {
  _id: string
  _type: 'hotel'
  name: string
  slug: {current: string}
  destination?: Destination | SanityReference
  category?: string
  starRating?: number
  description?: string | unknown[]
  heroImage?: SanityImageWithAlt
  gallery?: SanityImageWithAlt[]
  amenities?: string[]
  roomTypes?: string[]
  mealPlan?: string
  location?: string | Location
  website?: string
  checkIn?: string
  checkOut?: string
  seo?: SEO
}

export interface Activity {
  _id: string
  _type: 'activity'
  name: string
  slug: {current: string}
  destination?: Destination | SanityReference
  category?: string
  shortDescription?: string
  description?: string | unknown[]
  heroImage?: SanityImageWithAlt
  gallery?: SanityImageWithAlt[]
  duration?: string
  difficulty?: 'Easy' | 'Moderate' | 'Challenging'
  ageSuitability?: string
  included?: boolean
  optional?: boolean
  price?: Money
  operatingSeason?: string
  importantNotes?: string
  seo?: SEO
}

export interface Pricing {
  _id: string
  _type: 'pricing'
  title: string
  package?: TravelPackage | SanityReference
  validFrom?: string
  validTo?: string
  occupancy?: string
  adults?: number
  children?: number
  rooms?: number
  mealPlan?: string
  basePrice?: number
  taxes?: number
  markup?: number
  finalPrice: number
  displayPrice?: string
  currency?: string
  notes?: string
}

export interface Testimonial {
  _id: string
  _type: 'testimonial'
  name: string
  role?: string
  location?: string
  rating: number
  comment: string
  avatar?: SanityImageWithAlt
  travelPackage?: TravelPackage | SanityReference
  featured?: boolean
}

export interface FAQ {
  _id: string
  _type: 'faq'
  question: string
  answer: string | unknown[]
  category?: string
}

export interface Service {
  _id: string
  _type: 'service'
  title: string
  slug: {current: string}
  shortDescription?: string
  description?: unknown[]
  icon?: string
  heroImage?: SanityImageWithAlt
  features?: string[]
  cta?: ContactCTA
  seo?: SEO
}

export interface TeamMember {
  _id: string
  _type: 'teamMember'
  name: string
  role: string
  bio?: string
  image?: SanityImageWithAlt
  email?: string
  phone?: string
}

export interface BlogPost {
  _id: string
  _type: 'blogPost'
  title: string
  slug: {current: string}
  publishedAt?: string
  author?: TeamMember
  categories?: string[]
  excerpt?: string
  mainImage?: SanityImageWithAlt
  body?: unknown[]
  seo?: SEO
}

export interface TravelPackage {
  _id: string
  _type: 'travelPackage'
  title: string
  slug: {current: string}
  packageCode?: string
  destination: Destination
  packageType?: string
  categories?: string[]
  status?: 'active' | 'draft' | 'sold-out' | 'seasonal'
  featured?: boolean
  rating?: number
  reviewCount?: number
  duration: string
  hero?: SanityImageWithAlt
  gallery?: SanityImageWithAlt[]
  summary?: string
  highlights?: string[]
  itinerary?: ItineraryDay[]
  hotels?: Hotel[]
  activities?: Activity[]
  transfers?: TransferItem[]
  inclusions?: string[]
  exclusions?: string[]
  importantNotes?: string[] | unknown[]
  cancellationPolicy?: string[] | unknown[]
  pricing?: Pricing
  bookingCta?: ContactCTA
  relatedPackages?: TravelPackage[]
  testimonials?: Testimonial[]
  faqs?: FAQ[]
  seo?: SEO
}

export interface EnquiryFormData {
  name: string
  phone: string
  email: string
  destination?: string
  package?: string
  travelDates?: string
  adults: number
  children: number
  message?: string
}
