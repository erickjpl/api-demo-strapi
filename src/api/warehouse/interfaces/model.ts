type Classification = 'Principal' | 'Subsidiary'
type Status = 'Active' | 'Closed' | 'Remodeling'

export interface Warehouse {
  warehouse: string
  slug: string
  address: number
  classification: Classification
  status: Status
}
