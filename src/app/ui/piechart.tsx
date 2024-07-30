"use client"
import { Pie, PieChart } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {filterData} from '@/lib/utils'
import {StringCountDataType,ModelArraysObject} from '@/lib/types'


const color =[
  "hsl(153, 82%, 55%)", "hsl(226, 32%, 36%)", "hsl(168, 63%, 30%)", "hsl(280, 76%, 32%)",
  "hsl(332, 100%, 82%)", "hsl(60, 88%, 48%)", "hsl(171, 88%, 34%)", "hsl(81, 46%, 56%)",
  "hsl(49, 80%, 41%)", "hsl(197, 75%, 24%)", "hsl(59, 100%, 93%)", "hsl(250, 84%, 65%)",
  "hsl(138, 60%, 71%)", "hsl(136, 94%, 40%)", "hsl(228, 88%, 28%)", "hsl(11, 100%, 59%)",
  "hsl(336, 68%, 56%)", "hsl(79, 32%, 36%)", "hsl(51, 60%, 41%)", "hsl(60, 86%, 10%)",
  "hsl(28, 67%, 50%)", "hsl(333, 90%, 30%)", "hsl(316, 97%, 38%)", "hsl(102, 100%, 55%)",
  "hsl(140, 72%, 85%)"
]




 const Piechart: React.FC<{data:ModelArraysObject,selectedYear:string}> =({data,selectedYear})=> {

  interface ChartConfig {
    [key: string]: {
      label: string;
      color?: string;
    };
  }
  let chartConfig:ChartConfig ={
    collisions: {
    label: "collisions",
    
  }
  }satisfies ChartConfig
  
  type PieComponentType = { 
    vehicleModel: string, collisions: number, fill: string
   }

  let chartData : PieComponentType[]=[]

  const modelsMap = new Map();

    for(let model in data){
      let yearArray = filterData(data[model],selectedYear);
     
      modelsMap.set(model,yearArray)

    }


    let i = 0

  modelsMap.forEach((value, key) => {
    
    if(value.length != 0){
      chartConfig[key] =  {
        label: key,
        color: `var(--color-${key})`,
      }
    chartData.push({ vehicleModel: key, collisions: value.length, fill: color[i] })
    }
    i++
});





  return (
  
        <ChartContainer
          config={chartConfig}
          className="w-[100%] aspect-square max-h-[400px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="collisions" hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="collisions"
              labelLine={false}
              label={({ payload, ...props }) => {
                return (
                  <text
                    cx={props.cx}
                    cy={props.cy}
                    x={props.x}
                    y={props.y}
                    textAnchor={props.textAnchor}
                    dominantBaseline={props.dominantBaseline}
                    fill="hsla(var(--foreground))"
                  >
                    {`${
                      chartConfig[payload.vehicleModel as keyof typeof chartConfig]
                        ?.label
                    } (${payload.collisions})`}
                  </text>
                )
              }}
              nameKey="vehicleModel"
            />
          </PieChart>
         </ChartContainer>
   
  )
}

export default Piechart
