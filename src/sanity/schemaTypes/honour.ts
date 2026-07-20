import {defineField, defineType} from 'sanity'

export const honourType = defineType({
  name: 'honour',
  title: 'Honour',
  type: 'document',
  fields: [
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      description: 'e.g. 2023-24',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'awardName',
      title: 'Award Category / Trophy',
      type: 'string',
      description: 'e.g. Player of the Year',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'recipient',
      title: 'Recipient Name / Team',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'awardName',
      subtitle: 'recipient',
      year: 'year',
    },
    prepare({title, subtitle, year}) {
      return {
        title: title,
        subtitle: `${year} - ${subtitle}`,
      }
    }
  }
})
