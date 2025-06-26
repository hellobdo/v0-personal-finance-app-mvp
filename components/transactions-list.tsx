"use client"

import { useState } from "react"
import { ArrowDownIcon, ArrowUpIcon, Edit, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useFinanceStore } from "@/lib/store"
import { EditTransactionDialog } from "./edit-transaction-dialog"

export function TransactionsList() {
  const { transactions = [], deleteTransaction } = useFinanceStore()
  const [editingTransaction, setEditingTransaction] = useState<string | null>(null)

  // Sort transactions by date (newest first)
  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const getTransactionToEdit = () => {
    if (!editingTransaction) return null
    return transactions.find((transaction) => transaction.id === editingTransaction) || null
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-sm text-muted-foreground">No transactions added yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {sortedTransactions.map((transaction) => (
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
            <Button variant="ghost" size="icon" onClick={() => setEditingTransaction(transaction.id)}>
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => deleteTransaction(transaction.id)}>
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </div>
      ))}
      <EditTransactionDialog
        transaction={getTransactionToEdit()}
        open={!!editingTransaction}
        onOpenChange={(open) => {
          if (!open) setEditingTransaction(null)
        }}
      />
    </div>
  )
}
