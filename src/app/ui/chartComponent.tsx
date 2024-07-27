"use client"
import React, { useState } from 'react'
import Select from "@/app/ui/select"
import Barchart from "@/app/ui/barchart"
import Piechart from "@/app/ui/piechart"
import { currentYear,months,splitDate,filterData } from '@/lib/utils'
import { PieChartIcon,BarChartIcon } from '@radix-ui/react-icons'
import { parseISO, parse, format } from 'date-fns';
import VehicleAggComponent from '@/app/ui/vehicleAggComponent'

function Chartcomponent({barChartData, pieChartData}) {
    const [selectedYear, setSelectedYear] = useState(currentYear)
    const [currentChart, setCurrentChart] = useState('bar')
    
    let newData = []
    let arrayForYearList = []  

    const handleSelectChange = (value) => {
     
        setSelectedYear(value)
        
    };

    const handleChartSet = (value)=>{
        if(value === 'bar'){
          setCurrentChart('bar')
        }
        else{
          setCurrentChart('pie')
        }
        
    }

     

      barChartData.forEach((dataValue)=>{

        const  {year,month,day} = splitDate( dataValue['$key'])
        newData.push({year,month, crashes: dataValue['$count'],day })

       }) 

       newData.forEach(element => {
        arrayForYearList.push(element.year)
       });

       let uniqueSet = new Set(arrayForYearList);
      
       let yearList = [...uniqueSet]

       const groupedByBrand = pieChartData.reduce((acc, collision) => {

        const brandName = collision.vehicle_brands.name;   
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
        carModel: model,
        collisions: filterData(data, selectedYear).length
      }))
      .filter(item => item.collisions > 0).sort((a, b) => b.collisions - a.collisions);
      
      const chart = currentChart === 'bar' ?   <Barchart selectedYear={selectedYear} data={newData}/> : 
      <Piechart selectedYear={selectedYear} data={pieNewData}/>

  return (
    <>
         
         <div className="flex items-center justify-between mb-4 w-[30%]  ">
          <div className="font-semibold text-sm uppercase">Filter </div>
          <div><Select key={'default-1'} type='default' /></div>
          <div> <Select key={'year-1'} onSelectChange={handleSelectChange} type='year' yearList={yearList}/> </div>
         
         
         
        </div>
          
         
          
           
       
        <div className="h-[40rem] border flex">
          <div className=" border w-[80%] p-8">

            <h2 className='font-semibold'>CHART INFORMATION</h2>
            <div className='flex bg-blue-100'>
            <div className=" border w-[80%] p-16 text-center mx-auto my-0" >
            {chart}
           
            </div>
            <div className='mt-4 w-[5%] '>
              <button type='button'onClick={()=>handleChartSet('pie')} className='w-8 h-8 hover:bg-[#f3f4f6] rounded-sm  hover:text-white-500'><PieChartIcon className='w-7 h-7 mx-auto my-auto'/></button>
              <button type='button' onClick={()=>handleChartSet('bar')} className='w-8 h-8 hover:bg-[#f3f4f6] rounded-sm  hover:text-white-500'><BarChartIcon className='w-7 h-7 mx-auto my-auto'/></button>
              
              
            </div>
            </div>
           
            
           </div>
          <div className=" p-4 w-[20%]">
          <VehicleAggComponent barData={newData} pieData={chartData}  selectedYear={selectedYear} currentChart={currentChart}/>
            </div>
            
        </div>
    </>
  )
}

export default Chartcomponent