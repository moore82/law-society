import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'cookiePolicyPage',
  title: 'Cookie Policy',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Cookie Policy',
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
      return { title: 'Cookie Policy' };
    }
  }
});
