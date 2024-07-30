"use client"
import React, { useState, useEffect,useRef } from 'react'
import Table from "@/app/ui/table"
import Search from "@/app/ui/search";
import Select from "@/app/ui/select"
import {filterData,splitDate} from "@/lib/utils"
import { Collisions } from '@/xata';
import {SearchResult} from '@/lib/types'

type TableCompType={
  data: Collisions[],
  getSearchQuery: (params: { searchString: string }) => Promise<SearchResult>, 
totalCount: number,
getPage:(page: number) => Promise<Collisions[]>

}

const TableComponent: React.FC<TableCompType> =({ data, getSearchQuery,totalCount,getPage })=> {
 
  let tempCollisionData = JSON.parse(JSON.stringify(data))
  const [currentData, setCurrentData] = useState(tempCollisionData)

  const [collisionData, setCollisionData] = useState(tempCollisionData)
  const [searchData, setSearchData] = useState<SearchResult | null>(null)
  const [optData, setOptData] = useState('all')
  const [monthValues, setMonthValues] = useState({
    month: null,
    year: null
  });
  const [currentPage, setcurrentPage] = useState(1)
  const [resetKey, setResetKey] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  }, [loading])
  


useEffect(() => {
    if (monthValues.month && monthValues.year) {
      const filteredValue =  filterData(tempCollisionData,`${monthValues.year}`,monthValues.month)
      setCollisionData(filteredValue)
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthValues.month, monthValues.year]);
  
  // useEffect(() => {

  // }, [data])
  useEffect(() => {

  }, [collisionData])
  useEffect(() => {

  }, [currentPage])


  useEffect(() => {
  
  }, [optData])

  const pages = totalCount/data.length
  const pagesArray = Array.from({ length: pages }, (v, i) => i + 1)
 
  const handlePageClick=async (pageIndex:number)=>{
    setLoading(true)
  let page = pageIndex + 1
   let result = await getPage(page)
   if(result){
    setLoading(false)
    setcurrentPage(page)
    handleSelectChange("all","default")
    setResetKey(prevKey => prevKey + 1);
   }

   setCollisionData(result)
   setCurrentData(result)
  }
  let pagesBtn = pagesArray.map((page,index)=>{
    
    return <><button key={`${page}-${index}`} className={`w-6 h-6 relative  text-xs ${ `${currentPage}` === `${page}` ? 'rounded-full bg-[#334155] text-white' : ''} relative-btn`} onClick={()=>{handlePageClick(index)}}>{page}</button></>
  })

  let arrayForYearList:string[] = []

  interface ExtendedCollision extends Collisions {
    year?: string;
    month?: string;
    day?: string;
  }
  
  tempCollisionData.forEach((collision:ExtendedCollision)=>{
    if (collision.timestamp) {
      const  {year,month,day} = splitDate(`${collision.timestamp}`)
    collision.year = year;
    collision.month = month;
    collision.day = day;
    arrayForYearList.push(year)
    }

   }) 


    let yearList: string[] = Array.from(new Set(arrayForYearList))

   
    
  

  

  let opt;
  if(optData === 'year'){
    opt = <div> <Select key={'year-1'} onSelectChange={(val)=>(handleSelectChange(val,'year'))}  type='year' yearList={yearList} /> </div>
  }else if(optData === 'month'){
    opt = <>
    <div> <Select key={'month-1'} type='month' onSelectChange={(val)=>(handleSelectChange(val,'month'))}  /> </div>
    <div> <Select key={'year-1'}  type='year' yearList={yearList} onSelectChange={(val)=>(handleSelectChange(val,'year'))}/> </div>
    </>
    
  }
  else{
    opt=''
  }

  const handleSearch = async (value:{searchString: string}) => {
    const result:SearchResult = await getSearchQuery(value)
   
   
    setSearchData(result)
  }


  const handleCloseSearch=()=>{
   
    setSearchData(null)
  }


    

  function handleSelectChange(val:string,btnType: string){
    if(btnType === 'year' ){
     
      if(optData === 'year'){
        const filteredValue =  filterData(tempCollisionData,`${val}`)
       setCollisionData(filteredValue)
       setMonthValues({
        month: null,
        year: null
      })
      }
     
     
    }
    if(btnType === 'default'){
      setOptData(val)

      if(val === 'all'){
        setCollisionData(currentData)
        setMonthValues({
          month: null,
          year: null
        })
      }
      
    }



    if(optData === 'month'){
      setMonthValues(prevValues => ({
        ...prevValues,
        [btnType]: val
      }));

    }
    
   }

   let loadingOrTable = loading ? <div>...loading</div> : <Table data={collisionData} searchData={searchData} closeSearch={()=>{handleCloseSearch()}} />

  return (
    <div className='w-[80%]'>
    <div className="flex space-x-2 items-center justify-between mb-4 max-w-[20%] ">
          <div className="font-semibold text-sm uppercase">Filter </div>
          <div id='def'><Select key={resetKey} onSelectChange={(val)=>{handleSelectChange(val,'default')}} type={'default'} /></div>
          {opt}
         
        </div>
    <div className="h-[40rem] overflow-y-auto border ">
    <div className=" p-4">
     <div className=" p-1 px-2 flex justify-between items-center shadow-sm z-10 sticky top-0 bg-slate-400"><h2 className='font-semibold'>CHART INFORMATION</h2> <div className='flex w-26 justify-between'>{pagesBtn}</div><Search getSearch={handleSearch} /></div>
      <div className="p-4 border" >
      {loadingOrTable}
        
      </div>
      </div>
      </div>
    </div>
  )
}

export default TableComponent