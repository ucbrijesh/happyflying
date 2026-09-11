import {PortableText, type PortableTextComponents} from 'next-sanity'
import {SanityImage} from './SanityImage'
import Link from 'next/link'

const components: PortableTextComponents = {
  block: {
    h1: ({children}) => <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 mt-8 mb-4">{children}</h1>,
    h2: ({children}) => <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 mt-8 mb-4">{children}</h2>,
    h3: ({children}) => <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 mt-6 mb-3">{children}</h3>,
    normal: ({children}) => <p className="text-base sm:text-lg text-zinc-700 leading-relaxed mb-6">{children}</p>,
    blockquote: ({children}) => (
      <blockquote className="border-l-4 border-sky-500 pl-4 py-1 my-6 italic text-zinc-700 bg-sky-50/50 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  types: {
    image: ({value}) => (
      <figure className="my-8 overflow-hidden rounded-2xl border border-zinc-200 shadow-sm">
        <SanityImage value={value} width={1200} height={675} className="w-full h-auto object-cover" />
        {value.caption && (
          <figcaption className="p-3 text-center text-sm text-zinc-500 bg-zinc-50 border-t border-zinc-100">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
  marks: {
    strong: ({children}) => <strong className="font-semibold text-zinc-900">{children}</strong>,
    em: ({children}) => <em className="italic">{children}</em>,
    link: ({children, value}) => {
      const href = value?.href || '#'
      const isExternal = href.startsWith('http://') || href.startsWith('https://')
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-600 font-medium underline underline-offset-2 hover:text-sky-800 transition-colors"
          >
            {children}
          </a>
        )
      }
      return (
        <Link
          href={href}
          className="text-sky-600 font-medium underline underline-offset-2 hover:text-sky-800 transition-colors"
        >
          {children}
        </Link>
      )
    },
  },
  list: {
    bullet: ({children}) => <ul className="list-disc list-inside space-y-2 mb-6 text-zinc-700">{children}</ul>,
    number: ({children}) => <ol className="list-decimal list-inside space-y-2 mb-6 text-zinc-700">{children}</ol>,
  },
}

export function CustomPortableText({value}: {value: unknown}) {
  if (!value || !Array.isArray(value)) return null
  return <PortableText value={value} components={components} />
}
