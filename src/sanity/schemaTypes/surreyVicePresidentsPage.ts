import { defineField, defineType } from 'sanity';

export const surreyVicePresidentsPageType = defineType({
  name: 'surreyVicePresidentsPage',
  title: 'Surrey Vice Presidents Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Vice Presidents of Surrey Rugby',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
});
