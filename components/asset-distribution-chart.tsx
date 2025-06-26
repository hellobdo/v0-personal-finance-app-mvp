"use client"

import { Cell, Pie, PieChart, ResponsiveContainer } from "@/components/ui/chart"
import { useFinanceStore } from "@/lib/store"

export function AssetDistributionChart() {
  const { assets = [], assetGroups = [] } = useFinanceStore()

  // Group assets by type and calculate total value
  const assetsByGroup = assets.reduce(
    (acc, asset) => {
      const group = asset.group
      if (!acc[group]) {
        acc[group] = 0
      }
      acc[group] += asset.value
      return acc
    },
    {} as Record<string, number>,
  )

  // Convert to array for chart
  const data = Object.entries(assetsByGroup).map(([name, value]) => ({
    name,
    value,
  }))

  // Get grayscale colors for each asset group - using white with different opacities
  const getColor = (index: number) => {
    // Create a grayscale gradient from light to lighter
    const baseOpacity = 0.9
    const step = 0.15
    const opacity = Math.max(0.3, baseOpacity - index * step)
    return `rgba(255, 255, 255, ${opacity})`
  }

  // If no data, show placeholder
  if (data.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-sm text-muted-foreground">No asset data available</p>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={2}
          label={({ name, percent }) => (
            <text x={0} y={0} fill="#ffffff" textAnchor="middle" dominantBaseline="central">
              {`${name} ${(percent * 100).toFixed(0)}%`}
            </text>
          )}
          labelLine={false}
          tooltip={(props) => {
            const { active, payload } = props
            if (active && payload && payload.length) {
              const data = payload[0]
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="flex flex-col">
                    <span className="text-[0.70rem] uppercase text-muted-foreground">{data.name}</span>
                    <span className="font-bold">${data.value?.toLocaleString()}</span>
                    <span className="text-xs text-muted-foreground">{(data.percent * 100).toFixed(1)}% of total</span>
                  </div>
                </div>
              )
            }
            return null
          }}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getColor(index)} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}
