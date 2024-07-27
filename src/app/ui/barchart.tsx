"use client"
import React,{useEffect,useState} from 'react'
import { Bar, BarChart,CartesianGrid,XAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent,ChartLegend, ChartLegendContent  } from "@/components/ui/chart"
import { filterData } from '@/lib/utils'

const chartConfig = {
  crashes: {
    label: "crashes",
    color: "#2563eb",
  }
} satisfies ChartConfig


function Barchart({data,selectedYear}) {

   
   const val = filterData(data,selectedYear)

  const [presentedData, setPresentedData] = useState(val)

  useEffect(() => {
   
    const values = filterData(data,selectedYear)
    setPresentedData(values)
  }, [selectedYear])
 
  return (
    <div><ChartContainer config={chartConfig} className="min-h-[200px] w-full">
    <BarChart accessibilityLayer data={presentedData}>
    <CartesianGrid vertical={false} />
    <XAxis
      dataKey="month"
      tickLine={false}
      tickMargin={10}
      axisLine={false}
      tickFormatter={(value) => value.slice(0, 3)}
    />
     <ChartTooltip content={<ChartTooltipContent />} />
     <ChartLegend content={<ChartLegendContent />} />


      <Bar dataKey="crashes" fill="var(--color-desktop)" radius={4} />
    </BarChart>
  </ChartContainer></div>
  )
}

export default Barchart