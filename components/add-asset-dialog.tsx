"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFinanceStore } from "@/lib/store"

interface AddAssetDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddAssetDialog({ open, onOpenChange }: AddAssetDialogProps) {
  const { addAsset, assetGroups = [] } = useFinanceStore()
  const [name, setName] = useState("")
  const [value, setValue] = useState("")
  const [group, setGroup] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !value || !group) return

    addAsset({
      id: crypto.randomUUID(),
      name,
      value: Number.parseFloat(value),
      group,
    })

    // Reset form
    setName("")
    setValue("")
    setGroup("")

    // Close dialog
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Asset</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Asset Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Checking Account"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="value">Value</Label>
            <Input
              id="value"
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="e.g. 10000"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="group">Asset Group</Label>
            <Select value={group} onValueChange={setGroup} required>
              <SelectTrigger>
                <SelectValue placeholder="Select asset group" />
              </SelectTrigger>
              <SelectContent>
                {assetGroups.map((group) => (
                  <SelectItem key={group.name} value={group.name}>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full mr-2" style={{ backgroundColor: group.color }} />
                      {group.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Asset</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
