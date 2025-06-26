"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { CommandIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

export function CommandMenu() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <Button variant="outline" className="ml-auto h-8 w-8 px-0" onClick={() => setOpen(true)}>
        <CommandIcon className="h-4 w-4" />
        <span className="sr-only">Open command menu</span>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            <CommandItem onSelect={() => runCommand(() => router.push("/"))}>Dashboard</CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/assets"))}>Assets</CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/transactions"))}>Transactions</CommandItem>
          </CommandGroup>
          <CommandGroup heading="Actions">
            <CommandItem onSelect={() => runCommand(() => console.log("Add transaction"))}>Add Transaction</CommandItem>
            <CommandItem onSelect={() => runCommand(() => console.log("Add asset"))}>Add Asset</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
