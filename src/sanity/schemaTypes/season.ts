import {defineField, defineType} from 'sanity'

export const seasonType = defineType({
  name: 'season',
  title: 'Season',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Season Name',
      type: 'string',
      description: 'e.g. 2026 / 2027',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Used for the URL. Hit "Generate" to auto-fill.',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
      description: 'Higher numbers appear first. e.g. 2026 for the 26/27 season.',
    }),
    defineField({
      name: 'isCurrentSeason',
      title: 'Is Current Season',
      type: 'boolean',
      description: 'Check this box if this is the current active season.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
  }
})
