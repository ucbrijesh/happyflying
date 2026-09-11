import {defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team & Concierges',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / Designation',
      type: 'string',
      description: 'e.g. Senior Travel Concierge, Founder & Destination Specialist',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Biography / Expertise',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Profile Photo',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },
})
