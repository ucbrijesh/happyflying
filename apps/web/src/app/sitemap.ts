import { MetadataRoute } from 'next'
import { getAllPackages, getAllDestinations, getAllBlogPosts, getAllServices } from '@/lib/sanity/fetch'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://happyflying.vercel.app'

  // Fetch all dynamic records for indexing
  const [packages, destinations, posts, services] = await Promise.all([
    getAllPackages(),
    getAllDestinations(),
    getAllBlogPosts(),
    getAllServices(),
  ])

  const staticRoutes = [
    '',
    '/packages',
    '/destinations',
    '/services',
    '/about',
    '/contact',
    '/travel-planner',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  const packageRoutes = packages.map((pkg) => ({
    url: `${baseUrl}/packages/${pkg.slug?.current || pkg.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }))

  const destinationRoutes = destinations.map((dest) => ({
    url: `${baseUrl}/destinations/${dest.slug?.current || dest.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  const postRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug?.current || post.slug}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const serviceRoutes = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug?.current || service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    ...staticRoutes,
    ...packageRoutes,
    ...destinationRoutes,
    ...postRoutes,
    ...serviceRoutes,
  ]
}
