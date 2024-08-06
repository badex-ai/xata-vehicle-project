"use client"
import React, { useState, useEffect,useRef } from 'react'
import Table from "@/app/ui/table"
import Search from "@/app/ui/search";
import Select from "@/app/ui/select"
import {filterData,splitDate} from "@/lib/utils"
import { Collisions } from '@/xata';
import {SearchResult} from '@/lib/types'
import { ChevronRightIcon,ChevronLeftIcon } from '@radix-ui/react-icons';
import { Button } from "@/components/ui/button"
import TextareaForm from "@/app/ui/sqlTextForm"
import SQLQueryBuilder from '@/components/ui/SQLQueryBuilder'


type TableCompType={
  data: Collisions[],
  getSearchQuery: (params: { searchString: string }) => Promise<SearchResult>, 
  getSQLQuery: (params: { data: string }) => void,
totalCount: number,
getPage:(page: number) => Promise<Collisions[]>

}

const TableComponent: React.FC<TableCompType> =({ data, getSearchQuery,getSQLQuery,totalCount,getPage })=> {
 
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
  const [sqlQuery, setSqlQuery] = useState(false)

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
    
    let page = pageIndex + 1
    if(page === currentPage){
      return 
    }
    setLoading(true)
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
    
    return <><button type='button' key={`${page}-${index}`} className={`w-6 h-6 relative  text-xs ${ `${currentPage}` === `${page}` ? 'rounded-full bg-[#334155] text-white' : ''} relative-btn`} onClick={()=>{handlePageClick(index)}}>{page}</button></>
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
   let loadingOrTable = loading ? <div className='min-h-[20rem] flex items-center justify-center'>...loading</div> :<div className='min-h-[20rem]'> <Table lastPage={pagesArray.length} currentPage={currentPage}data={collisionData} searchData={searchData} closeSearch={()=>{handleCloseSearch()}} /></div>

   const handleSqlClick = ()=>{
    setSqlQuery(true)
   }
 
   const handleTextAreaClose=()=>{
    setSqlQuery(false)
    console.log(`text area close clicked`)
   }

  return (
    <div className='md:w-[80%]  w-100%'>
      <div className='flex justify-between'>
      <div className="flex space-x-2 items-center justify-between mb-4 max-w-[20%] ">
          <div className="font-semibold text-sm uppercase">Filter </div>
          <div><Select key={resetKey} onSelectChange={(val)=>{handleSelectChange(val,'default')}} type={'default'} /></div>
          {opt}

         
         
        </div>
      <Button className='mr-2 bg-[#334155] text-white' onClick={handleSqlClick}variant="outline">SQL</Button>
      </div>
      <div>
      {sqlQuery && 
        <div className=''>
           <TextareaForm submitSQLQuery={getSQLQuery} closeTextBox={handleTextAreaClose}></TextareaForm>
           
        </div>
       
        }
        <SQLQueryBuilder/>
      
      </div>

    
    <div className="h-[40rem] border overflow-y-auto ">
    <div className=" md:p-4">
     <div className="p-1 px-2 flex justify-between  items-center shadow-sm z-10 sticky top-0 bg-slate-400"><h2 className='font-semibold no-wrap'>TABLE <span className='hidden md:inline-block'>INFORMATION</span></h2> <div className=' hidden md:flex md:w-26 md:justify-between'>{pagesBtn}</div>
     
     <Search getSearch={handleSearch} />
     <div className='space-x-2 w-12 h-6 flex md:hidden'>
      <div className='w-5 h-5'>
      <button onClick={()=>{handlePageClick(currentPage - 2)}} title='button for next page' type='button' className={` w-5 h-5 p-1 flex justify-center items-center text-white text-xs  bg-[#334155] rounded-full ${currentPage=== 1 ? 'hidden': ''}`}><ChevronLeftIcon/></button>
      </div>
    
     <div className='w-5 h-5'><button onClick={()=>{handlePageClick(currentPage)}} title='button for previous page' type='button' className={` w-5 h-5 p-1 text-white text-xs text-nowrap bg-[#334155] rounded-full flex justify-center items-center ${currentPage=== pagesArray.length ? 'hidden': ''}` }><ChevronRightIcon/></button></div>
     </div>
     </div>
    
      <div className="p-4 " >
      {loadingOrTable}
        
      </div>
      </div>
      </div>
    </div>
  )
}

export default TableComponent