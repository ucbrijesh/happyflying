import {defineQuery} from 'next-sanity'

export const POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    author->{
      name,
      image
    },
    categories[]->{
      _id,
      title,
      slug
    }
  }
`)

export const POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    author->{
      name,
      image,
      bio
    },
    categories[]->{
      _id,
      title,
      slug
    },
    body
  }
`)

export const POST_SLUGS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)]{
    "slug": slug.current
  }
`)

export const PAGE_QUERY = defineQuery(`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    heading,
    subheading,
    body
  }
`)
