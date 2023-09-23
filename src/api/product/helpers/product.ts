// export async function useUpdateCategory({ strapi, request, response }) {
//   if (request.category !== response.category) {
//     if (!request.category || !response.category) {
//       const { productId } = await searchProduct(response.id)
//     }
//     // strapi.service('api::category.category').update(request.category, { products: 0 })
//   }

//   return { x, y }
// }

// const searchProduct = async (id: number) => {
//   return await strapi.db.query('api::product.product').findOne({
//     where: { id },
//     populate: ['category']
//   })
// }
