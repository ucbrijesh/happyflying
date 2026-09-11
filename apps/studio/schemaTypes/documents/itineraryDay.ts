import {defineArrayMember, defineField, defineType} from 'sanity'
import {CalendarIcon} from '@sanity/icons'

export const itineraryDay = defineType({
  name: 'itineraryDay',
  title: 'Itinerary Days',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'dayNumber',
      title: 'Day Number (e.g. 1, 2, 3...)',
      type: 'number',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'title',
      title: 'Day Title',
      type: 'string',
      description: 'e.g. Airport Pickup, Carbyn\'s Cove Beach & Cellular Jail Light & Sound Show',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Primary Location / Island',
      type: 'string',
      description: 'e.g. Port Blair, Havelock Island (Swaraj Dweep), Neil Island (Shaheed Dweep)',
    }),
    defineField({
      name: 'description',
      title: 'Day Overview / Narrative',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'morning',
      title: 'Morning Plan',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'afternoon',
      title: 'Afternoon Plan',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'evening',
      title: 'Evening Plan',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'overnight',
      title: 'Overnight Stay Details',
      type: 'string',
      description: 'e.g. Overnight stay in Port Blair, Hotel in Havelock Island',
    }),
    defineField({
      name: 'meals',
      title: 'Included Meals for this Day',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {
        list: [
          {title: 'Breakfast Included', value: 'Breakfast'},
          {title: 'Lunch Included', value: 'Lunch'},
          {title: 'Dinner Included', value: 'Dinner'},
          {title: 'Packed Breakfast on Departure', value: 'Packed Breakfast'},
        ],
      },
    }),
    defineField({
      name: 'activities',
      title: 'Activities on this Day',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'activity'}]})],
    }),
    defineField({
      name: 'transfers',
      title: 'Transfers & Transport',
      type: 'array',
      of: [defineArrayMember({type: 'transfer'})],
    }),
    defineField({
      name: 'images',
      title: 'Day Photos',
      type: 'array',
      of: [defineArrayMember({type: 'imageWithAlt'})],
    }),
    defineField({
      name: 'mapLocation',
      title: 'Map Location',
      type: 'location',
    }),
    defineField({
      name: 'importantNote',
      title: 'Important Day Guidelines / Timings',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: {
      day: 'dayNumber',
      title: 'title',
      location: 'location',
    },
    prepare(selection) {
      const {day, title, location} = selection
      return {
        title: `Day ${day}: ${title}`,
        subtitle: location || 'Itinerary Day',
      }
    },
  },
})
