/**
 * inventory controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::inventory.inventory', () => ({
  async create (ctx) {
    console.info('createCoreController', ctx)

    const response = await super.create(ctx)

    return response
  }
}))
