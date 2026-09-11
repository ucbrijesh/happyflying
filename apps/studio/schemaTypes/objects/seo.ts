import {defineField, defineType} from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO & Social Sharing',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Optimal length: 50-60 characters',
      validation: (rule) => rule.max(70).warning('Titles longer than 70 characters may be truncated by search engines'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Optimal length: 140-160 characters',
      validation: (rule) => rule.max(170).warning('Descriptions longer than 170 characters may be truncated by search engines'),
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'openGraphImage',
      title: 'Open Graph / Social Sharing Image',
      type: 'imageWithAlt',
      description: 'Recommended size: 1200 x 630 pixels',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'Leave blank to use default canonical URL',
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from search engines (noindex)',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
