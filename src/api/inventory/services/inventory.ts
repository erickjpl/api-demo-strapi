/**
 * inventory service
 */

import { factories } from '@strapi/strapi'
import { checkAvailable } from '../helpers/product-inventory'

export default factories.createCoreService('api::inventory.inventory', () => ({
  async create (entityId, params) {
    const result = await super.create(entityId, params)

    const { id, available } = result

    checkAvailable(id, available)

    return result
  },

  async update (entityId, params) {
    const result = await super.update(entityId, params)

    const { id, available } = result

    checkAvailable(id, available)

    return result
  }
}))
