"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "@/components/ui/chart"

const data = [
  { month: "Jan", netWorth: 112000 },
  { month: "Feb", netWorth: 115000 },
  { month: "Mar", netWorth: 118000 },
  { month: "Apr", netWorth: 116500 },
  { month: "May", netWorth: 119000 },
  { month: "Jun", netWorth: 122000 },
  { month: "Jul", netWorth: 124231 },
]

export function NetWorthChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <XAxis dataKey="month" />
        <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
        <Line
          dataKey="netWorth"
          strokeWidth={2}
          stroke="#ffffff"
          fill="rgba(255, 255, 255, 0.1)"
          activeDot={{ r: 8, strokeWidth: 0, fill: "#ffffff" }}
          tooltip={(props) => {
            const { active, payload } = props
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Net Worth</span>
                      <span className="font-bold text-foreground">${payload[0].value?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
