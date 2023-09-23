/**
 * category service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::category.category', {
  async updateProducts(newCategory: number, oldCategory?: number) {
    const newResponse = await super.findOne(newCategory);
    console.info({ newResponse })

    if (!oldCategory) return

    const oldResponse = await super.find(newCategory);
    console.info({ oldResponse })
  }
});
