import { Config, METHOD } from "../../../middlewares/interfaces";
import { Product } from "../interfaces/model";

export const rulesProduct: Config<Product>[] = [
  {
    path: ['api::product.product', 'products'],
    method: METHOD.POST,
    validations: [
      {
        attribute: 'product',
        rules: [
          { rule: 'required' }
        ]
      },
      {
        attribute: 'category',
        rules: [
          { rule: 'relation_creating' },
          { rule: 'required' }
        ]
      },
      {
        attribute: 'price',
        rules: [
          { rule: 'required' },
          { rule: 'numeric' }
        ]
      },
      {
        attribute: 'available',
        rules: [
          { rule: 'required' },
          { rule: 'min_digits', value: 1 },
          { rule: 'numeric' }
        ]
      }
    ]
  },
  {
    path: ['api::product.product/:id', 'products/:id'],
    method: METHOD.PUT,
    validations: [
      {
        attribute: 'product',
        rules: [
          { rule: 'sometimes' }
        ]
      },
      {
        attribute: 'category',
        rules: [
          { rule: 'sometimes' },
          { rule: 'relation_updating' }
        ]
      },
      {
        attribute: 'price',
        rules: [
          { rule: 'sometimes' },
          { rule: 'numeric' }
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
