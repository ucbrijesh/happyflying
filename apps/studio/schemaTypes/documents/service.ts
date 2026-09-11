import {defineArrayMember, defineField, defineType} from 'sanity'
import {CaseIcon} from '@sanity/icons'

export const service = defineType({
  name: 'service',
  title: 'Services',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Summary',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name / Keyword',
      type: 'string',
      description: 'e.g. plane, passport, hotel, globe, compass',
    }),
    defineField({
      name: 'heroImage',
      title: 'Service Image',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'features',
      title: 'Service Highlights / Offerings',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'cta',
      title: 'Service CTA',
      type: 'contactCta',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'shortDescription',
      media: 'heroImage',
    },
  },
})
