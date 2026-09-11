import {defineQuery} from 'next-sanity'

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_id == "siteSettings" || _type == "siteSettings"][0] {
    _id,
    companyName,
    tagline,
    phone,
    whatsapp,
    email,
    address,
    footerText,
    logo {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      },
      alt
    },
    socialLinks[] {
      _key,
      platform,
      url
    },
    defaultSeo {
      metaTitle,
      metaDescription,
      keywords,
      openGraphImage {
        asset->{ _id, url, metadata { lqip, dimensions } },
        alt
      },
      canonicalUrl,
      noIndex
    },
    navigation[] {
      _key,
      label,
      href,
      isExternal
    },
    bookingCta {
      title,
      description,
      phone,
      whatsapp,
      email,
      buttonText
    }
  }
`)

export const TESTIMONIALS_QUERY = defineQuery(`
  *[_type == "testimonial" && (featured == true || defined(rating))] | order(rating desc)[0...10] {
    _id,
    name,
    role,
    location,
    rating,
    comment,
    avatar {
      asset->{ _id, url, metadata { lqip, dimensions } },
      alt
    },
    travelPackage->{
      _id,
      title,
      "slug": slug.current
    }
  }
`)

export const FAQS_QUERY = defineQuery(`
  *[_type == "faq"] | order(_createdAt asc) {
    _id,
    question,
    answer,
    category
  }
`)

export const TEAM_MEMBERS_QUERY = defineQuery(`
  *[_type == "teamMember"] | order(_createdAt asc) {
    _id,
    name,
    role,
    bio,
    email,
    phone,
    image {
      asset->{ _id, url, metadata { lqip, dimensions } },
      alt
    }
  }
`)
