import { defineField, defineType } from 'sanity';

export const surreyVicePresidentType = defineType({
  name: 'surreyVicePresident',
  title: 'Surrey Vice President',
  type: 'document',
  fields: [
    defineField({
      name: 'yearAwarded',
      title: 'Year Awarded',
      type: 'number',
    }),
    defineField({
      name: 'lawman',
      title: 'Lawman',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'lawman',
      subtitle: 'yearAwarded',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle ? `Year: ${subtitle}` : '',
      };
    },
  },
});
