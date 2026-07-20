import {defineField, defineType} from 'sanity'

export const historyPageType = defineType({
  name: 'historyPage',
  title: 'History Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Club History',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Intro Text',
      type: 'text',
      description: 'The prominent intro text displayed at the top of the page.',
    }),
    defineField({
      name: 'content',
      title: 'History Text',
      type: 'array',
      of: [{type: 'block'}],
      description: 'The rich text content for the History page.',
    }),
    defineField({
      name: 'images',
      title: 'Historical Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
        }
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
