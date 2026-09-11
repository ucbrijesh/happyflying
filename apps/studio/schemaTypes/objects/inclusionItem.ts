import {defineField, defineType} from 'sanity'
import {CheckmarkCircleIcon} from '@sanity/icons'

export const inclusionItem = defineType({
  name: 'inclusionItem',
  title: 'Inclusion Item',
  type: 'object',
  icon: CheckmarkCircleIcon,
  fields: [
    defineField({
      name: 'item',
      title: 'Inclusion Detail',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Hotel & Stay', value: 'stay'},
          {title: 'Cabs & Transfers', value: 'transfers'},
          {title: 'Cruises & Ferries', value: 'cruises'},
          {title: 'Meals & Dining', value: 'meals'},
          {title: 'Tickets & Permits', value: 'tickets'},
          {title: 'Activities & Water Sports', value: 'activities'},
          {title: 'On-Ground Support', value: 'support'},
          {title: 'General', value: 'general'},
        ],
      },
      initialValue: 'general',
    }),
  ],
  preview: {
    select: {
      title: 'item',
      subtitle: 'category',
    },
  },
})
