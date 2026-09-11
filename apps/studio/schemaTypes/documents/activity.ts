import {defineArrayMember, defineField, defineType} from 'sanity'
import {ActivityIcon} from '@sanity/icons'

export const activity = defineType({
  name: 'activity',
  title: 'Activities & Experiences',
  type: 'document',
  icon: ActivityIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Activity / Experience Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'destination',
      title: 'Destination',
      type: 'reference',
      to: [{type: 'destination'}],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Water Sports & Diving', value: 'Water Sports'},
          {title: 'Heritage & History', value: 'Heritage'},
          {title: 'Island Cruises & Boating', value: 'Cruising'},
          {title: 'Nature & Sunset Views', value: 'Sightseeing'},
          {title: 'Adventure & Trekking', value: 'Adventure'},
        ],
      },
      initialValue: 'Water Sports',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'description',
      title: 'Full Details',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'heroImage',
      title: 'Main Photo',
      type: 'imageWithAlt',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Photo Gallery',
      type: 'array',
      of: [defineArrayMember({type: 'imageWithAlt'})],
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g. 45 Mins, 2 Hours, Half Day',
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty Level',
      type: 'string',
      options: {
        list: ['Easy', 'Moderate', 'Challenging'],
      },
      initialValue: 'Easy',
    }),
    defineField({
      name: 'ageSuitability',
      title: 'Age Suitability',
      type: 'string',
      description: 'e.g. 5+ Years, All Ages, 12+ for Scuba Diving',
    }),
    defineField({
      name: 'included',
      title: 'Complimentary in standard package',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'optional',
      title: 'Available as Add-on',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'price',
      title: 'Optional Add-on Price',
      type: 'money',
    }),
    defineField({
      name: 'operatingSeason',
      title: 'Operating Season / Best Months',
      type: 'string',
      description: 'e.g. October to May (Subject to weather & government permits)',
    }),
    defineField({
      name: 'importantNotes',
      title: 'Safety Guidelines & Important Notes',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'heroImage',
    },
  },
})
