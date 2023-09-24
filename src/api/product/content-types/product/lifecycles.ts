import { useProductHelper } from "../../composable/product"

const helper = useProductHelper()

export default {
  beforeCreate: async (event) => {
    const { data } = event.params
    helper.validateCategory(data.category)
  },
  afterCreate: async () => {
    global.categoryId && await strapi.service('api::category.category').updateProducts(global.categoryId)
    global.categoryId = undefined
  },
  beforeUpdate: async (event) => {
    const { where, data } = event.params

    const categoryEntity = await helper.searchCategoryRelatedToProduct(where.id)
    if (!categoryEntity) helper.validateCategory(data.category, true)

    if (data.hasOwnProperty('category')) {
      helper.validateCategory(data.category)
      const disconnect = data.category?.disconnect?.reduce((acc, current) => (acc || current), undefined) || categoryEntity
      global.categoryOldId = disconnect && disconnect.id
    } else
      global.categoryId = undefined
  },
  afterUpdate: async () => {
    global.categoryId && await strapi.service('api::category.category').updateProducts(global.categoryId)
    global.categoryOldId && await strapi.service('api::category.category').updateProducts(global.categoryOldId)
    global.categoryId = undefined
    global.categoryOldId = undefined
  },
  beforeDelete: async (event) => {
    const { where } = event.params
    await helper.assignProductCategoryToGlobalState(where.id)
  },
  afterDelete: async () => {
    global.categoryId && await strapi.service('api::category.category').updateProducts(global.categoryId)
    global.categoryId = undefined
  }
}
