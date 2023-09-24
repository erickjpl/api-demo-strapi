/**
 * category service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::category.category', {
  async updateProducts (category: number) {
    const count = await strapi.db.query("api::product.product").count({ where: { category: category } })

    await strapi.entityService.update('api::category.category', category, { data: { products: count } })
  }
});
