import {defineField, defineType} from 'sanity'
import {SparklesIcon} from '@sanity/icons'

export const packageHighlight = defineType({
  name: 'packageHighlight',
  title: 'Package Highlight',
  type: 'object',
  icon: SparklesIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'icon',
      title: 'Icon Keyword',
      type: 'string',
      description: 'e.g. ship, beach, jail, snorkeling, hotel, sunset',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})
