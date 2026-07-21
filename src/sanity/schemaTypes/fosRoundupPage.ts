import {defineField, defineType} from 'sanity'

export const fosRoundupPageType = defineType({
  name: 'fosRoundupPage',
  title: 'FOS Roundup Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: "This year's roundup",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Intro Text',
      type: 'text',
      description: 'The prominent intro text displayed at the top of the page. This is also the text displayed on the main FOS landing page.',
    }),
    defineField({
      name: 'content',
      title: 'Roundup Text',
      type: 'array',
      of: [{type: 'block'}],
      description: 'The rich text content for the Roundup page.',
    }),
    defineField({
      name: 'images',
      title: 'Roundup Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
        }
      ],
      description: 'The first image here will also be used as the preview image on the main FOS landing page.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
