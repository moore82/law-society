import {defineField, defineType} from 'sanity'

export const officersPageType = defineType({
  name: 'officersPage',
  title: 'Officers Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Officers of the Club',
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
      title: 'Body Text',
      type: 'array',
      of: [{type: 'block'}],
      description: 'The rich text content for the Officers page.',
    }),
    defineField({
      name: 'images',
      title: 'Featured Image',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
        }
      ],
      description: 'The first image here will be displayed as the large featured image next to the text. Additional images will be ignored on this page.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
