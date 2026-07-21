import {defineField, defineType} from 'sanity'

export const contactPageType = defineType({
  name: 'contactPage',
  title: 'Contact',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'GET IN TOUCH',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'addressLine1',
      title: 'Address Line 1',
      type: 'string',
    }),
    defineField({
      name: 'addressLine2',
      title: 'Address Line 2',
      type: 'string',
    }),
    defineField({
      name: 'addressLine3',
      title: 'Address Line 3',
      type: 'string',
    }),
    defineField({
      name: 'town',
      title: 'Town',
      type: 'string',
    }),
    defineField({
      name: 'county',
      title: 'County',
      type: 'string',
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
    }),
    defineField({
      name: 'formRecipientEmail',
      title: 'Contact Form Recipient Email',
      type: 'string',
      description: 'The email address where contact form submissions will be sent.',
    }),
    defineField({
      name: 'googleMapEmbedUrl',
      title: 'Google Map Embed URL',
      type: 'url',
      description: 'Go to Google Maps -> Share -> Embed a map -> Copy HTML -> Extract just the "src" URL and paste it here.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
