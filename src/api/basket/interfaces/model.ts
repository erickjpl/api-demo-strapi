import { Relations } from '../../../middlewares/interfaces'

export type BASKET_STATUS = 'Empty' |
  'Active' |
  'Inactive' |
  'Abandoned' |
  'Saved for Later' |
  'On Hold' |
  'Pending Review' |
  'Ready for Checkout' |
  'In Favorite' |
  'Archived' |
  'Fulfilled'
export type BASKET_PAYMENT_STATUS = 'Pending Payment' |
  'Payment Processing' |
  'Paid' |
  'Approved' |
  'Declined' |
  'Cancelled' |
  'Refund' |
  'Refunded' |
  'Waiting for Confirmation' |
  'Payment Issue' |
  'Payment Error' |
  'Payment Overdue' |
  'Authorization Pending' |
  'Bank Confirmation Pending' |
  'Partial Payment' |
  'Scheduled Payment'
export type BASKET_ITEM_STATUS = 'In Basket' | 'In Favorites'

export interface Basket {
  user: Relations
  shippingAddress: string
  billingInformation: string
  promoCode?: string
  total: number
  status?: BASKET_STATUS
  paymentStatus?: BASKET_PAYMENT_STATUS
  notes?: string
}

export interface BasketItem {
  basket: Relations
  inventory: Relations
  quantity: number
  price: number
  discount?: number
  total: number
  status?: BASKET_ITEM_STATUS
}
