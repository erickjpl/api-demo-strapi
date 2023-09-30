import { Config, METHOD } from "../../../middlewares/interfaces";
import { Basket } from "../interfaces/model";

export const rulesBasket: Config<Basket>[] = [
  {
    path: ['api::basket.basket', 'baskets'],
    method: METHOD.POST,
    validations: [
      {
        attribute: 'user',
        rules: [
          { rule: 'relation_creating' },
          { rule: 'required' }
        ]
      },
      {
        attribute: 'shippingAddress',
        rules: [
          { rule: 'sometimes' },
          { rule: 'max', value: 120 }
        ]
      },
      {
        attribute: 'billingInformation',
        rules: [
          { rule: 'sometimes' },
          { rule: 'max', value: 120 }
        ]
      },
      {
        attribute: 'promoCode',
        rules: [
          { rule: 'sometimes' },
          { rule: 'max', value: 12 }
        ]
      },
      {
        attribute: 'total',
        rules: [
          { rule: 'sometimes' },
          { rule: 'numeric' }
        ]
      }
    ]
  },
  {
    path: ['api::basket.basket/:id', 'baskets/:id'],
    method: METHOD.PUT,
    validations: [
      {
        attribute: 'user',
        rules: [
          { rule: 'sometimes' },
          { rule: 'relation_updating' }
        ]
      },
      {
        attribute: 'shippingAddress',
        rules: [
          { rule: 'sometimes' },
          { rule: 'max', value: 120 }
        ]
      },
      {
        attribute: 'billingInformation',
        rules: [
          { rule: 'sometimes' },
          { rule: 'max', value: 120 }
        ]
      },
      {
        attribute: 'promoCode',
        rules: [
          { rule: 'sometimes' },
          { rule: 'max', value: 12 }
        ]
      },
      {
        attribute: 'total',
        rules: [
          { rule: 'sometimes' },
          { rule: 'numeric' }
        ]
      }
    ]
  }
]
