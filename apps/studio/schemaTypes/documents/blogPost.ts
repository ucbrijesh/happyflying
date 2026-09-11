import {defineArrayMember, defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog & Travel Stories',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Post Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'teamMember'}],
    }),
    defineField({
      name: 'categories',
      title: 'Categories / Tags',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(200).warning('Keep under 200 characters for optimal SEO snippets'),
    }),
    defineField({
      name: 'mainImage',
      title: 'Cover Image',
      type: 'imageWithAlt',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Story Content',
      type: 'array',
      of: [
        defineArrayMember({type: 'block'}),
        defineArrayMember({type: 'imageWithAlt'}),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {title, author, media} = selection
      return {
        title,
        subtitle: author ? `By ${author}` : 'Blog Post',
        media,
      }
    },
  },
})
