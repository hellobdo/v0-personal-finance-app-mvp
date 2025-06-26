"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFinanceStore } from "@/lib/store"
import { ColorPicker } from "./color-picker"

interface AddAssetGroupDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddAssetGroupDialog({ open, onOpenChange }: AddAssetGroupDialogProps) {
  const { addAssetGroup, assetGroups = [] } = useFinanceStore()
  const [name, setName] = useState("")
  const [color, setColor] = useState("hsl(var(--chart-1))")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name.trim()) {
      setError("Group name is required")
      return
    }

    // Check if group name already exists
    if (assetGroups.some((group) => group.name.toLowerCase() === name.trim().toLowerCase())) {
      setError("A group with this name already exists")
      return
    }

    addAssetGroup({
      name: name.trim(),
      color,
    })

    // Reset form
    setName("")
    setColor("hsl(var(--chart-1))")

    // Close dialog
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Asset Group</DialogTitle>
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
            <Button type="submit">Add Group</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
