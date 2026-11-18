import { defineField, defineType } from 'sanity';

export const goldenPedroPageType = defineType({
  name: 'goldenPedroPage',
  title: 'Order of the Golden Pedro Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Order of the Golden Pedro',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
});
