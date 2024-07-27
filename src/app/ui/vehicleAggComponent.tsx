"use client"
import React,{useEffect,useState} from 'react'
import { usePathname } from 'next/navigation'
import { filterData } from '@/lib/utils'


function VehicleAggComponent({selectedYear,currentChart,barData,pieData}) {
    const pathname = usePathname()
    const val = filterData(barData,selectedYear)
        
    function sumCrashes(dataArray) {
      return dataArray.reduce((total, current) => total + current.crashes, 0);
    }

   const avgCollision = sumCrashes(val) / val.length

   const vehicle =  pathname.split("/")[1]


    let agg = currentChart === 'bar' ? <> 
    
    <p>Average {vehicle} crashes for {selectedYear}:
        </p>
        <p>{avgCollision.toFixed(0)} crashes</p>
    </> :
    <div><p>{vehicle} model with the highest collision in {selectedYear}: </p>
    <p>{pieData[0].carModel}({pieData[0].collisions})</p></div>
  return (
    <>
    <div><h2 className='text-lg font-semibold mb-4 text-center py-1.5 border-b'> AGGREGATE INFO</h2></div>
    <div className='text-base pt-4'>{agg}</div>
    </>
  )
}

export default VehicleAggComponent