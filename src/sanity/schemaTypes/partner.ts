import { defineField, defineType } from 'sanity';

export const partnerType = defineType({
  name: 'partner',
  title: 'Partner / Sponsor',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Logo / Image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'showOnHomePage',
      title: 'Show on Home Page',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'showOnFosPage',
      title: 'Show on Festival of Sport Page',
      type: 'boolean',
      initialValue: true,
    }),
  ],
});
