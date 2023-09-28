import { Config, METHOD } from "../../../middlewares/interfaces";
import { Inventory } from "../interfaces/model";

export const rulesInventory: Config<Inventory>[] = [
  {
    path: ['api::inventory.inventory', 'inventories'],
    method: METHOD.POST,
    validations: [
      {
        attribute: 'warehouse',
        rules: [
          { rule: 'relation_creating' },
          { rule: 'required' }
        ]
      },
      {
        attribute: 'product',
        rules: [
          { rule: 'relation_creating' },
          { rule: 'required' }
        ]
      },
      {
        attribute: 'available',
        rules: [
          { rule: 'numeric' },
          { rule: 'required' },
          { rule: 'min_digits', value: 1 }
        ]
      }
    ]
  },
  {
    path: ['api::inventory.inventory/:id', 'inventories/:id'],
    method: METHOD.PUT,
    validations: [
      {
        attribute: 'warehouse',
        rules: [
          { rule: 'sometimes' },
          { rule: 'relation_updating' },
        ]
      },
      {
        attribute: 'product',
        rules: [
          { rule: 'sometimes' },
          { rule: 'relation_updating' }
        ]
      },
      {
        attribute: 'available',
        rules: [
          { rule: 'sometimes' },
          { rule: 'numeric' }
        ]
      }
    ]
  }
]
