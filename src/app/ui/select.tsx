"use client"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import React,{useState} from 'react'
import { usePathname } from "next/navigation"
import { months,currentYear } from "@/lib/utils"


function SelectInput({yearList, onSelectChange,type }) {
  const pathName = usePathname()
  
  const [selectedValue, setSelectedValue] = useState()

  const handleChange = (value) => {
    if(type != 'default'){
      setSelectedValue(value);
    onSelectChange(value);
    }else{
      onSelectChange(value);
    }
    
  };

  let monthList = Object.entries(months).map(([key, value]) => (
    <SelectItem key={key} value={key}>
      {value}
    </SelectItem>
  ))
  


  let options;
  let placeholder;

  if (type === 'default') {
    let place;
    let extra;
    if(pathName === "/"){
      place = "All"
      extra =  <SelectItem key="month" value="month">Month</SelectItem>
      options = (
        <>
         <SelectItem key="all" value="all">All</SelectItem>
         <SelectItem key='year2' value="year">Year</SelectItem>
        
         {extra}
         
        </>
      );
    }else{
      place= "Year"
      extra = ''
      options = (
        <>
         <SelectItem key='year2' value="year">Year</SelectItem>
        
         {extra}
         
        </>
      );
    }
    
    placeholder = <SelectValue placeholder={place} />
  } else if (type === 'year') {
    options = yearList.map((year) => (
     <>
   
      <SelectItem key={year} value={year}>
        {year}
      </SelectItem></> 
       
    ));

    if(pathName === "/"){
      placeholder =<SelectValue placeholder={'select year'} />
    }else{
      placeholder =<SelectValue placeholder={currentYear} />
    }
    
  } else {
    options = monthList

placeholder =  <SelectValue placeholder={'select month'} />
  }

  

  return (
    <div>
        <Select onValueChange={handleChange}>
  <SelectTrigger className="w-[180px]">
    {placeholder}
  </SelectTrigger>
  <SelectContent>
    
 {options}
  </SelectContent>
</Select>
    </div>
  )
}

export default SelectInput  