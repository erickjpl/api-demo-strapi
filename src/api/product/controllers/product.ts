/**
 * product controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::product.product', ({ strapi }) => ({
  async create (ctx) {
    const response = await super.create(ctx);

    await strapi.service('api::category.category').updateProducts(response.data.category);

    return response;
  },
  async update (ctx) {
    const response = await super.update(ctx);

    await strapi.service('api::category.category').updateProducts(response.data.category);

    return response;
  },
  async delate (ctx) {
    const response = await super.delate(ctx);
    console.info({ response })
    // await strapi.service('api::category.category').update(response.data.id, { products: 0 });
    // create (entityId, params = {})

    return response;
  }
}))
