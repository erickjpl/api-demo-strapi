/**
 * basket-item service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::basket.basket-item', {
  async syncItem (params) {
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
      await this.create({ data: payload })
    else
      await this.update(item.id, { data: { ...item, ...payload } })

    this.syncTotalBasket(params.basket)
  },
  async syncTotalBasket (basket) {
    const items = await strapi.db.query('api::basket.basket-item').findMany({
      select: ['total'],
      where: {
        basket: basket,
        itemStatus: 'In Basket'
      }
    })

    const totalBasket = items.map(item => item.total).reduce((acc, total) => acc + total, 0)
    await strapi.db.query('api::basket.basket').update({
      where: { id: basket },
      data: { total: totalBasket }
    })
  }
})
