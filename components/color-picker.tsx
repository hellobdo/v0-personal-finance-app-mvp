"use client"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface ColorPickerProps {
  value: string
  onChange: (value: string) => void
}

// Predefined colors for the picker
const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(221.2 83.2% 53.3%)",
  "hsl(262.1 83.3% 57.8%)",
  "hsl(316.6 73.3% 52.5%)",
  "hsl(24.6 95% 53.1%)",
  "hsl(142.1 76.2% 36.3%)",
  "hsl(0 72.2% 50.6%)",
  "hsl(20 84.2% 50.2%)",
  "hsl(43 89.9% 52.5%)",
  "hsl(78 87.0% 42.2%)",
  "hsl(187 92.4% 69.0%)",
]

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {COLORS.map((color) => (
        <button
          key={color}
          type="button"
          className={cn(
            "h-8 w-8 rounded-full border border-border flex items-center justify-center",
            value === color && "ring-2 ring-primary ring-offset-2",
          )}
          style={{ backgroundColor: color }}
          onClick={() => onChange(color)}
        >
          {value === color && <Check className="h-4 w-4 text-white" />}
        </button>
      ))}
    </div>
  )
}
