import { z } from "zod"
import {causes,vehicleTypes,capitalizeFirstLetter} from '@/lib/utils'
import {Collisions,VehicleBrands} from '@/xata'



export type DataItem = {
  year: string;
  month: string;
  day: string;
  [key: string]: any| number
}


  export const FormSchema = z.object({
    causeOfCollision: z.enum(causes),
    driversExperience: z.number().int().gt(0),
    sex: z.enum(["Male", "Female"]),
    location: z.string().min(1, "Location is required"),
    state: z.string().min(4, 'State is required'),
    time: z.string().datetime({ message: "Please enter a valid time" }),
    plateNumber: z.string().length(7, "Plate number must be 7 characters long").transform(val => val.toUpperCase()),
    vehicleBrand: z.string().min(1, "Vehicle brand is required").transform(capitalizeFirstLetter),
    vehicleModel: z.string().min(1, "Vehicle model is required").transform(capitalizeFirstLetter),
    vehicleType: z.enum(vehicleTypes)
  });

  export type FormData = z.infer<typeof FormSchema>;
  
  export type PieData = Collisions & {
    year: string;
    month: string;
    day: string;
    timestamp: string;
    vehicle_Brand: VehicleBrands;
    [key: string]: string | number | VehicleBrands
  };

  export type BarData = {
    [key: string]: string | number;
    $count: number;
     $key: string | number
  }

  export type StringCountDataType ={
    [key : string ] : string | number;
  }

  export type ModelArraysObject = {
    [key: string]: PieData[]
  }

  export type SearchResult = {
    records: { record: Collisions, table: string }[];
    totalCount: number;
  } | null;