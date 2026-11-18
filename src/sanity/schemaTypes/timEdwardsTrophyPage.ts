import { defineField, defineType } from 'sanity';

export const timEdwardsTrophyPageType = defineType({
  name: 'timEdwardsTrophyPage',
  title: 'Tim Edwards Memorial Trophy Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Tim Edwards Memorial Trophy',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
});
