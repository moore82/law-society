import {defineField, defineType} from 'sanity'

export const timEdwardsTrophyType = defineType({
  name: 'timEdwardsTrophy',
  title: 'Tim Edwards Trophy',
  type: 'document',
  fields: [
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      description: 'e.g. 2026',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'recipient',
      title: 'Recipient Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'reason',
      title: 'Reason for Award',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'recipient',
      subtitle: 'year',
    },
  }
})
