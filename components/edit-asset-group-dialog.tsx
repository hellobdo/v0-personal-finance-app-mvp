"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFinanceStore } from "@/lib/store"
import { ColorPicker } from "./color-picker"
import type { AssetGroup } from "@/lib/types"

interface EditAssetGroupDialogProps {
  group: AssetGroup | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditAssetGroupDialog({ group, open, onOpenChange }: EditAssetGroupDialogProps) {
  const { updateAssetGroup, assetGroups = [] } = useFinanceStore()
  const [name, setName] = useState("")
  const [color, setColor] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [originalName, setOriginalName] = useState("")

  useEffect(() => {
    if (group) {
      setName(group.name)
      setColor(group.color)
      setOriginalName(group.name)
    }
  }, [group])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name.trim()) {
      setError("Group name is required")
      return
    }

    // Check if group name already exists (but ignore the current group)
    if (
      name.trim().toLowerCase() !== originalName.toLowerCase() &&
      assetGroups.some((g) => g.name.toLowerCase() === name.trim().toLowerCase())
    ) {
      setError("A group with this name already exists")
      return
    }

    if (!group) return

    updateAssetGroup(originalName, {
      name: name.trim(),
      color,
    })

    // Close dialog
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Asset Group</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Group Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Real Estate"
              required
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>

          <div className="space-y-2">
            <Label>Group Color</Label>
            <ColorPicker value={color} onChange={setColor} />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
