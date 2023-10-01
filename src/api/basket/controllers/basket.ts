/**
 * basket controller
 */

import { factories } from '@strapi/strapi'
import { useBasket } from '../helpers/basket'

export default factories.createCoreController('api::basket.basket', ({ strapi }) => ({
  async create (ctx) {
    const helper = useBasket(strapi)

    const { user, sanitizedQuery, sanitizedInputData } = await helper.validateRequest(ctx)

    const basket = await helper.searchCustomerBasket(user)

    const payload = helper.basketObjectToStore(user, sanitizedQuery, sanitizedInputData)

    const entity = await helper.saveData(basket, payload)

    helper.delegateItemRegistration(entity, sanitizedInputData)

    return await helper.response(entity, ctx)
  }
}))
