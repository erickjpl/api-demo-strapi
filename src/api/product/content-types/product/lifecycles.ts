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
    const { where, data } = event.params

    const category = await helper.searchCategoryRelatedToProduct(where.id)
    !category && helper.validateCategory(data.category)

    // Se usa cuando la peticion es por la api
    if (data.hasOwnProperty('category') && Number.isInteger(data.category)) {
      if (data.category !== category.id)
        global.categoryOldId = category.id
      else
        global.categoryOldId = undefined
    }

    // Se usa cuando la peticion es enviada por el dashboard
    const disconnect = data.category?.disconnect?.shift()
    disconnect && helper.validateCategory(data.category)
  },
  afterUpdate: async (event) => {
    const { data } = event.params

    // Se usa cuando la peticion es por la api
    if (global.categoryOldId) {
      await strapi.service('api::category.category').updateProducts(global.categoryOldId)
      await strapi.service('api::category.category').updateProducts(data.category)
      global.categoryOldId = undefined
    }

    // Se usa cuando la peticion es enviada por el dashboard
    const newCategory = data.category?.connect?.shift()
    newCategory && await strapi.service('api::category.category').updateProducts(newCategory.id)

    // Se usa cuando la peticion es enviada por el dashboard
    const oldCategory = data.category?.disconnect?.shift()
    oldCategory && await strapi.service('api::category.category').updateProducts(oldCategory.id)
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
