import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'sitemapPage',
  title: 'Sitemap',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Sitemap',
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
      return { title: 'Sitemap' };
    }
  }
});
