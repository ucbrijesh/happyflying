import {defineField, defineType} from 'sanity'
import {CloseCircleIcon} from '@sanity/icons'

export const exclusionItem = defineType({
  name: 'exclusionItem',
  title: 'Exclusion Item',
  type: 'object',
  icon: CloseCircleIcon,
  fields: [
    defineField({
      name: 'item',
      title: 'Exclusion Detail',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'item',
    },
  },
})
