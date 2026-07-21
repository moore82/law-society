import { defineField, defineType } from 'sanity'

export const toursPageType = defineType({
  name: 'toursPage',
  title: 'Tours',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'LSRFC Tours',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Intro Text',
      type: 'text',
      rows: 3,
      description: 'The short introduction text displayed below the title.',
    }),
    defineField({
      name: 'content',
      title: 'Tours Text',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'The main rich text content for the Tours page.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Tours Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility.',
            }
          ]
        }
      ],
      description: 'Images specifically for the Tours page.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
