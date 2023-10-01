import { Config, METHOD } from "../../../middlewares/interfaces";
import { Basket, BasketItem } from "../interfaces/model";

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

export const rulesBasketItems: Config<BasketItem>[] = [
  {
    path: ['api::basket.basket-item', 'basket'],
    method: METHOD.POST,
    validations: [
      {
        attribute: 'basket',
        rules: [
          { rule: 'required' },
          { rule: 'relation_creating' }
        ]
      },
      {
        attribute: 'inventory',
        rules: [
          { rule: 'required' },
          { rule: 'relation_creating' }
        ]
      },
      {
        attribute: 'quantity',
        rules: [
          { rule: 'required' },
          { rule: 'numeric' }
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
        attribute: 'discount',
        rules: [
          { rule: 'sometimes' },
          { rule: 'numeric' }
        ]
      },
      {
        attribute: 'status',
        rules: [
          { rule: 'sometimes' }
        ]
      }
    ]
  },
  {
    path: ['api::basket.basket-item/:id'],
    method: METHOD.PUT,
    validations: [
      {
        attribute: 'basket',
        rules: [
          { rule: 'sometimes' },
          { rule: 'relation_creating' }
        ]
      },
      {
        attribute: 'inventory',
        rules: [
          { rule: 'sometimes' },
          { rule: 'relation_creating' }
        ]
      },
      {
        attribute: 'quantity',
        rules: [
          { rule: 'required' },
          { rule: 'numeric' }
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
        attribute: 'discount',
        rules: [
          { rule: 'sometimes' },
          { rule: 'numeric' }
        ]
      },
      {
        attribute: 'status',
        rules: [
          { rule: 'sometimes' }
        ]
      }
    ]
  },
  {
    path: ['basket/:id'],
    method: METHOD.PUT,
    validations: [
      {
        attribute: 'basket',
        rules: [
          { rule: 'required' },
          { rule: 'relation_creating' }
        ]
      },
      {
        attribute: 'inventory',
        rules: [
          { rule: 'required' },
          { rule: 'relation_creating' }
        ]
      },
      {
        attribute: 'quantity',
        rules: [
          { rule: 'required' },
          { rule: 'numeric' }
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
        attribute: 'discount',
        rules: [
          { rule: 'sometimes' },
          { rule: 'numeric' }
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
