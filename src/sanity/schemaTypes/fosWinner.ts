import { defineField, defineType } from 'sanity'

export const fosWinnerType = defineType({
  name: 'fosWinner',
  title: 'FOS Winner',
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
      name: 'cupWinner',
      title: 'Cup Winner',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'shieldWinner',
      title: 'Shield Winner',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'year',
      subtitle: 'cupWinner',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: title,
        subtitle: `Cup: ${subtitle}`,
      }
    }
  }
})
