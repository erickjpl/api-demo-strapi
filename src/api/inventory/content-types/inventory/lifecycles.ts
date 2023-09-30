import { actionCreateUpdate, actionDelete, findProductIdInInventory } from "../../helpers/inventory"

let productIds

export default {
  afterCreate: async (event) => {
    const { result } = event
    actionCreateUpdate(result.id, result.available)
  },
  afterUpdate: async (event) => {
    const { data, where } = event.params

    if ('available' in data || 'status' in data)
      actionCreateUpdate(where.id, data.available)
  },
  beforeDelete: async (event) => {
    const { where } = event.params
    const { product } = await findProductIdInInventory(where.id)
    productIds = product && product.id
  },
  afterDelete: async () => {
    actionDelete(productIds, 0)
  },
  beforeDeleteMany: async (event) => {
    const { where } = event.params
    productIds = where['$and'][0]['id']['$in']
  },
  afterDeleteMany: async () => {
    productIds.forEach(productId => actionDelete(productId, 0))
  }
}
