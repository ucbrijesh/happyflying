import {defineField, defineType} from 'sanity'

export const packageBadge = defineType({
  name: 'packageBadge',
  title: 'Package Badge',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Badge Label (e.g. Best Seller, Luxury Cruise Included)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'color',
      title: 'Badge Style',
      type: 'string',
      options: {
        list: [
          {title: 'Gold / Sunset (Yellow)', value: 'sunset'},
          {title: 'Sky Blue', value: 'sky'},
          {title: 'Emerald Green', value: 'emerald'},
          {title: 'Rose / Pink', value: 'rose'},
        ],
      },
      initialValue: 'sunset',
    }),
  ],
})

export const feature = defineType({
  name: 'feature',
  title: 'Feature',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
    }),
  ],
})

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Social Link',
  type: 'object',
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          {title: 'Instagram', value: 'instagram'},
          {title: 'WhatsApp', value: 'whatsapp'},
          {title: 'YouTube', value: 'youtube'},
          {title: 'Facebook', value: 'facebook'},
          {title: 'LinkedIn', value: 'linkedin'},
          {title: 'Twitter / X', value: 'twitter'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
  ],
})

export const navItem = defineType({
  name: 'navItem',
  title: 'Navigation Item',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Link / URL Path',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isExternal',
      title: 'Open in new tab',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
