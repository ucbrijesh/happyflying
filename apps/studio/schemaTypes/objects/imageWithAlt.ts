import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export const imageWithAlt = defineType({
  name: 'imageWithAlt',
  title: 'Image with Alt Text',
  type: 'image',
  icon: ImageIcon,
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternative Text',
      type: 'string',
      description: 'Important for SEO and screen readers. Describe what is in the image.',
      validation: (rule) => rule.required().warning('Alt text is recommended for SEO and accessibility'),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional caption to display underneath the image',
    }),
  ],
  preview: {
    select: {
      title: 'alt',
      subtitle: 'caption',
      media: 'asset',
    },
  },
})
