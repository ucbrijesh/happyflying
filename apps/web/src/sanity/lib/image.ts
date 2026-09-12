import {createImageUrlBuilder, type SanityImageSource} from '@sanity/image-url'
import {client} from '@/sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '819qznh7'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

const builder = createImageUrlBuilder({
  projectId,
  dataset,
})

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}
