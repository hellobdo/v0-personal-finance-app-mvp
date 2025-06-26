"use client"

import * as React from "react"
import {
  Bar as RechartsBar,
  BarChart as RechartsBarChart,
  CartesianGrid as RechartsCartesianGrid,
  Cell as RechartsCell,
  Label as RechartsLabel,
  Legend as RechartsLegend,
  Line as RechartsLine,
  LineChart as RechartsLineChart,
  Pie as RechartsPie,
  PieChart as RechartsPieChart,
  ReferenceLine as RechartsReferenceLine,
  ResponsiveContainer as RechartsResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis,
} from "recharts"

// Update the ResponsiveContainer styling to use a more minimalist black aesthetic
const ResponsiveContainer = React.forwardRef<
  React.ElementRef<typeof RechartsResponsiveContainer>,
  React.ComponentPropsWithoutRef<typeof RechartsResponsiveContainer>
>(({ className, ...props }, ref) => (
  <div className="h-[350px] w-full">
    <RechartsResponsiveContainer
      width="100%"
      height="100%"
      className="h-full w-full [&_.recharts-cartesian-grid-horizontal_line]:stroke-border/30 [&_.recharts-cartesian-grid-vertical_line]:stroke-border/30 [&_.recharts-cartesian-axis-line]:stroke-border [&_.recharts-cartesian-axis-tick-line]:stroke-border [&_.recharts-cartesian-axis-tick-value]:fill-muted-foreground [&_.recharts-label]:fill-muted-foreground [&_.recharts-legend-item-text]:fill-muted-foreground [&_.recharts-tooltip-item-name]:text-muted-foreground [&_.recharts-tooltip-item-separator]:text-muted-foreground [&_.recharts-tooltip-item-value]:text-foreground [&_.recharts-tooltip-cursor]:fill-muted/20 [&_.recharts-tooltip-label]:text-muted-foreground"
      {...props}
    />
  </div>
))
ResponsiveContainer.displayName = "ResponsiveContainer"

// Update LineChart to use a more minimalist style
const LineChart = React.forwardRef<
  React.ElementRef<typeof RechartsLineChart>,
  React.ComponentPropsWithoutRef<typeof RechartsLineChart>
>(({ className, children, ...props }, ref) => (
  <RechartsLineChart ref={ref} className="h-full w-full" {...props}>
    <RechartsCartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border/30" />
    {children}
    <RechartsTooltip
      content={({ active, payload, label }) => {
        if (active && payload?.length) {
          return (
            <div className="rounded-lg border bg-background p-2 shadow-sm">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col">
                  <span className="text-[0.70rem] uppercase text-muted-foreground">
                    {payload[0]?.name || payload[0]?.dataKey}
                  </span>
                  <span className="font-bold">{payload[0]?.value}</span>
                </div>
              </div>
            </div>
          )
        }
        return null
      }}
    />
  </RechartsLineChart>
))
LineChart.displayName = "LineChart"

// Update BarChart to use a more minimalist style
const BarChart = React.forwardRef<
  React.ElementRef<typeof RechartsBarChart>,
  React.ComponentPropsWithoutRef<typeof RechartsBarChart>
