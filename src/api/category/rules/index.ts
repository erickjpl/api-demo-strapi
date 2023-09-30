import { Config, METHOD } from "../../../middlewares/interfaces";
import { Category } from "../interfaces/model";

export const rulesCategory: Config<Category>[] = [
  {
    path: ['api::category.category', 'categories'],
    method: METHOD.POST,
    validations: [
      {
        attribute: 'category',
        rules: [
          { rule: 'required' },
          { rule: 'string' },
          { rule: 'max', value: 80 }
        ]
      },
      {
        attribute: 'products',
        rules: [
          { rule: 'numeric' }
        ]
      },
      {
        attribute: 'description',
        rules: [
          { rule: 'required' },
          { rule: 'max', value: 180 }
        ]
      }
    ]
  },
  {
    path: ['api::category.category/:id', 'categories/:id'],
    method: METHOD.PUT,
    validations: [
      {
        attribute: 'category',
        rules: [
          { rule: 'sometimes' },
          { rule: 'string' },
          { rule: 'max', value: 80 }
        ]
      },
      {
        attribute: 'products',
        rules: [
          { rule: 'sometimes' },
          { rule: 'numeric' }
        ]
      },
      {
        attribute: 'description',
        rules: [
          { rule: 'sometimes' },
          { rule: 'max', value: 180 }
        ]
      }
    ]
  }
]
