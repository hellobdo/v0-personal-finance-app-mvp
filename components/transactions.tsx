"use client"

import { useState, useEffect } from "react"
import { Plus } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExpenseIncomeChart } from "@/components/expense-income-chart"
import { TransactionsList } from "@/components/transactions-list"
import { AddTransactionDialog } from "@/components/add-transaction-dialog"
import { useFinanceStore } from "@/lib/store"

export function Transactions() {
  const { initializeStore, isInitialized } = useFinanceStore()
  const [mounted, setMounted] = useState(false)
  const [showAddTransaction, setShowAddTransaction] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!isInitialized) {
      initializeStore()
    }
  }, [initializeStore, isInitialized])

  if (!mounted) return null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <Button onClick={() => setShowAddTransaction(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Transaction
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Income vs Expenses</CardTitle>
            <CardDescription>Monthly income and expenses</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ExpenseIncomeChart />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your most recent transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <TransactionsList />
          </CardContent>
        </Card>
      </div>
      <AddTransactionDialog open={showAddTransaction} onOpenChange={setShowAddTransaction} />
    </div>
  )
}
