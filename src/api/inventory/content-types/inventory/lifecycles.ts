import { actionCreateUpdate, actionDelete, findProductIdInInventory } from "../../helpers/inventory"

let productId

export default {
  afterCreate: async (event) => {
    const { data, where } = event.params
    actionCreateUpdate(where.id, data.available)
  },
  afterUpdate: async (event) => {
    const { data, where } = event.params

    if ('available' in data || 'status' in data)
      actionCreateUpdate(where.id, data.available)
  },
  beforeDelete: async (event) => {
    const { where } = event.params
    const { product } = await findProductIdInInventory(where.id)
    productId = product && product.id
  },
  afterDelete: async () => {
    actionDelete(productId, 0)
  }
}
