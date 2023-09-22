/**
 * basket controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::basket.basket', ({ strapi }) => ({
  async create (ctx) {
    const response = await super.create(ctx);

    await strapi.service('api::checkout.checkout').create(ctx, response.data.id);

    return response;
  }
}));
