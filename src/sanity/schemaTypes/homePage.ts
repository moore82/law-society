import { defineField, defineType } from 'sanity'

export const homePageType = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroBackgroundImage',
      title: 'Hero Background Image',
      type: 'image',
      description: 'The background image used across the whole site (apart from FOS)',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroLine1',
      title: 'Hero Heading Line 1',
      type: 'string',
      initialValue: 'Law Society',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroLine2',
      title: 'Hero Heading Line 2',
      type: 'string',
      initialValue: 'Rugby Club',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
      initialValue: 'Speed, Strategy, Spirit. Join the Elite.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'aboutTitle',
      title: 'About Section Title',
      type: 'string',
      initialValue: 'About our club',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'aboutText',
      title: 'About Section Text',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'featuredArticles',
      title: 'Featured Articles',
      type: 'array',
      description: 'Select up to 3 articles to feature on the homepage next to the About section.',
      of: [{ type: 'reference', to: [{ type: 'article' }] }],
      validation: (rule) => rule.max(3),
    }),
    defineField({
      name: 'ctaOverline',
      title: 'CTA Overline',
      type: 'string',
      initialValue: 'JOIN THE CLUB',
    }),
    defineField({
      name: 'ctaTitle',
      title: 'CTA Title',
      type: 'string',
      initialValue: 'BE PART OF THE CLUB LEGACY',
    }),
    defineField({
      name: 'joinTheClubText',
      title: 'Join The Club Text',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'JOIN THE LSRFC FAMILY',
    }),
    defineField({
      name: 'ctaButtonLink',
      title: 'CTA Button Link',
      type: 'string',
      initialValue: '/contact',
      description: 'The internal route (e.g. /contact) or external URL for the button',
    }),
  ],
})
