/**
 * inventory service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::inventory.inventory', ({ strapi }) =>  ({
  async create(entityId, params) {
    const result = await super.create(entityId, params);

    console.info('Service create', {result})

    return result;
  },

  async update(entityId, params) {
    const result = await super.update(entityId, params);

    console.info('Service update', {result})

    return result;
  }
}));
