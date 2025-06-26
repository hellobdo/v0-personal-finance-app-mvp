"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "@/components/ui/chart"

const data = [
  { month: "Jan", income: 7500, expenses: 5100 },
  { month: "Feb", income: 7500, expenses: 4800 },
  { month: "Mar", income: 7500, expenses: 5200 },
  { month: "Apr", income: 7800, expenses: 5400 },
  { month: "May", income: 8000, expenses: 5000 },
  { month: "Jun", income: 8000, expenses: 5100 },
  { month: "Jul", income: 8350, expenses: 5231 },
]

export function ExpenseIncomeChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis dataKey="month" />
        <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
        <Bar
          dataKey="income"
          fill="rgba(255, 255, 255, 0.9)"
          radius={[4, 4, 0, 0]}
          tooltip={(props) => {
            const { active, payload } = props
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Income</span>
                      <span className="font-bold">${payload[0].payload.income?.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Expenses</span>
                      <span className="font-bold">${payload[0].payload.expenses?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Bar dataKey="expenses" fill="rgba(255, 255, 255, 0.5)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
