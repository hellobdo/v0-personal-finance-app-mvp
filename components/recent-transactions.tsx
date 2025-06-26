"use client"

import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useFinanceStore } from "@/lib/store"

export function RecentTransactions() {
  const { transactions = [] } = useFinanceStore()

  // Sort transactions by date (newest first) and take the first 5
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)

  if (transactions.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-sm text-muted-foreground">No recent transactions</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {recentTransactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`rounded-full p-2 ${transaction.type === "income" ? "bg-green-500/20" : "bg-red-500/20"}`}>
              {transaction.type === "income" ? (
                <ArrowUpIcon className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownIcon className="h-4 w-4 text-red-500" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium">{transaction.description}</p>
              <p className="text-xs text-muted-foreground">{new Date(transaction.date).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span
              className={`text-sm font-medium ${transaction.type === "income" ? "text-green-500" : "text-red-500"}`}
            >
              {transaction.type === "income" ? "+" : "-"}${transaction.amount.toLocaleString()}
            </span>
            <Badge variant="outline">{transaction.category}</Badge>
          </div>
        </div>
      ))}
    </div>
  )
}
