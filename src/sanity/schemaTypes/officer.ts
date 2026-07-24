import {defineField, defineType} from 'sanity'

export const officerType = defineType({
  name: 'officer',
  title: 'Officer',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      options: {
        list: [
          {title: 'President', value: 'President'},
          {title: 'Chairman', value: 'Chairman'},
          {title: 'Hon Secretary', value: 'Hon Secretary'},
          {title: 'Treasurer', value: 'Treasurer'},
          {title: 'Fixtures Secretary', value: 'Fixtures Secretary'},
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'season',
      title: 'Season',
      type: 'string',
      description: 'The season this officer served (e.g., 1965-66)',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Used to sort officers on the page (lower number = higher up)',
    }),
  ],
})
