'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schema } from './src/sanity/schemaTypes'
import { structure } from './src/sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({ structure }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  document: {
    // Hide singletons from the global "Create new document" menu
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter((templateItem) => !['aboutPage', 'historyPage', 'officersPage', 'honoursPage', 'fixturesPage'].includes(templateItem.templateId))
      }
      return prev
    },
    // Removes the "duplicate" action on Singleton documents
    actions: (prev, { schemaType }) => {
      if (['aboutPage', 'historyPage', 'officersPage', 'honoursPage', 'fixturesPage'].includes(schemaType)) {
        return prev.filter(({ action }) => !['unpublish', 'delete', 'duplicate'].includes(action))
      }
      return prev
    },
  },
})
