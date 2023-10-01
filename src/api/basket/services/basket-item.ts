/**
 * basket-item service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::basket.basket-item', {
  async syncItem (params) {
    console.info({ syncItem: params })

    const item = await strapi.db.query('api::basket.basket-item').findOne({
      where: {
        basket: params.basket,
        inventory: params.inventory
      }
    })

    const payload = {
      ...params,
      total: params.quantity * params.price
    }

    if (!item)
      await super.create({ data: payload })
    else
      await super.update(item.id, { ...item, ...payload })
  }
})
