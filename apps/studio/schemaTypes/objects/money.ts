import {defineField, defineType} from 'sanity'

export const money = defineType({
  name: 'money',
  title: 'Money',
  type: 'object',
  fields: [
    defineField({
      name: 'amount',
      title: 'Amount',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      initialValue: 'INR',
      options: {
        list: [
          {title: 'INR (₹)', value: 'INR'},
          {title: 'USD ($)', value: 'USD'},
          {title: 'EUR (€)', value: 'EUR'},
          {title: 'AED (AED)', value: 'AED'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'formatted',
      title: 'Display Text (e.g. ₹24,999 / person)',
      type: 'string',
    }),
  ],
})
