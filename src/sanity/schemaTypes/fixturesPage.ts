import {defineField, defineType} from 'sanity'

export const fixturesPageType = defineType({
  name: 'fixturesPage',
  title: 'Fixtures Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Fixtures & Results',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Intro Text',
      type: 'text',
    }),
    defineField({
      name: 'content',
      title: 'Body Text',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'images',
      title: 'Featured Image',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
