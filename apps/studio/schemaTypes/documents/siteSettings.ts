import {defineArrayMember, defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'companyName',
      title: 'Company / Brand Name',
      type: 'string',
      initialValue: 'HappyFlying Tours & Travels LLP',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Company Tagline',
      type: 'string',
      initialValue: 'Wings to wonder, journeys with heart, and travel crafted around you.',
    }),
    defineField({
      name: 'logo',
      title: 'Primary Logo',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'phone',
      title: 'Primary Phone Number',
      type: 'string',
      initialValue: '+91 9900113691',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'whatsapp',
      title: 'Official WhatsApp Number (with country code, no + or spaces for links e.g. 919900113691)',
      type: 'string',
      initialValue: '919900113691',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Operations & Booking Email',
      type: 'string',
      initialValue: 'operations@happyflyingtravels.com',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Headquarters Address',
      type: 'text',
      rows: 3,
      initialValue: 'No 145, 3rd Floor, 80 Feet Road KHB Colony, 5th Block, Koramangala, Bangalore, Karnataka 560034',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Channels',
      type: 'array',
      of: [defineArrayMember({type: 'socialLink'})],
    }),
    defineField({
      name: 'defaultSeo',
      title: 'Default Site SEO & Meta Information',
      type: 'seo',
    }),
    defineField({
      name: 'navigation',
      title: 'Header Navigation Menu Links',
      type: 'array',
      of: [defineArrayMember({type: 'navItem'})],
    }),
    defineField({
      name: 'footerText',
      title: 'Footer Disclaimer / Description',
      type: 'text',
      rows: 2,
      initialValue: 'Where every journey takes wing with elegance, care, and unforgettable discovery. Headquartered in Koramangala, Bangalore.',
    }),
    defineField({
      name: 'bookingCta',
      title: 'Global Floating / Section CTA',
      type: 'contactCta',
    }),
  ],
  preview: {
    select: {
      title: 'companyName',
      subtitle: 'phone',
      media: 'logo',
    },
  },
})
