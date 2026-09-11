import {defineField, defineType} from 'sanity'
import {CreditCardIcon} from '@sanity/icons'

export const pricing = defineType({
  name: 'pricing',
  title: 'Pricing & Seasonal Rates',
  type: 'document',
  icon: CreditCardIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Rate Plan Title',
      type: 'string',
      description: 'e.g. Andaman 5D4N Standard Season (Oct - Mar)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'package',
      title: 'Associated Travel Package',
      type: 'reference',
      to: [{type: 'travelPackage'}],
    }),
    defineField({
      name: 'validFrom',
      title: 'Rate Validity Start Date',
      type: 'date',
    }),
    defineField({
      name: 'validTo',
      title: 'Rate Validity End Date',
      type: 'date',
    }),
    defineField({
      name: 'occupancy',
      title: 'Occupancy Basis',
      type: 'string',
      options: {
        list: [
          {title: 'Double Sharing (2 Adults)', value: 'Double Sharing'},
          {title: 'Triple Sharing (3 Adults)', value: 'Triple Sharing'},
          {title: 'Single Occupancy (1 Adult)', value: 'Single Occupancy'},
          {title: 'Family Package (2 Adults + 2 Kids)', value: 'Family Package'},
        ],
      },
      initialValue: 'Double Sharing',
    }),
    defineField({
      name: 'adults',
      title: 'Standard Adults Count',
      type: 'number',
      initialValue: 2,
    }),
    defineField({
      name: 'children',
      title: 'Children Included',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'rooms',
      title: 'Number of Rooms',
      type: 'number',
      initialValue: 1,
    }),
    defineField({
      name: 'mealPlan',
      title: 'Included Meal Plan',
      type: 'string',
      initialValue: 'Complimentary Breakfast & Dinner (MAP)',
    }),
    defineField({
      name: 'basePrice',
      title: 'Base Price (INR)',
      type: 'number',
    }),
    defineField({
      name: 'taxes',
      title: 'Taxes / GST (INR)',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'markup',
      title: 'Agency Markup (INR)',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'finalPrice',
      title: 'Final Price per Person / Room (INR)',
      type: 'number',
      description: 'Numeric price used for filtering and sorting',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'displayPrice',
      title: 'Display Price String',
      type: 'string',
      description: 'Human readable display price e.g. "Call Us" or "₹24,999 / person"',
      initialValue: 'Call Us',
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      initialValue: 'INR',
    }),
    defineField({
      name: 'notes',
      title: 'Rate Inclusions / Seasonal Surcharges Note',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'displayPrice',
      occupancy: 'occupancy',
    },
    prepare(selection) {
      const {title, subtitle, occupancy} = selection
      return {
        title: title || 'Rate Plan',
        subtitle: `${subtitle || 'Call Us'} • ${occupancy || 'Standard'}`,
      }
    },
  },
})
