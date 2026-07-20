import {defineField, defineType} from 'sanity'

export const fixtureType = defineType({
  name: 'fixture',
  title: 'Fixture',
  type: 'document',
  fields: [
    defineField({
      name: 'date',
      title: 'Date & Time',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'opponent',
      title: 'Opponent',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location (Home/Away or Address)',
      type: 'string',
    }),
    defineField({
      name: 'competition',
      title: 'Competition / League',
      type: 'string',
      description: 'e.g. Surrey Demerara League',
    }),
    defineField({
      name: 'homeScore',
      title: 'Home Score',
      type: 'number',
    }),
    defineField({
      name: 'awayScore',
      title: 'Away Score',
      type: 'number',
    }),
    defineField({
      name: 'isResult',
      title: 'Is this a completed result?',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'opponent',
      date: 'date',
      homeScore: 'homeScore',
      awayScore: 'awayScore',
      isResult: 'isResult',
    },
    prepare({title, date, homeScore, awayScore, isResult}) {
      const formattedDate = date ? new Date(date).toLocaleDateString() : 'TBD'
      const score = isResult ? `${homeScore ?? 0} - ${awayScore ?? 0}` : 'Upcoming'
      return {
        title: `vs ${title}`,
        subtitle: `${formattedDate} | ${score}`,
      }
    }
  }
})
