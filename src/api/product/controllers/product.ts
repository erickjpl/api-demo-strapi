/**
 * product controller
 */

import { factories } from '@strapi/strapi'
import { parseBody } from '../../helpers/transform'
import { validationBodyData } from '../../helpers/validationBodyData'

export default factories.createCoreController('api::product.product', ({ strapi }) => ({
  async create (ctx) {
    await this.validateQuery(ctx)

    if (validationBodyData(ctx, 'category'))
      return ctx.badRequest(`The category is missing.`, { category: 'The category is required.' })

    const sanitizedQuery = await this.sanitizeQuery(ctx)
    const { data, files } = parseBody(ctx)

    const entity = await strapi
      .service('api::product.product')
      .create({ ...sanitizedQuery, data, files })

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx)

    return this.transformResponse(sanitizedEntity)
  },
  async update (ctx) {
    const { id } = ctx.params
    await this.validateQuery(ctx)

    if (validationBodyData(ctx, 'category'))
      return ctx.badRequest(`The category is missing.`, { category: 'The category is required.' })

    const sanitizedQuery = await this.sanitizeQuery(ctx)
    const { data, files } = parseBody(ctx)

    const entity = await strapi
      .service('api::product.product')
      .update(id, { ...sanitizedQuery, data, files })

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx)

    return this.transformResponse(sanitizedEntity)
  }
}))
