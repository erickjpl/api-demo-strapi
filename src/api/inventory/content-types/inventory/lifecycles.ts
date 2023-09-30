import { actionCreateUpdate, actionDelete, findProductIdInInventory, validCanBeDeleted } from "../../helpers/inventory"

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
    await validCanBeDeleted(where.id)
    productIds = await findProductIdInInventory(where.id)
  },
  afterDelete: async () => {
    actionDelete(productIds, 0)
  },
  beforeDeleteMany: async (event) => {
    const { where } = event.params
    productIds = where['$and'][0]['id']['$in']
    await validCanBeDeleted(productIds)
    productIds = await findProductIdInInventory(productIds)
  },
  afterDeleteMany: async () => {
    productIds.forEach(productId => actionDelete(productId, 0))
  }
}
