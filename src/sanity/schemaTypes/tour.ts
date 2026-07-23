import { defineField, defineType } from 'sanity';

export const tourType = defineType({
  name: 'tour',
  title: 'Historical Tour',
  type: 'document',
  fields: [
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
    }),
    defineField({
      name: 'venues',
      title: 'Venues',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    select: {
      title: 'year',
      venues: 'venues',
    },
    prepare({ title, venues }) {
      return {
        title: title ? `Tour ${title}` : 'Unknown Year',
        subtitle: venues ? venues.join(', ') : '',
      };
    },
  },
});
