export interface Asset {
  id: string
  name: string
  value: number
  group: string
}

export interface AssetGroup {
  name: string
  color: string
}

export interface Transaction {
  id: string
  description: string
  amount: number
  type: "income" | "expense"
  category: string
  date: string
}

export interface Category {
  name: string
  type: "income" | "expense"
}
