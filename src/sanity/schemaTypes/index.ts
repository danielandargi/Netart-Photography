import { type SchemaTypeDefinition } from 'sanity'
import service from '../schemas/service'
import siteSettings from '../schemas/siteSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [service, siteSettings],
}
