"use client"

import { useState, useEffect } from "react"
import { Plus, Settings } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AssetDistributionChart } from "@/components/asset-distribution-chart"
import { AssetsList } from "@/components/assets-list"
import { AddAssetDialog } from "@/components/add-asset-dialog"
import { ManageAssetGroupsDialog } from "@/components/manage-asset-groups-dialog"
import { useFinanceStore } from "@/lib/store"

export function Assets() {
  const { initializeStore, isInitialized } = useFinanceStore()
  const [mounted, setMounted] = useState(false)
  const [showAddAsset, setShowAddAsset] = useState(false)
  const [showManageGroups, setShowManageGroups] = useState(false)

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
        <h1 className="text-3xl font-bold tracking-tight">Assets</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setShowManageGroups(true)}>
            <Settings className="mr-2 h-4 w-4" />
            Manage Groups
          </Button>
          <Button onClick={() => setShowAddAsset(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Asset
          </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Asset Distribution</CardTitle>
            <CardDescription>Your net worth distributed by asset type</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <AssetDistributionChart />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Asset Breakdown</CardTitle>
            <CardDescription>Detailed breakdown of your assets</CardDescription>
          </CardHeader>
          <CardContent>
            <AssetsList />
          </CardContent>
        </Card>
      </div>
      <AddAssetDialog open={showAddAsset} onOpenChange={setShowAddAsset} />
      <ManageAssetGroupsDialog open={showManageGroups} onOpenChange={setShowManageGroups} />
    </div>
  )
}
