import {defineField, defineType} from 'sanity'

export const goldenPedroType = defineType({
  name: 'goldenPedro',
  title: 'Order of the Golden Pedro',
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
      name: 'inductee',
      title: 'Inductee Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'reason',
      title: 'Reason for Induction',
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
      title: 'inductee',
      subtitle: 'year',
    },
  }
})
