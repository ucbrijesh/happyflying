import {defineField, defineType} from 'sanity'
import {CommentIcon} from '@sanity/icons'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonials & Reviews',
  type: 'document',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Traveler Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Traveler Tag / City',
      type: 'string',
      description: 'e.g. Family Vacationer from Bangalore, Honeymooners from Mumbai',
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1 to 5 Stars)',
      type: 'number',
      initialValue: 5,
      validation: (rule) => rule.required().min(1).max(5),
    }),
    defineField({
      name: 'comment',
      title: 'Review / Testimonial Text',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'avatar',
      title: 'Traveler Photo',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'travelPackage',
      title: 'Package Booked',
      type: 'reference',
      to: [{type: 'travelPackage'}],
    }),
    defineField({
      name: 'featured',
      title: 'Feature on Homepage',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'avatar',
    },
  },
})
