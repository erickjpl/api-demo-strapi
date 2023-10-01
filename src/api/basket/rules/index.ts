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
      },
      {
        attribute: 'basketStatus',
        rules: [
          { rule: 'sometimes' }
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
      },
      {
        attribute: 'basketStatus',
        rules: [
          { rule: 'sometimes' }
        ]
      }
    ]
  }
]

export const rulesBasketItems: Config<BasketItem>[] = [
  {
    path: ['api::basket.basket-item', 'baskets'],
    method: METHOD.POST,
    validations: [
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
        attribute: 'itemStatus',
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
        attribute: 'itemStatus',
        rules: [
          { rule: 'sometimes' }
        ]
      }
    ]
  },
  {
    path: ['baskets/:id'],
    method: METHOD.PUT,
    validations: [
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
        attribute: 'itemStatus',
        rules: [
          { rule: 'sometimes' }
        ]
      }
    ]
  }
]
