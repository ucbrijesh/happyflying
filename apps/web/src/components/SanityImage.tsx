import Image from 'next/image'
import {urlFor} from '@/sanity/lib/image'
import type {SanityImageSource} from '@sanity/image-url'

interface SanityImageProps {
  value: SanityImageSource & {alt?: string; asset?: unknown}
  width?: number
  height?: number
  className?: string
  priority?: boolean
  alt?: string
}

export function SanityImage({
  value,
  width = 800,
  height,
  className,
  priority,
  alt,
}: SanityImageProps) {
  if (!value) return null

  const resolvedAlt = alt || (typeof value === 'object' && 'alt' in value ? (value.alt as string) : '') || 'Image'
  const calculatedHeight = height || Math.round(width / 1.5)

  try {
    const src = urlFor(value).width(width).height(calculatedHeight).fit('crop').auto('format').url()

    return (
      <Image
        className={className}
        src={src}
        alt={resolvedAlt}
        width={width}
        height={calculatedHeight}
        priority={priority}
      />
    )
  } catch {
    return null
  }
}
