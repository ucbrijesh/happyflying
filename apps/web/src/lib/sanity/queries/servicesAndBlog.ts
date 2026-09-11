import {defineQuery} from 'next-sanity'

export const SERVICES_QUERY = defineQuery(`
  *[_type == "service" && defined(slug.current)] | order(_createdAt asc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    icon,
    features,
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

export const SERVICE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    description,
    icon,
    features,
    heroImage {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      },
      alt
    },
    cta {
      title,
      description,
      phone,
      whatsapp,
      email,
      buttonText
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

export const SERVICE_SLUGS_QUERY = defineQuery(`
  *[_type == "service" && defined(slug.current)]{
    "slug": slug.current
  }
`)

export const BLOG_POSTS_QUERY = defineQuery(`
  *[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    categories,
    mainImage {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      },
      alt
    },
    author->{
      _id,
      name,
      role,
      image {
        asset->{ _id, url, metadata { lqip, dimensions } },
        alt
      }
    }
  }
`)

export const BLOG_POST_BY_SLUG_QUERY = defineQuery(`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    categories,
    mainImage {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      },
      alt
    },
    author->{
      _id,
      name,
      role,
      bio,
      image {
        asset->{ _id, url, metadata { lqip, dimensions } },
        alt
      }
    },
    body,
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

export const BLOG_POST_SLUGS_QUERY = defineQuery(`
  *[_type == "blogPost" && defined(slug.current)]{
    "slug": slug.current
  }
`)
