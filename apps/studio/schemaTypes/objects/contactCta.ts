import {defineField, defineType} from 'sanity'

export const contactCta = defineType({
  name: 'contactCta',
  title: 'Contact / Booking CTA',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Book & Customise This Tour',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      initialValue: 'Speak directly with our Bangalore travel concierges for instant seat holds, custom dates, or group discounts.',
    }),
    defineField({
      name: 'phone',
      title: 'Direct Phone',
      type: 'string',
      initialValue: '+91 9900113691',
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp Number',
      type: 'string',
      initialValue: '+91 9900113691',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      initialValue: 'operations@happyflyingtravels.com',
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      initialValue: 'Inquire on WhatsApp',
    }),
  ],
})
