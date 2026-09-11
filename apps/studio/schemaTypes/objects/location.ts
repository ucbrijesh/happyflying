import {defineField, defineType} from 'sanity'
import {PinIcon} from '@sanity/icons'

export const location = defineType({
  name: 'location',
  title: 'Location Details',
  type: 'object',
  icon: PinIcon,
  fields: [
    defineField({
      name: 'city',
      title: 'City / Island',
      type: 'string',
    }),
    defineField({
      name: 'state',
      title: 'State / Province',
      type: 'string',
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      initialValue: 'India',
    }),
    defineField({
      name: 'address',
      title: 'Full Address',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'lat',
      title: 'Latitude',
      type: 'number',
    }),
    defineField({
      name: 'lng',
      title: 'Longitude',
      type: 'number',
    }),
    defineField({
      name: 'mapUrl',
      title: 'Google Maps Link',
      type: 'url',
    }),
  ],
})
