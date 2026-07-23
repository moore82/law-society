import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'openingHoursPage',
  title: 'Opening Hours',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Opening Hours',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Opening Hours' };
    }
  }
});
