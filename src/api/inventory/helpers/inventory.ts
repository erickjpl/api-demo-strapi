import { errors } from '@strapi/utils'
const { ValidationError } = errors

export const validCanBeDeleted = async (ids: number | number[]) => {
  const result = await strapi.db.query('api::checkout.checkout').findMany({ where: { inventory: ids } })

  if (result.length > 0)
    throw new ValidationError('Product inventory cannot be deleted because it has associated sales.')
}

export const findProductIdInInventory = async (inventoryIds: number | number[]) => {
  const inventories = await strapi.db.query('api::inventory.inventory').findMany({
    where: { id: inventoryIds },
    populate: ['product']
  })

  return inventories && typeof inventoryIds === 'object' ? [...new Set(inventories.map((item) => item.product.id))] : inventories[0].product.id
}

export const actionCreateUpdate = async (inventory: number, available: number) => {
  const product = await findProductIdInInventory(inventory)

  checkAvailable(product, available)

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

  await strapi.service('api::product.product').updateAvailableProduct(product, data)
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

const inventorySoldOut = async (inventory: number) => {
  await strapi.db.query('api::inventory.inventory').update({
    where: { id: inventory },
    data: { status: 'Sold Out' }
  })
}
