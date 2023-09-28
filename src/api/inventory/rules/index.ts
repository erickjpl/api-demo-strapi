import { Config, METHOD } from "../../../middlewares/interfaces";
import { Inventory } from "../interfaces/model";

export const rulesInventory: Config<Inventory>[] = [
  {
    path: ['api::inventory.inventory', 'inventories'],
    method: METHOD.PUT,
    validations: [
      {
        attribute: 'warehouse',
        rules: [
          { rule: 'relation_updating' },
        ]
      },
      {
        attribute: 'product',
        rules: [
          { rule: 'relation_updating' }
        ]
      },
      {
        attribute: 'available',
        rules: [
          { rule: 'sometimes' },
          { rule: 'min_digits', value: 0 },
          { rule: 'numeric' }
        ]
      }
    ]
  }
]