>(({ className, children, ...props }, ref) => (
  <RechartsBarChart ref={ref} className="h-full w-full" {...props}>
    <RechartsCartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border/30" />
    {children}
    <RechartsTooltip
      content={({ active, payload, label }) => {
        if (active && payload?.length) {
          return (
            <div className="rounded-lg border bg-background p-2 shadow-sm">
              <div className="grid grid-cols-2 gap-2">
                {payload.map((item) => (
                  <div key={item.name} className="flex flex-col">
                    <span className="text-[0.70rem] uppercase text-muted-foreground">{item.name}</span>
                    <span className="font-bold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        }
        return null
      }}
    />
  </RechartsBarChart>
))
BarChart.displayName = "BarChart"

const PieChart = React.forwardRef<
  React.ElementRef<typeof RechartsPieChart>,
  React.ComponentPropsWithoutRef<typeof RechartsPieChart>
>(({ className, children, ...props }, ref) => (
  <RechartsPieChart ref={ref} className="h-full w-full" {...props}>
    {children}
    <RechartsTooltip
      content={({ active, payload }) => {
        if (active && payload?.length) {
          return (
            <div className="rounded-lg border bg-background p-2 shadow-sm">
              <div className="flex flex-col">
                <span className="text-[0.70rem] uppercase text-muted-foreground">{payload[0]?.name}</span>
                <span className="font-bold">{payload[0]?.value}</span>
                <span className="text-xs text-muted-foreground">
                  {(payload[0]?.percent * 100).toFixed(1)}% of total
                </span>
              </div>
            </div>
          )
        }
        return null
      }}
    />
  </RechartsPieChart>
))
PieChart.displayName = "PieChart"

const XAxis = React.forwardRef<
  React.ElementRef<typeof RechartsXAxis>,
  React.ComponentPropsWithoutRef<typeof RechartsXAxis>
>(({ className, ...props }, ref) => (
  <RechartsXAxis
    ref={ref}
    axisLine={false}
    tickLine={false}
    tick={{ fontSize: 12, fill: "rgba(255, 255, 255, 0.7)" }}
    tickMargin={8}
    {...props}
  />
))
XAxis.displayName = "XAxis"

const YAxis = React.forwardRef<
  React.ElementRef<typeof RechartsYAxis>,
  React.ComponentPropsWithoutRef<typeof RechartsYAxis>
>(({ className, ...props }, ref) => (
  <RechartsYAxis
    ref={ref}
    axisLine={false}
    tickLine={false}
    tick={{ fontSize: 12, fill: "rgba(255, 255, 255, 0.7)" }}
    tickMargin={8}
    {...props}
  />
))
YAxis.displayName = "YAxis"

// Update Line to use a white stroke
const Line = React.forwardRef<
  React.ElementRef<typeof RechartsLine>,
  React.ComponentPropsWithoutRef<typeof RechartsLine>
>(({ className, ...props }, ref) => (
  <RechartsLine
    ref={ref}
    type="monotone"
    strokeWidth={2}
    dot={false}
    activeDot={{ r: 6, strokeWidth: 0, fill: "#ffffff" }}
    stroke="#ffffff"
    fill="rgba(255, 255, 255, 0.1)"
    {...props}
  />
))
Line.displayName = "Line"

// Update Bar to use white fill
const Bar = React.forwardRef<React.ElementRef<typeof RechartsBar>, React.ComponentPropsWithoutRef<typeof RechartsBar>>(
  ({ className, ...props }, ref) => (
    <RechartsBar ref={ref} fill="rgba(255, 255, 255, 0.9)" barSize={30} radius={[4, 4, 0, 0]} {...props} />
  ),
)
Bar.displayName = "Bar"

const Pie = React.forwardRef<React.ElementRef<typeof RechartsPie>, React.ComponentPropsWithoutRef<typeof RechartsPie>>(
  ({ className, ...props }, ref) => (
    <RechartsPie
      ref={ref}
      cx="50%"
      cy="50%"
      innerRadius={60}
      outerRadius={80}
      paddingAngle={2}
      dataKey="value"
      nameKey="name"
      stroke="#000000"
      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
      labelLine={false}
      {...props}
    />
  ),
)
Pie.displayName = "Pie"

const Cell = React.forwardRef<
  React.ElementRef<typeof RechartsCell>,
  React.ComponentPropsWithoutRef<typeof RechartsCell>
>(({ className, ...props }, ref) => <RechartsCell ref={ref} {...props} />)
Cell.displayName = "Cell"

const CartesianGrid = React.forwardRef<
  React.ElementRef<typeof RechartsCartesianGrid>,
  React.ComponentPropsWithoutRef<typeof RechartsCartesianGrid>
>(({ className, ...props }, ref) => <RechartsCartesianGrid ref={ref} {...props} />)
CartesianGrid.displayName = "CartesianGrid"

const ReferenceLine = React.forwardRef<
  React.ElementRef<typeof RechartsReferenceLine>,
  React.ComponentPropsWithoutRef<typeof RechartsReferenceLine>
>(({ className, ...props }, ref) => <RechartsReferenceLine ref={ref} {...props} />)
ReferenceLine.displayName = "ReferenceLine"

const Legend = React.forwardRef<
  React.ElementRef<typeof RechartsLegend>,
  React.ComponentPropsWithoutRef<typeof RechartsLegend>
>(({ className, ...props }, ref) => <RechartsLegend ref={ref} {...props} />)
Legend.displayName = "Legend"

const Label = React.forwardRef<
  React.ElementRef<typeof RechartsLabel>,
  React.ComponentPropsWithoutRef<typeof RechartsLabel>
>(({ className, ...props }, ref) => <RechartsLabel ref={ref} {...props} />)
Label.displayName = "Label"

export {
  ResponsiveContainer,
  LineChart,
  BarChart,
  PieChart,
  XAxis,
  YAxis,
  Line,
  Bar,
  Pie,
  Cell,
  CartesianGrid,
  ReferenceLine,
  Legend,
  Label,
}
