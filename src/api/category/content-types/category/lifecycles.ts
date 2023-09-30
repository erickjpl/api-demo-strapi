import { errors } from '@strapi/utils'
const { ValidationError } = errors

export default {
  beforeDelete: async (event) => {
    const { where } = event.params
    await validCanBeDeleted(where.id)
  },
  beforeDeleteMany: async (event) => {
    const { where } = event.params
    const ids = where['$and'][0]['id']['$in']
    await validCanBeDeleted(ids)
  }
}

const validCanBeDeleted = async (ids: number | number[]) => {
  const result = await strapi.db.query('api::product.product').findMany({ where: { category: ids } })

  if (result.length > 0)
    throw new ValidationError('The category cannot be deleted because it has associated products.')
}
