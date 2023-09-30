import { Config, METHOD } from "../../../middlewares/interfaces";
import { Warehouse } from "../interfaces/model";

export const rulesWarehouse: Config<Warehouse>[] = [
  {
    path: ['api::warehouse.warehouse', 'warehouses'],
    method: METHOD.POST,
    validations: [
      {
        attribute: 'warehouse',
        rules: [
          { rule: 'required' },
          { rule: 'string' },
          { rule: 'max', value: 50 }
        ]
      },
      {
        attribute: 'address',
        rules: [
          { rule: 'required' },
          { rule: 'max', value: 120 }
        ]
      },
      {
        attribute: 'classification',
        rules: [
          { rule: 'required' }
        ]
      },
      {
        attribute: 'status',
        rules: [
          { rule: 'required' }
        ]
      }
    ]
  },
  {
    path: ['api::warehouse.warehouse/:id', 'warehouses/:id'],
    method: METHOD.PUT,
    validations: [
      {
        attribute: 'warehouse',
        rules: [
          { rule: 'sometimes' },
          { rule: 'string' },
          { rule: 'max', value: 50 }
        ]
      },
      {
        attribute: 'address',
        rules: [
          { rule: 'sometimes' },
          { rule: 'max', value: 120 }
        ]
      },
      {
        attribute: 'classification',
        rules: [
          { rule: 'sometimes' }
        ]
      },
      {
        attribute: 'status',
        rules: [
          { rule: 'sometimes' }
        ]
      }
    ]
  }
]
