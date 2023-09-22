/**
 * inventory controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::inventory.inventory', ({ strapi }) =>  ({
  async create(ctx) {
    console.info('Controller create init', {ctx})

    const response = await super.create(ctx);

    console.info('Controller create', {response})

    // strapi.service('api::restaurant.restaurant').update();

    return response;
  },

  async update(ctx) {
    console.info('Controller create update', {ctx})

    const response = await super.update(ctx);

    console.info('Controller update', {response})

    // strapi.service('api::restaurant.restaurant').update();

    return response;
  }
}));
