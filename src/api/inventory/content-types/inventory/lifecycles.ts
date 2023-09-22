import { v4 as uuid, validate } from "uuid"
import { checkAvailable } from "../../helpers/product-inventory"

export default {
  beforeCreate: async (event) => {
    const { data } = event.params

    if (!data.inventoryId) data.inventoryId = uuid()

    if (!validate(data.inventoryId)) data.inventoryId = uuid()
  },
  afterCreate: async (event) => {
    const { result } = event
    checkAvailable(result.id, result.available)
  },
  afterUpdate: async (event) => {
    const { result } = event
    checkAvailable(result.id, result.available)
  }
}
