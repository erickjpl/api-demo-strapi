import { errors } from '@strapi/utils'
const { ValidationError } = errors

export function useProductHelper () {
  function validateCategory (category, categoryEntityEmpty: boolean = false) {
    let categoryId
    if (Number.isInteger(category)) categoryId = category
    else if (categoryEntityEmpty) {
      const connect = category.connect.reduce((acc, current) => (acc || current), undefined)
      categoryId = connect && connect.id
    } else {
      const connect = category.connect.reduce((acc, current) => (acc || current), undefined)
      const disconnect = category.disconnect.reduce((acc, current) => (acc || current), undefined)
      categoryId = (!connect && !disconnect) ? true : connect.id
    }

    if (!categoryId) {
      throw new ValidationError(`The category is missing.`, { category: 'The category is required.' })
    }

    return false
  }

  async function searchCategoryRelatedToProduct (productId: number) {
    const product = await strapi.db.query('api::product.product').findOne({
      where: { id: productId },
      populate: ['category']
    })

    return product && product.category
  }

  async function assignProductCategoryToGlobalState (productId: number) {
    const category = await searchCategoryRelatedToProduct(productId)

    if (category) global.categoryId = category.id
    else global.categoryId = undefined
  }

  return { validateCategory, searchCategoryRelatedToProduct, assignProductCategoryToGlobalState }
}
