import {defineField, defineType} from 'sanity'

export const captainType = defineType({
  name: 'captain',
  title: 'Captain',
  type: 'document',
  fields: [
    defineField({
      name: 'season',
      title: 'Season',
      type: 'string',
      description: 'e.g. 2026 / 2027',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'firstXv',
      title: 'First XV Captain',
      type: 'string',
    }),
    defineField({
      name: 'secondXv',
      title: 'Second XV Captain',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
      description: 'Higher numbers appear first by default, use negative numbers to force to bottom, etc.',
    }),
  ],
  preview: {
    select: {
      title: 'season',
      subtitle: 'firstXv',
    },
    prepare({title, subtitle}) {
      return {
        title: title,
        subtitle: subtitle ? `1st XV: ${subtitle}` : '',
      }
    }
  }
})
