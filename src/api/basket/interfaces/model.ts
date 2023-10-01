import { Relations } from '../../../middlewares/interfaces'

type BASKET_STATUS = 'Empty' |
  'Active' |
  'Inactive' |
  'Abandoned' |
  'Processed'

type BASKET_ITEM_STATUS = 'In Basket' | 'In Favorites'

// export type STATUS = BASKET_STATUS | BASKET_ITEM_STATUS

export interface Basket {
  user: Relations
  promoCode?: string
  total: number
  basketStatus?: BASKET_STATUS
  notes?: string
}

export interface BasketItem {
  basket: Relations
  inventory: Relations
  quantity: number
  price: number
  discount?: number
  total: number
  itemStatus?: BASKET_ITEM_STATUS
}
