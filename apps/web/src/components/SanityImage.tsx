import Image from 'next/image'
import {urlFor} from '@/sanity/lib/image'
import type {SanityImageSource} from '@sanity/image-url'

interface SanityImageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
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

  const resolvedAlt =
    alt ||
    (typeof value === 'object' && value && 'alt' in value && typeof value.alt === 'string' ? value.alt : '') ||
    'HappyFlying Tours'

  const calculatedHeight = height || Math.round(width / 1.5)

  let src: string | null = null

  try {
    if (typeof value === 'string') {
      src = value.startsWith('http')
        ? value
        : urlFor(value).width(width).height(calculatedHeight).fit('crop').auto('format').url()
    } else if (value && (value.asset || value._ref || value._id)) {
      src = urlFor(value).width(width).height(calculatedHeight).fit('crop').auto('format').url()
    } else if (value?.url) {
      src = value.url
    }
  } catch {
    if (value?.asset?.url) {
      src = value.asset.url
    }
  }

  const finalSrc = src || value?.asset?.url

  if (!finalSrc || typeof finalSrc !== 'string') {
    return null
  }

  const lqip = value?.asset?.metadata?.lqip

  return (
    <Image
      className={className}
      src={finalSrc}
      alt={resolvedAlt}
      width={width}
      height={calculatedHeight}
      priority={priority}
      placeholder={lqip ? 'blur' : 'empty'}
      blurDataURL={lqip || undefined}
    />
  )
}
