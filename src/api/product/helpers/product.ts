export async function searchCategoryRelatedToProduct (productId: number) {
  const product = await strapi.db.query('api::product.product').findOne({
    where: { id: productId },
    populate: ['category']
  })

  return product && product.category
}
