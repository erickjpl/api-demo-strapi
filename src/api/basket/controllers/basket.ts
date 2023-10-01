/**
 * basket controller
 */
import { factories } from '@strapi/strapi'
import { errors, parseMultipartData } from '@strapi/utils'
import { isObject } from 'lodash/fp'
const { ValidationError } = errors

import { useBasket } from '../helpers/basket'

export default factories.createCoreController('api::basket.basket', ({ strapi }) => ({
  async create (ctx) {
    const helper = useBasket(strapi)

    const { user, sanitizedQuery, sanitizedInputData } = await this.validateRequest(ctx)

    const basket = await helper.searchCustomerBasket(user)

    const payload = helper.basketObjectToStore(user, sanitizedQuery, sanitizedInputData)

    const entity = await helper.saveData(basket, payload)

    helper.delegateItemRegistration(entity, sanitizedInputData)

    return await this.response(entity, ctx)
  },
  async validateRequest (ctx) {
    await this.validateQuery(ctx)
    const sanitizedQuery = await this.sanitizeQuery(ctx)

    if (ctx.is('multipart'))
      return parseMultipartData(ctx)

    const { data } = ctx.request.body || {}
    const { user } = data

    if (!isObject(data))
      throw new ValidationError('Missing "data" payload in the request body')

    const sanitizedInputData = await this.sanitizeInput(data, ctx)

    return { user, sanitizedQuery, sanitizedInputData }
  },
  async response (entity, ctx) {
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx)
    return this.transformResponse(sanitizedEntity)
  }
}))
