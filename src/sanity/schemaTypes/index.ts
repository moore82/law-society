import { type SchemaTypeDefinition } from 'sanity'
import { officerType } from './officer'
import { honourType } from './honour'
import { fixtureType } from './fixture'
import { galleryImageType } from './galleryImage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [officerType, honourType, fixtureType, galleryImageType],
}
