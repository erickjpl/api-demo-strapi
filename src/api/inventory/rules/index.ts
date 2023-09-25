import { METHOD, ConfigT } from '../../../middlewares/config';

export const rulesInventory: ConfigT[] = [
  {
    path: ['api::product.product', 'products'],
    method: METHOD.PUT,
    validations: [
      {
        attribute: 'product',
        rules: [
          { rule: 'sometimes' },
          { rule: 'min', value: 3 },
          { rule: 'max', value: 100 },
          { rule: 'string' }
        ]
      },
      {
        attribute: 'price',
        rules: [
          { rule: 'sometimes' },
          { rule: 'min_digits', value: 0 },
          { rule: 'numeric' }
        ]
      },
      {
        attribute: 'available',
        rules: [
          { rule: 'sometimes' },
          { rule: 'min_digits', value: 0 },
          { rule: 'numeric' }
        ]
      },
      {
        attribute: 'category',
        rules: [
          { rule: 'sometimes' },
          { rule: 'string' },
          { rule: 'present' }
        ]
      }
    ]
  }
]
