import { useProductHelper } from "../../composable/product"

const helper = useProductHelper()

export default {
  beforeCreate: async (event) => {
    const { data } = event.params

    if (!Number.isInteger(data.category))
      helper.validateCategory(data.category)
  },
  afterCreate: async (event) => {
    const { data } = event.params

    let newCategory
    if (Number.isInteger(data.category)) newCategory = data.category
    else {
      const { id } = data.category.connect.shift()
      newCategory = id
    }
    newCategory && await strapi.service('api::category.category').updateProducts(newCategory)
  },
  beforeUpdate: async (event) => {
    global.categoryId = undefined
    global.categoryOldId = undefined

    const { where, data } = event.params

    const categoryEntity = await helper.searchCategoryRelatedToProduct(where.id)
    if (!categoryEntity) helper.validateCategory(data.category)

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
    const categoryId = global.categoryId
    categoryId && await strapi.service('api::category.category').updateProducts(categoryId)
    global.categoryId = undefined
  }
}
