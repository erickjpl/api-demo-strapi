import { Relations, TYPE_STATUS } from "../../../middlewares/interfaces"

export interface Product {
  product: string
  category: Relations
  price: number
  available: number
  image: string
  slug?: string
  status?: TYPE_STATUS
}
