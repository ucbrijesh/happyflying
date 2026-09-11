import {defineArrayMember, defineField, defineType} from 'sanity'
import {PinIcon} from '@sanity/icons'

export const destination = defineType({
  name: 'destination',
  title: 'Destinations',
  type: 'document',
  icon: PinIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Destination Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      initialValue: 'India',
    }),
    defineField({
      name: 'region',
      title: 'Region / State',
      type: 'string',
      description: 'e.g. Andaman & Nicobar Islands, South India, Southeast Asia',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Summary for destination cards and teaser overviews',
    }),
    defineField({
      name: 'description',
      title: 'Comprehensive Destination Overview',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero / Banner Image',
      type: 'imageWithAlt',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Photo Gallery',
      type: 'array',
      of: [defineArrayMember({type: 'imageWithAlt'})],
    }),
    defineField({
      name: 'highlights',
      title: 'Top Destination Highlights',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'bestTimeToVisit',
      title: 'Best Time to Visit',
      type: 'string',
      description: 'e.g. October to May (Sunny, calm seas, ideal for water sports)',
    }),
    defineField({
      name: 'idealDuration',
      title: 'Ideal Trip Duration',
      type: 'string',
      description: 'e.g. 5 - 7 Days',
    }),
    defineField({
      name: 'thingsToDo',
      title: 'Top Things to Do',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'travelTips',
      title: 'Essential Travel Tips',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'faqs',
      title: 'Destination FAQs',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'faq'}]})],
    }),
    defineField({
      name: 'relatedPackages',
      title: 'Featured Tour Packages for this Destination',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'travelPackage'}]})],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'region',
      media: 'heroImage',
    },
  },
})
