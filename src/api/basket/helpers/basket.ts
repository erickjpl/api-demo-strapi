import { isObject } from 'lodash/fp'
import { errors, parseMultipartData } from '@strapi/utils'
const { ValidationError } = errors

export function useBasket (strapi) {
  const validateRequest = async (ctx) => {
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
  }

  const searchCustomerBasket = async (user) => {
    return await strapi.db.query('api::basket.basket').findOne({
      select: ['id'],
      where: {
        user: user.connect[0].id,
        status: 'Active'
      }
    })
  }

  const basketObjectToStore = (user, sanitizedQuery, sanitizedInputData) => {
    return {
      ...sanitizedQuery,
      data: {
        user: user.connect[0].id,
        ...sanitizedInputData
      }
    }
  }

  const saveData = async (basket, payload) => {
    let entity

    if (basket) {
      entity = await strapi
        .service('api::basket.basket')
        .update(basket.id, payload)
    } else {
      entity = await strapi
        .service('api::basket.basket')
        .create(payload)
    }

    return entity
  }

  const delegateItemRegistration = async (entity, sanitizedInputData) => {
    let payload = {
      basket: entity.id,
      inventory: sanitizedInputData.inventory.connect[0].id,
      quantity: sanitizedInputData.quantity,
      price: sanitizedInputData.price
    }

    if (sanitizedInputData.discount !== undefined) payload = { ...sanitizedInputData, discount: sanitizedInputData.discount }
    if (sanitizedInputData.status !== undefined) payload = { ...sanitizedInputData, status: sanitizedInputData.status }

    await strapi
      .service('api::basket.basket-item')
      .syncItem(payload)
  }

  const response = async (entity, ctx) => {
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx)
    return this.transformResponse(sanitizedEntity)
  }

  return {
    validateRequest,
    searchCustomerBasket,
    basketObjectToStore,
    saveData,
    delegateItemRegistration,
    response
  }
}
