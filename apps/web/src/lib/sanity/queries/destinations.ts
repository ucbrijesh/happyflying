import {defineQuery} from 'next-sanity'

export const DESTINATIONS_QUERY = defineQuery(`
  *[_type == "destination" && defined(slug.current)] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    country,
    region,
    shortDescription,
    bestTimeToVisit,
    idealDuration,
    heroImage {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      },
      alt
    }
  }
`)

export const DESTINATION_BY_SLUG_QUERY = defineQuery(`
  *[_type == "destination" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    country,
    region,
    shortDescription,
    description,
    bestTimeToVisit,
    idealDuration,
    highlights,
    thingsToDo,
    travelTips,
    heroImage {
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
    relatedPackages[]->{
      _id,
      title,
      "slug": slug.current,
      duration,
      rating,
      summary,
      hero {
        asset->{ _id, url, metadata { lqip, dimensions } },
        alt
      },
      pricing->{ displayPrice, finalPrice }
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

export const DESTINATION_SLUGS_QUERY = defineQuery(`
  *[_type == "destination" && defined(slug.current)]{
    "slug": slug.current
  }
`)
