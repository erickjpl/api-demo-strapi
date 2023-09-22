/**
 * checkout service
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreService('api::checkout.checkout', ({ strapi }) => ({
  async create (ctx, basket) {
    const checkout = ctx.request.body.data.checkout

    const response = await strapi.db.query('api::checkout.checkout').findOne({
      where: {
        basket: basket,
        inventory: checkout.inventory
      }
    })

    console.info({ ...response, ...checkout, basket })

    if (!response)
      await super.create({ data: { ...response, ...checkout, basket } })
    else
      await super.update(response.id, { ...response, ...checkout })
  }
}))
