"use client"

import { useState } from "react"
import { Edit, Plus, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useFinanceStore } from "@/lib/store"
import { AddAssetGroupDialog } from "./add-asset-group-dialog"
import { EditAssetGroupDialog } from "./edit-asset-group-dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface ManageAssetGroupsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ManageAssetGroupsDialog({ open, onOpenChange }: ManageAssetGroupsDialogProps) {
  const { assetGroups = [], assets = [], deleteAssetGroup } = useFinanceStore()
  const [showAddGroup, setShowAddGroup] = useState(false)
  const [editingGroup, setEditingGroup] = useState<string | null>(null)
  const [deletingGroup, setDeletingGroup] = useState<string | null>(null)

  const getGroupToEdit = () => {
    if (!editingGroup) return null
    return assetGroups.find((group) => group.name === editingGroup) || null
  }

  const getGroupToDelete = () => {
    if (!deletingGroup) return null
    return assetGroups.find((group) => group.name === deletingGroup) || null
  }

  const handleDeleteGroup = () => {
    if (!deletingGroup) return

    // Check if there are assets using this group
    const assetsInGroup = assets.filter((asset) => asset.group === deletingGroup)

    if (assetsInGroup.length > 0) {
      alert(
        `Cannot delete this group because it contains ${assetsInGroup.length} assets. Please reassign or delete these assets first.`,
      )
      setDeletingGroup(null)
      return
    }

    deleteAssetGroup(deletingGroup)
    setDeletingGroup(null)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Manage Asset Groups</DialogTitle>
            <DialogDescription>Create, edit, or delete asset groups to categorize your assets.</DialogDescription>
          </DialogHeader>

          <div className="flex justify-end mb-4">
            <Button onClick={() => setShowAddGroup(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Group
            </Button>
          </div>

          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-2">
              {assetGroups.map((group) => {
                // Count assets in this group
                const assetCount = assets.filter((asset) => asset.group === group.name).length

                return (
                  <div key={group.name} className="flex items-center justify-between rounded-md border p-3">
                    <div className="flex items-center space-x-3">
                      <div className="h-4 w-4 rounded-full" style={{ backgroundColor: group.color }} />
                      <div>
                        <p className="font-medium">{group.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {assetCount} {assetCount === 1 ? "asset" : "assets"}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => setEditingGroup(group.name)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeletingGroup(group.name)}
                        disabled={assetCount > 0}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </div>
                )
              })}

              {assetGroups.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground">No asset groups defined</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <AddAssetGroupDialog open={showAddGroup} onOpenChange={setShowAddGroup} />

      <EditAssetGroupDialog
        group={getGroupToEdit()}
        open={!!editingGroup}
        onOpenChange={(open) => {
          if (!open) setEditingGroup(null)
        }}
      />

      <AlertDialog
        open={!!deletingGroup}
        onOpenChange={(open) => {
          if (!open) setDeletingGroup(null)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the "{deletingGroup}" asset group.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteGroup}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
