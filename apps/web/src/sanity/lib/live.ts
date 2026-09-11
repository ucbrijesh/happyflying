import {defineLive} from 'next-sanity/live'
import {client} from '@/sanity/client'
import {token} from '@/sanity/lib/token'

export const {sanityFetch, SanityLive} = defineLive({
  client: client.withConfig({
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-02-01',
  }),
  serverToken: token,
  browserToken: token,
})
