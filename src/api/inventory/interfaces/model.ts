import { Relations, TYPE_STATUS } from "../../../middlewares/interfaces"

export interface Inventory {
  warehouse: Relations
  product: Relations
  available: number
  status?: TYPE_STATUS
}
