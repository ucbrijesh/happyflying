export function TravelAgencyJsonLd({
  name = 'HappyFlying Tours & Travels LLP',
  url = 'https://happyflyingtravels.com',
  telephone = '+919900113691',
  email = 'operations@happyflyingtravels.com',
  address = 'No 145, 3rd Floor, 80 Feet Road KHB Colony, 5th Block, Koramangala, Bangalore, Karnataka 560034',
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name,
    url,
    telephone,
    email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'No 145, 3rd Floor, 80 Feet Road KHB Colony, 5th Block, Koramangala',
      addressLocality: 'Bangalore',
      addressRegion: 'Karnataka',
      postalCode: '560034',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 12.9352,
      longitude: 77.6245,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '20:00',
    },
    priceRange: '₹₹₹',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
    />
  )
}

export function ProductOfferJsonLd({
  title,
  description,
  price = 24999,
  currency = 'INR',
  url,
  image,
  rating = 4.8,
  reviewCount = 24,
}: {
  title: string
  description?: string
  price?: number
  currency?: string
  url?: string
  image?: string
  rating?: number
  reviewCount?: number
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: title,
    description: description || title,
    image: image ? [image] : undefined,
    offers: {
      '@type': 'Offer',
      price: price,
      priceCurrency: currency,
      availability: 'https://schema.org/InStock',
      url,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating,
      reviewCount: reviewCount,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
    />
  )
}

export function FaqJsonLd({faqs}: {faqs: {question: string; answer: string}[]}) {
  if (!faqs || faqs.length === 0) return null

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
    />
  )
}
