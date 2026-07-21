import { defineField, defineType } from 'sanity';

export const fosGalleryPageType = defineType({
  name: 'fosGalleryPage',
  title: 'FOS Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Gallery Title',
      type: 'string',
      initialValue: 'FOS GALLERY',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility.',
            },
          ],
        },
      ],
      description: 'Add photos to the FOS gallery here. The top 4 will appear on the FOS landing page.',
    }),
  ],
});
