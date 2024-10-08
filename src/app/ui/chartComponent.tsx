"use client"
import React, { useState } from 'react'
import Select from "@/app/ui/select"
import Barchart from "@/app/ui/barchart"
import Piechart from "@/app/ui/piechart"
import { currentYear,months,splitDate,filterData } from '@/lib/utils'
import { PieChartIcon,BarChartIcon } from '@radix-ui/react-icons'
import VehicleAggComponent from '@/app/ui/vehicleAggComponent'

import {PieData,BarData} from '@/lib/types'



interface ChartDataType {
  barChartData: BarData[];
  pieChartData: PieData[]
}

const Chartcomponent :React.FC<ChartDataType>  = ({barChartData, pieChartData})=> {

    const [selectedYear, setSelectedYear] = useState(currentYear)
    const [currentChart, setCurrentChart] = useState('bar')

    interface CrashData {
      year: string;
      month: string;
      crashes: number;
      day: string;
    }
    
    let newData :CrashData[]= []
    let arrayForYearList :string[]= []  

    const handleSelectChange = (value:string) => {
     
      if(value !== 'year'){
        setSelectedYear(value)
      }
        
        
    };

    const handleChartSet = (value: string)=>{
        if(value === 'bar'){
          setCurrentChart('bar')
        }
        else{
          setCurrentChart('pie')
        }
        
    }

      barChartData.forEach((dataValue:BarData)=>{

        const  {year,month,day} = splitDate( dataValue['$key'] as string)
        newData.push({year,month, crashes: dataValue['$count'],day })

       }) 

       newData.forEach(element => {
        arrayForYearList.push(element.year)
       });

       let uniqueSet: Set<string> = new Set(arrayForYearList);
      
       let yearList = Array.from(uniqueSet)

       type BrandAcc = {
        [brandName: string]: PieData[];
      };

       const groupedByBrand = pieChartData.reduce<BrandAcc>((acc, collision) => {

        const brandName = collision.vehicle_brands?.name as string;   
        const time = splitDate(collision.timestamp)

      
        collision.year = time.year
        collision.month = time.month
        collision.day = time.day

        
          if (!acc[brandName]) {
            acc[brandName] = [];
          }
          
        
        acc[brandName].push(collision);
        
        return acc;
      }, {});

      const pieNewData = JSON.parse(JSON.stringify(groupedByBrand))

      const chartData = Object.entries(groupedByBrand)
      .map(([model, data]) => ({
        vehicleModel: model,
        collisions: filterData(data, selectedYear).length
      }))
      .filter(item => item.collisions > 0).sort((a, b) => b.collisions - a.collisions);
      
      const chart = currentChart === 'bar' ?   <Barchart selectedYear={selectedYear} data={newData}/> : 
      <Piechart selectedYear={selectedYear} data={pieNewData}/>
    
  return (
    <>
         
         <div className="flex items-center justify-between mb-4 md:w-[30%] w-[64%]  ">
          <div className="font-semibold text-sm uppercase">Filter </div>
          <div><Select key={'default-1'} type='default' /></div>
          <div> <Select key={'year-1'} onSelectChange={handleSelectChange} type='year' yearList={yearList}/> </div>
        </div>
          

        <div className="h-[40rem] md:flex ">
          <div className=" border md:w-[80%] w-[100%] md:p-8 p-1">

            <h2 className='font-semibold'>CHART INFORMATION</h2>
            <div className=' relative bg-blue-100'>
            <div className=" border w-[80%] md:p-16 p-4 text-center mx-auto my-0" >
            {chart}
           
            </div>
            <div className='absolute top-0 right-2 md:mt-4 md:w-[5%] flex-col items-center justify-center w-[10%] mt-2'>
              <button title="click this to see the piechart for models" type='button'onClick={()=>handleChartSet('pie')} className='md:w-8 md:h-8 h-5 w-5 hover:bg-[#f3f4f6] rounded-sm  hover:text-white-500'><PieChartIcon className='md:w-7 md:h-7 h-5 w-5 mx-auto my-auto'/></button>
              <button title='click this to see the barChart'type='button' onClick={()=>handleChartSet('bar')} className='md:w-8 md:h-8 h-5 w-5 hover:bg-[#f3f4f6] rounded-sm  hover:text-white-500'><BarChartIcon className='md:w-7 md:h-7 h-5 w-5 mx-auto my-auto'/></button>
              
              
            </div>
            </div>
            
            
           </div>
          <div className=" md:p-4 md:w-[20%] border min-height-[12rem] w-100% p-2 mt-4 md:mt-0">
          <VehicleAggComponent barData={newData} pieData={chartData}  selectedYear={selectedYear} currentChart={currentChart}/>
            </div>
            
        </div>
    </>
  )
}

export default Chartcomponent
