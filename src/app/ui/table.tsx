"use client"
import React,{useEffect,useState} from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Cross2Icon,CrumpledPaperIcon } from '@radix-ui/react-icons'

  
  
  function TableUI({data,searchData,closeSearch}) {
    

    useEffect(() => {
     
      
    }, [searchData])

   

  let searchTable =  searchData?.records.length === 0 ?
      <>
      <div className='w-[100%] text-center'>
      <div className='mx-auto w-8 h-8'><CrumpledPaperIcon/></div>
      <div> There are no result for this search</div>
      </div></>
    :
      <Table>
       <TableHeader>
         <TableRow>
           <TableHead className="w-[100px]">Cause of collision</TableHead>
           <TableHead>Drivers experience</TableHead>
           <TableHead>Sex</TableHead>
           <TableHead className="text-right">location</TableHead>
           <TableHead className="text-right">State</TableHead>
           <TableHead className="text-right">Time</TableHead>
           <TableHead className="text-right">Plate number</TableHead>
         </TableRow>
       </TableHeader>
       <TableBody>
         {searchData?.records.map((input) => 
           {
        const collision = JSON.parse(JSON.stringify(input.record)) 
           
           return <TableRow key={collision.id}>
             <TableCell className="font-medium">{collision.cause_of_collision}</TableCell>
             <TableCell>{collision.driver_experience}</TableCell>
             <TableCell>{collision.driver_sex}</TableCell>
             <TableCell className="text-right">{collision.location_of_collision}</TableCell>
             <TableCell className="text-right">{collision.state_name}</TableCell>
            
             <TableCell className="text-right">{collision.timestamp}</TableCell>
           
             <TableCell className="text-right">{collision.vehicle_plate_number}</TableCell>
           
           </TableRow>
         })}
       </TableBody>
     
     </Table>

  let collisionTable =  data?.length === 0 ?
      <><div className='w-[100%] text-center'>
      <div className='mx-auto w-8 h-8'><CrumpledPaperIcon/></div>
      <div> There are no result for this filter</div>
      </div></>
    :
    <Table>
    <TableHeader>
     <TableRow>
       <TableHead className="w-[100px]">Cause of collision</TableHead>
       <TableHead>Drivers experience</TableHead>
       <TableHead>Sex</TableHead>
       <TableHead className="text-right">location</TableHead>
       <TableHead className="text-right">State</TableHead>
       <TableHead className="text-right">Time</TableHead>
       <TableHead className="text-right">Plate number</TableHead>
       <TableHead className="text-right">Vehicle brand/ model</TableHead>
       <TableHead className="text-right">Vehicle type</TableHead>
     </TableRow>
   </TableHeader>
   <TableBody>
     {data.map((collision) => 
    
       {
       
       return <TableRow key={collision.id}>
         <TableCell className="font-medium">{collision.cause_of_collision}</TableCell>
         <TableCell>{collision.driver_experience}</TableCell>
         <TableCell>{collision.driver_sex}</TableCell>
         <TableCell className="text-right">{collision.location_of_collision}</TableCell>
         <TableCell className="text-right">{collision.state_name}</TableCell>
         {/* <TableCell className="text-right">{collision.location_of_collision}</TableCell> */}
         <TableCell className="text-right">{collision.timestamp}</TableCell>
       
         <TableCell className="text-right">{collision.vehicle_plate_number}</TableCell>
         <TableCell className="text-right">{`${collision.vehicle_brands?.name} ${collision.vehicle_brands?.model}`}</TableCell>
         <TableCell className="text-right">{collision.vehicle_brands?.vehicle_type}</TableCell>
       </TableRow>
     })}
   </TableBody>
 
 </Table>
    
    

       const content =  searchData ? 
       <> 
       <h3 className='mb-4'><span><button className='w-6 h-6 ml-2 mb-2 mr-2 rounded-sm bg-gray-200 hover:bg-gray-400 p-1' type='button' onClick={closeSearch}><Cross2Icon/></button></span>Search Results: {searchData?.totalCount}</h3>
       {searchTable}
       </>
        
       :
         <> 
        {collisionTable}
     </>

    return (
      <div>{content}</div>
        
    )
  }
  
  export default TableUI