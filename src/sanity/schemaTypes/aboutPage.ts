import {defineField, defineType} from 'sanity'

export const aboutPageType = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'About the Club',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'About Text',
      type: 'array',
      of: [{type: 'block'}],
      description: 'The main rich text content for the About page.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'About Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
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
      description: 'Images specifically for the About page. These will not appear in the general gallery.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
