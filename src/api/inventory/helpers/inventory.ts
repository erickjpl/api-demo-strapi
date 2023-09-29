export const actionCreateUpdate = async (inventory: number, available: number) => {
  const { product } = await findProductIdInInventory(inventory)

  checkAvailable(product.id, available)

  if (available <= 0) {
    inventorySoldOut(inventory)
  }
}

export const actionDelete = async (product: number, available: number) => {
  checkAvailable(product, available)
}

const checkAvailable = async (product: number, available: number) => {
  const inventories = await searchInventories(product)

  const data = await validateAvailableQuantity(inventories)

  updateAvailableProduct(product, data)
}

export const findProductIdInInventory = async (inventory: number) => {
  return await strapi.db.query('api::inventory.inventory').findOne({
    where: { id: inventory },
    populate: ['product']
  })
}

const searchInventories = async (product: number) => {
  return await strapi.db.query('api::inventory.inventory').findMany({
    where: { product, status: 'Active' }
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
