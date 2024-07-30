"use client"
import React,{useEffect,useState} from 'react'
import { usePathname } from 'next/navigation'
import { filterData,capitalizeFirstLetter } from '@/lib/utils'
import {DataItem} from '@/lib/types'


type PieData = {vehicleModel: string, collisions: number}
type VehicleAggType={
  selectedYear: string,
  currentChart: string,
  barData: DataItem[],
  pieData: PieData[]
}

const VehicleAggComponent:React.FC<VehicleAggType> =({selectedYear,currentChart,barData,pieData})=> {
 
    const pathname = usePathname()
    const val = filterData(barData,selectedYear)
   

    function sumCrashes(dataArray:DataItem[]) {

      return dataArray.reduce((total:number, current: DataItem) => total + current.crashes, 0);
    }

   const avgCollision = sumCrashes(val) / val.length

   const vehicle =  pathname.split("/")[1]


    let agg = currentChart === 'bar' ? <> 
    
    <p>Average {vehicle} crashes for {selectedYear}:
        </p>
        <p className="font-light">{avgCollision.toFixed(0)} crashes</p>
    </> :
    <div><p>{capitalizeFirstLetter(vehicle)} model with the highest collision in {selectedYear}: </p>
    <p className="font-light">{pieData[0].vehicleModel}({pieData[0].collisions})</p>
   
    </div> 
  return (
    <>
    <div><h2 className='font-semibold mb-3 text-center py-1.5 border-b border-black'> AGGREGATE INFO</h2></div>
    <div className='pt-3'>{agg}</div>
    </>
  )
}


export default VehicleAggComponent