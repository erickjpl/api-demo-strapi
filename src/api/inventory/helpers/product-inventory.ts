export const checkAvailable = async (inventory: number, available: number) => {
  const { productId } = await searchProduct(inventory)

  const inventories = await searchInventories(productId.id)

  const data = await validateAvailableQuantity(inventories)

  updateAvailableProduct(productId.id, data)

  if (available <= 0) {
    inventorySoldOut(inventory)
  }
}

const searchProduct = async (inventory: number) => {
  return await strapi.db.query('api::inventory.inventory').findOne({
    where: { id: inventory },
    populate: ['productId']
  })
}

const searchInventories = async (product: number) => {
  return await strapi.db.query('api::inventory.inventory').findMany({
    where: { productId: product }
  })
}

const validateAvailableQuantity = async (inventories) => {
  const availableQuantity = inventories
    .filter(item => item.status === 'Active')
    .map(item => item.available)
    .reduce((acc, item) => acc + item, 0)

  if (availableQuantity > 0) return { available: availableQuantity, status: 'Active' }

  return { available: availableQuantity, status: 'Sold Out' }
}

const updateAvailableProduct = async (product: number, update) => {
  await strapi.db.query('api::product.product').update({
    where: { id: product },
    data: { ...update }
  })
}

const inventorySoldOut = async (inventory: number) => {
  await strapi.db.query('api::inventory.inventory').update({
    where: { id: inventory },
    data: { status: 'Sold Out' }
  })
}
