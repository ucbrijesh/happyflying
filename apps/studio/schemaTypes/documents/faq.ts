import {defineField, defineType} from 'sanity'
import {HelpCircleIcon} from '@sanity/icons'

export const faq = defineType({
  name: 'faq',
  title: 'FAQs',
  type: 'document',
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Booking & Payment', value: 'Booking'},
          {title: 'Andaman Travel Guidelines', value: 'Andaman'},
          {title: 'Flights & Ferry Transfers', value: 'Transfers'},
          {title: 'Customization & Groups', value: 'Customization'},
          {title: 'General Support', value: 'General'},
        ],
      },
      initialValue: 'General',
    }),
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'category',
    },
  },
})
