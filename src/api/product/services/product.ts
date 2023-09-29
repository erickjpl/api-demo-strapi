/**
 * product service
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreService('api::product.product', ({ strapi }) => ({
  async updateAvailableProduct (product: number, update) {
    await strapi.db.query('api::product.product').update({
      where: { id: product },
      data: { ...update }
    })
  }
}))

