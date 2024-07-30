import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { getYear } from 'date-fns';
import {DataItem} from '@/lib/types'


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const currentYear = getYear(new Date()).toString()
export const months : {[key: string]: string} = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "Jun",
  "07": "Jul",
  "08": "Aug",
  "09": "Sep",
  "10": "Oct",
  "11": "Nov",
  "12": "Dec"
};

export function splitDate(dateString: string){
  
  const date = dateString.split("T")[0]
  const year = date.split("-")[0]
  const monthNumber = date.split("-")[1]
  const month = months[monthNumber]
  const day = date.split("-")[2]
  return {year,month,day}


}



export function filterData(valueToFilter:DataItem[],selectedYear: string,selectedMonth?:string){
  let values= valueToFilter.filter((data)=>{
    if(selectedMonth){
      return selectedYear === data.year && months[selectedMonth] === data.month
    }else{
    return selectedYear === data.year

    }
  })
  return values
}


export const causes = [
  "Distracted driving", "Speeding", "Drunk driving", "Weather conditions", "Running a red light",
  "Tailgating", "Reckless driving", "Improper turns", "Vehicle malfunction", "Fatigue"
] as const

export const states = [
  
    {name: "Alabama", code: "AL"},
    {name: "Alaska", code: "AK"},
    {name: "Arizona", code: "AZ"},
    {name: "Arkansas", code: "AR"},
    {name: "California", code: "CA"},
    {name: "Colorado", code: "CO"},
    {name: "Connecticut", code: "CT"},
    {name: "Delaware", code: "DE"},
    {name: "Florida", code: "FL"},
    {name: "Georgia", code: "GA"},
    {name: "Hawaii", code: "HI"},
    {name: "Idaho", code: "ID"},
    {name: "Illinois", code: "IL"},
    {name: "Indiana", code: "IN"},
    {name: "Iowa", code: "IA"},
    {name: "Kansas", code: "KS"},
    {name: "Kentucky", code: "KY"},
    {name: "Louisiana", code: "LA"},
    {name: "Maine", code: "ME"},
    {name: "Maryland", code: "MD"},
    {name: "Massachusetts", code: "MA"},
    {name: "Michigan", code: "MI"},
    {name: "Minnesota", code: "MN"},
    {name: "Mississippi", code: "MS"},
    {name: "Missouri", code: "MO"},
    {name: "Montana", code: "MT"},
    {name: "Nebraska", code: "NE"},
    {name: "Nevada", code: "NV"},
    {name: "New Hampshire", code: "NH"},
    {name: "New Jersey", code: "NJ"},
    {name: "New Mexico", code: "NM"},
    {name: "New York", code: "NY"},
    {name: "North Carolina", code: "NC"},
    {name: "North Dakota", code: "ND"},
    {name: "Ohio", code: "OH"},
    {name: "Oklahoma", code: "OK"},
    {name: "Oregon", code: "OR"},
    {name: "Pennsylvania", code: "PA"},
    {name: "Rhode Island", code: "RI"},
    {name: "South Carolina", code: "SC"},
    {name: "South Dakota", code: "SD"},
    {name: "Tennessee", code: "TN"},
    {name: "Texas", code: "TX"},
    {name: "Utah", code: "UT"},
    {name: "Vermont", code: "VT"},
    {name: "Virginia", code: "VA"},
    {name: "Washington", code: "WA"},
    {name: "West Virginia", code: "WV"},
    {name: "Wisconsin", code: "WI"},
    {name: "Wyoming", code: "WY"}




]

export const vehicleTypes = ["Car", "Motorcycle", "Bus", "Truck"] as const

export  const capitalizeFirstLetter = (str: string) => {
  if (typeof str !== 'string' || str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};


