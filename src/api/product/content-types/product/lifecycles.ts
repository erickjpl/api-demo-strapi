import { searchCategoryRelatedToProduct } from "../../helpers/product"

let categoryId

export default {
  afterCreate: async (event) => {
    const { where, data } = event.params

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
    categoryId = await searchCategoryRelatedToProduct(where.id)
  },
  afterDelete: async () => {
    await strapi.service('api::category.category').updateProducts(categoryId)
  }
}
