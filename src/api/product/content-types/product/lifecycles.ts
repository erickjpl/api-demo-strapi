import { errors } from '@strapi/utils'
const { ValidationError } = errors

let categoryIds

export default {
  afterCreate: async (event) => {
    const { data } = event.params

    if ('category' in data && 'connect' in data.category && data.category.connect.length) {
      const connect = data.category.connect.reduce((acc, current) => (acc || current), undefined)
      await strapi.service('api::category.category').updateProducts(connect.id)
    }
  },
  afterUpdate: async (event) => {
    const { where, data } = event.params

    if ('category' in data) {
      if ('connect' in data.category && data.category.connect.length) {
        const connect = data.category.connect.reduce((acc, current) => (acc || current), undefined)
        await strapi.service('api::category.category').updateProducts(connect.id)
      }

      if ('disconnect' in data.category && data.category.disconnect.length) {
        const disconnect = data.category.disconnect.reduce((acc, current) => (acc || current), undefined)
        await strapi.service('api::category.category').updateProducts(disconnect.id)
      }
    }
  },
  beforeDelete: async (event) => {
    const { where } = event.params
    await validCanBeDeleted(where.id)
    categoryIds = await searchCategoryRelatedToProduct(where.id)
  },
  afterDelete: async () => {
    await strapi.service('api::category.category').updateProducts(categoryIds)
  },
  beforeDeleteMany: async (event) => {
    const { where } = event.params
    const ids = where['$and'][0]['id']['$in']
    await validCanBeDeleted(ids)
    categoryIds = await searchCategoryRelatedToProduct(ids)
  },
  afterDeleteMany: async () => {
    console.info({ categoryIds })
    categoryIds.forEach((categoryId) => strapi.service('api::category.category').updateProducts(categoryId))
  }
}

const validCanBeDeleted = async (ids: number | number[]) => {
  const result = await strapi.db.query('api::inventory.inventory').findMany({ where: { product: ids } })

  if (result.length > 0)
    throw new ValidationError('The product cannot be deleted because it has associated inventories.')
}

const searchCategoryRelatedToProduct = async (productIds: number | number[]) => {
  const products = await strapi.db.query('api::product.product').findMany({
    where: { id: productIds },
    populate: ['category']
  })

  return products && typeof productIds === 'object' ? [...new Set(products.map((item) => item.category.id))] : products[0].category.id
}
