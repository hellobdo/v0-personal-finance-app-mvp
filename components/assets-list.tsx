"use client"

import { Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFinanceStore } from "@/lib/store"
import { useState } from "react"
import { EditAssetDialog } from "./edit-asset-dialog"

export function AssetsList() {
  const { assets = [], assetGroups = [], deleteAsset } = useFinanceStore()
  const [editingAsset, setEditingAsset] = useState<string | null>(null)

  // Group assets by type
  const assetsByGroup = assets.reduce(
    (acc, asset) => {
      const group = asset.group
      if (!acc[group]) {
        acc[group] = []
      }
      acc[group].push(asset)
      return acc
    },
    {} as Record<string, typeof assets>,
  )

  // Calculate total value for each group
  const groupTotals = Object.entries(assetsByGroup).map(([group, assets]) => ({
    group,
    total: assets.reduce((sum, asset) => sum + asset.value, 0),
  }))

  // Sort groups by total value (highest first)
  groupTotals.sort((a, b) => b.total - a.total)

  const getAssetToEdit = () => {
    if (!editingAsset) return null
    return assets.find((asset) => asset.id === editingAsset) || null
  }

  if (assets.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-sm text-muted-foreground">No assets added yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {groupTotals.map(({ group, total }) => (
        <div key={group} className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{group}</h3>
            <span className="text-sm font-medium">${total.toLocaleString()}</span>
          </div>
          <div className="space-y-1">
            {assetsByGroup[group].map((asset) => (
              <div key={asset.id} className="flex items-center justify-between rounded-md px-2 py-1 hover:bg-muted">
                <span className="text-sm">{asset.name}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">${asset.value.toLocaleString()}</span>
                  <Button variant="ghost" size="icon" onClick={() => setEditingAsset(asset.id)}>
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteAsset(asset.id)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <EditAssetDialog
        asset={getAssetToEdit()}
        open={!!editingAsset}
        onOpenChange={(open) => {
          if (!open) setEditingAsset(null)
        }}
      />
    </div>
  )
}
