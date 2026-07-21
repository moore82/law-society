import {defineField, defineType} from 'sanity'

export const galleryPageType = defineType({
  name: 'galleryPage',
  title: 'Gallery Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'GALLERY',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Intro Text',
      type: 'text',
      rows: 3,
      description: 'Optional short introduction text displayed below the title.',
    }),
    defineField({
      name: 'images',
      title: 'Gallery Images',
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
      description: 'Upload multiple photos to display in the main gallery.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
