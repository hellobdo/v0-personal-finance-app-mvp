"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Asset, AssetGroup, Category, Transaction } from "./types"

interface FinanceStore {
  // State
  isInitialized: boolean
  assets: Asset[]
  assetGroups: AssetGroup[]
  transactions: Transaction[]
  categories: Category[]

  // Actions
  initializeStore: () => void

  // Asset actions
  addAsset: (asset: Asset) => void
  updateAsset: (id: string, asset: Asset) => void
  deleteAsset: (id: string) => void

  // Asset Group actions
  addAssetGroup: (group: AssetGroup) => void
  updateAssetGroup: (name: string, group: AssetGroup) => void
  deleteAssetGroup: (name: string) => void

  // Transaction actions
  addTransaction: (transaction: Transaction) => void
  updateTransaction: (id: string, transaction: Transaction) => void
  deleteTransaction: (id: string) => void
}

// Default state to ensure we always have valid data
const defaultState = {
  isInitialized: false,
  assets: [],
  assetGroups: [
    { name: "Cash", color: "hsl(var(--chart-1))" },
    { name: "Stocks", color: "hsl(var(--chart-2))" },
    { name: "Real Estate", color: "hsl(var(--chart-3))" },
    { name: "Crypto", color: "hsl(var(--chart-4))" },
    { name: "Other", color: "hsl(var(--chart-5))" },
  ],
  transactions: [],
  categories: [
    { name: "Salary", type: "income" },
    { name: "Investments", type: "income" },
    { name: "Freelance", type: "income" },
    { name: "Other Income", type: "income" },
    { name: "Groceries", type: "expense" },
    { name: "Rent", type: "expense" },
    { name: "Utilities", type: "expense" },
    { name: "Transportation", type: "expense" },
    { name: "Entertainment", type: "expense" },
    { name: "Dining Out", type: "expense" },
    { name: "Shopping", type: "expense" },
    { name: "Other Expense", type: "expense" },
  ],
}

// Improve the store initialization to ensure we always have valid data
export const useFinanceStore = create<FinanceStore>()(
  persist(
    (set) => ({
      ...defaultState,

      initializeStore: () => {
        set((state) => {
          // Only initialize if not already initialized
          if (state.isInitialized) return state

          // Sample assets
          const sampleAssets: Asset[] = [
            { id: "1", name: "Checking Account", value: 15000, group: "Cash" },
            { id: "2", name: "Savings Account", value: 25000, group: "Cash" },
            { id: "3", name: "Apple Stock", value: 20000, group: "Stocks" },
            { id: "4", name: "Tesla Stock", value: 15000, group: "Stocks" },
            { id: "5", name: "Primary Residence", value: 450000, group: "Real Estate" },
            { id: "6", name: "Bitcoin", value: 12000, group: "Crypto" },
            { id: "7", name: "Ethereum", value: 8000, group: "Crypto" },
          ]

          // Sample transactions
          const today = new Date()
          const lastMonth = new Date(today)
          lastMonth.setMonth(today.getMonth() - 1)

          const sampleTransactions: Transaction[] = [
            {
              id: "1",
              description: "Monthly Salary",
              amount: 8000,
              type: "income",
              category: "Salary",
              date: today.toISOString().split("T")[0],
            },
            {
              id: "2",
              description: "Grocery Shopping",
              amount: 250,
              type: "expense",
              category: "Groceries",
              date: today.toISOString().split("T")[0],
            },
            {
              id: "3",
              description: "Rent Payment",
              amount: 2500,
              type: "expense",
              category: "Rent",
              date: today.toISOString().split("T")[0],
            },
            {
              id: "4",
              description: "Freelance Project",
              amount: 1500,
              type: "income",
              category: "Freelance",
              date: lastMonth.toISOString().split("T")[0],
            },
            {
              id: "5",
              description: "Dining Out",
              amount: 120,
              type: "expense",
              category: "Dining Out",
              date: lastMonth.toISOString().split("T")[0],
            },
          ]

          return {
            ...state,
            isInitialized: true,
            assets: sampleAssets,
            transactions: sampleTransactions,
          }
        })
      },

      // Asset actions
      addAsset: (asset) =>
        set((state) => ({
          assets: [...(state.assets || []), asset],
        })),

      updateAsset: (id, updatedAsset) =>
        set((state) => ({
          assets: (state.assets || []).map((asset) => (asset.id === id ? updatedAsset : asset)),
        })),

      deleteAsset: (id) =>
        set((state) => ({
          assets: (state.assets || []).filter((asset) => asset.id !== id),
        })),

      // Asset Group actions
      addAssetGroup: (group) =>
        set((state) => ({
          assetGroups: [...(state.assetGroups || []), group],
        })),

      updateAssetGroup: (name, updatedGroup) =>
        set((state) => {
          // Update the group
          const updatedGroups = (state.assetGroups || []).map((group) => (group.name === name ? updatedGroup : group))

          // If the name changed, update all assets that use this group
          let updatedAssets = [...(state.assets || [])]
          if (name !== updatedGroup.name) {
            updatedAssets = updatedAssets.map((asset) =>
              asset.group === name ? { ...asset, group: updatedGroup.name } : asset,
            )
          }

          return {
            assetGroups: updatedGroups,
            assets: updatedAssets,
          }
        }),

      deleteAssetGroup: (name) =>
        set((state) => ({
          assetGroups: (state.assetGroups || []).filter((group) => group.name !== name),
        })),

      // Transaction actions
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [...(state.transactions || []), transaction],
        })),

      updateTransaction: (id, updatedTransaction) =>
        set((state) => ({
          transactions: (state.transactions || []).map((transaction) =>
            transaction.id === id ? updatedTransaction : transaction,
          ),
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: (state.transactions || []).filter((transaction) => transaction.id !== id),
        })),
    }),
    {
      name: "finance-store",
      // Make sure we merge with our default state when hydrating from storage
      merge: (persistedState: any, currentState) => {
        return {
          ...currentState,
          ...(persistedState || {}),
          // Ensure these arrays are never null/undefined
          assets: persistedState?.assets || currentState.assets || [],
          assetGroups: persistedState?.assetGroups || currentState.assetGroups || [],
          transactions: persistedState?.transactions || currentState.transactions || [],
          categories: persistedState?.categories || currentState.categories || [],
        }
      },
    },
  ),
)
