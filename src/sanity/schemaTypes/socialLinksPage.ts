import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'socialLinksPage',
  title: 'Social Links',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Social Links',
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
      return { title: 'Social Links' };
    }
  }
});
