import {defineArrayMember, defineField, defineType} from 'sanity'
import {HomeIcon} from '@sanity/icons'

export const hotel = defineType({
  name: 'hotel',
  title: 'Hotels & Resorts',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Hotel / Resort Name',
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Hotel Category',
      type: 'string',
      options: {
        list: [
          {title: '5-Star Luxury Resort', value: '5-Star Luxury Resort'},
          {title: '4-Star Premium Hotel', value: '4-Star Premium Hotel'},
          {title: '3-Star Deluxe Hotel', value: '3-Star Deluxe Hotel'},
          {title: 'Boutique Beach Resort', value: 'Boutique Beach Resort'},
          {title: 'Heritage Villa', value: 'Heritage Villa'},
        ],
      },
      initialValue: '4-Star Premium Hotel',
    }),
    defineField({
      name: 'starRating',
      title: 'Star Rating (1 to 5)',
      type: 'number',
      validation: (rule) => rule.min(1).max(5),
      initialValue: 4,
    }),
    defineField({
      name: 'description',
      title: 'Property Overview',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero / Main Photo',
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
      name: 'amenities',
      title: 'Key Amenities',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'roomTypes',
      title: 'Available Room Types',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'mealPlan',
      title: 'Standard Meal Plan',
      type: 'string',
      options: {
        list: [
          {title: 'CP (Bed & Breakfast)', value: 'CP'},
          {title: 'MAP (Breakfast & Dinner)', value: 'MAP'},
          {title: 'AP (All Meals Included)', value: 'AP'},
          {title: 'EP (Room Only)', value: 'EP'},
        ],
      },
      initialValue: 'MAP',
    }),
    defineField({
      name: 'location',
      title: 'Location / Address',
      type: 'location',
    }),
    defineField({
      name: 'website',
      title: 'Official Website',
      type: 'url',
    }),
    defineField({
      name: 'checkIn',
      title: 'Check-In Time',
      type: 'string',
      initialValue: '12:00 PM',
    }),
    defineField({
      name: 'checkOut',
      title: 'Check-Out Time',
      type: 'string',
      initialValue: '10:00 AM',
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
