import {defineQuery} from 'next-sanity'

export const PACKAGES_QUERY = defineQuery(`
  *[_type == "travelPackage" && defined(slug.current) && status != "draft"] | order(featured desc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    packageCode,
    packageType,
    categories,
    status,
    featured,
    duration,
    rating,
    reviewCount,
    summary,
    highlights,
    hero {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      },
      alt
    },
    destination->{
      _id,
      name,
      "slug": slug.current,
      region,
      country
    },
    pricing->{
      _id,
      finalPrice,
      displayPrice,
      currency,
      occupancy,
      mealPlan
    }
  }
`)

export const FEATURED_PACKAGES_QUERY = defineQuery(`
  *[_type == "travelPackage" && defined(slug.current) && featured == true && status != "draft"][0...6] {
    _id,
    title,
    "slug": slug.current,
    packageCode,
    packageType,
    categories,
    status,
    featured,
    duration,
    rating,
    reviewCount,
    summary,
    highlights,
    hero {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      },
      alt
    },
    destination->{
      _id,
      name,
      "slug": slug.current,
      region
    },
    pricing->{
      _id,
      finalPrice,
      displayPrice,
      currency
    }
  }
`)

export const PACKAGE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "travelPackage" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    packageCode,
    packageType,
    categories,
    status,
    featured,
    duration,
    rating,
    reviewCount,
    summary,
    highlights,
    hero {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      },
      alt
    },
    gallery[] {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      },
      alt
    },
    destination->{
      _id,
      name,
      "slug": slug.current,
      region,
      country,
      bestTimeToVisit
    },
    itinerary[]->{
      _id,
      dayNumber,
      title,
      location,
      description,
      morning,
      afternoon,
      evening,
      overnight,
      meals,
      importantNote,
      transfers[] {
        _key,
        title,
        mode,
        from,
        to,
        vehicleType,
        details
      },
      activities[]->{
        _id,
        name,
        category,
        duration,
        included
      }
    },
    hotels[]->{
      _id,
      name,
      "slug": slug.current,
      category,
      starRating,
      description,
      amenities,
      mealPlan,
      checkIn,
      checkOut,
      heroImage {
        asset->{
          _id,
          url,
          metadata { lqip, dimensions }
        },
        alt
      }
    },
    activities[]->{
      _id,
      name,
      "slug": slug.current,
      category,
      shortDescription,
      duration,
      difficulty,
      included,
      optional,
      heroImage {
        asset->{
          _id,
          url,
          metadata { lqip, dimensions }
        },
        alt
      }
    },
    transfers[] {
      _key,
      title,
      mode,
      from,
      to,
      vehicleType,
      details
    },
    inclusions,
    exclusions,
    importantNotes,
    cancellationPolicy,
    pricing->{
      _id,
      title,
      finalPrice,
      displayPrice,
      currency,
      occupancy,
      mealPlan,
      notes
    },
    bookingCta {
      title,
      description,
      phone,
      whatsapp,
      email,
      buttonText
    },
    relatedPackages[]->{
      _id,
      title,
      "slug": slug.current,
      duration,
      hero {
        asset->{ _id, url, metadata { lqip, dimensions } },
        alt
      },
      destination->{ name },
      pricing->{ displayPrice, finalPrice }
    },
    testimonials[]->{
      _id,
      name,
      role,
      rating,
      comment,
      avatar {
        asset->{ _id, url, metadata { lqip, dimensions } },
        alt
      }
    },
    faqs[]->{
      _id,
      question,
      answer,
      category
    },
    seo {
      metaTitle,
      metaDescription,
      keywords,
      openGraphImage {
        asset->{ _id, url, metadata { lqip, dimensions } },
        alt
      },
      canonicalUrl,
      noIndex
    }
  }
`)

export const PACKAGE_SLUGS_QUERY = defineQuery(`
  *[_type == "travelPackage" && defined(slug.current)]{
    "slug": slug.current
  }
`)
