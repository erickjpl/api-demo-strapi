import { errors } from '@strapi/utils'
const { ValidationError } = errors

export function useProductHelper () {
  function validateCategory (category) {
    if (!category || category?.connect?.length === 0) {
      throw new ValidationError(`The category is missing.`, { category: 'The category is required.' })
    }
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
