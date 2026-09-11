import {defineField, defineType} from 'sanity'
import {TransferIcon} from '@sanity/icons'

export const transfer = defineType({
  name: 'transfer',
  title: 'Transfer Detail',
  type: 'object',
  icon: TransferIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Transfer Route',
      type: 'string',
      description: 'e.g. Port Blair Airport to Hotel, Port Blair to Havelock (Cruise)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mode',
      title: 'Mode of Travel',
      type: 'string',
      options: {
        list: [
          {title: 'Private AC Cab', value: 'private-cab'},
          {title: 'Premium Cruise (Makruzz / Nautika)', value: 'cruise'},
          {title: 'Speed Boat Ride', value: 'speed-boat'},
          {title: 'Government Ferry', value: 'ferry'},
          {title: 'Flight / Helicopter', value: 'flight'},
        ],
      },
      initialValue: 'private-cab',
    }),
    defineField({
      name: 'from',
      title: 'From Location',
      type: 'string',
    }),
    defineField({
      name: 'to',
      title: 'To Location',
      type: 'string',
    }),
    defineField({
      name: 'vehicleType',
      title: 'Vehicle / Class',
      type: 'string',
      description: 'e.g. AC Ertiga/Innova, Premium Class Cruise',
    }),
    defineField({
      name: 'details',
      title: 'Additional Notes',
      type: 'string',
      description: 'e.g. Point to point transfer within city limits',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'vehicleType',
    },
  },
})
