import { defineField, defineType } from 'sanity';

export const fosPageType = defineType({
  name: 'fosPage',
  title: 'Festival of Sport',
  type: 'document',
  fields: [
    defineField({
      name: 'heroBackgroundImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
      description: 'The background image for the top Hero section.',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      initialValue: 'Festival of Sport',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
      description: 'e.g. Festival name · dates · venue',
    }),
    defineField({
      name: 'aboutText',
      title: 'About Text',
      type: 'text',
      rows: 5,
      description: 'The description shown in the About the Festival section.',
    }),
    defineField({
      name: 'keyInfo',
      title: 'Key Info Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'desc', type: 'string', title: 'Description' },
          ],
        },
      ],
      description: 'The 3 key info cards (e.g. Dates, Venue, Format).',
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'winnersCount',
      title: 'Number of Winners on Landing Page',
      type: 'number',
      initialValue: 4,
      description: 'How many of the most recent winners should be displayed on the FOS landing page?',
      validation: (rule) => rule.min(1).max(20),
    }),
  ],
});
