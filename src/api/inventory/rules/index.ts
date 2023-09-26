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
          { rule: 'min_digits', value: 0 },
          { rule: 'numeric' }
        ]
      },
      {
        attribute: 'product',
        rules: [
          { rule: 'required' },
          { rule: 'min', value: 3 },
          { rule: 'max', value: 100 },
          { rule: 'string' }
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
