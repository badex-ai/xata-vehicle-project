"use server"
import { getXataClient } from '@/xata';
import {FormData} from '@/lib/types'
import { Collisions } from '@/xata';
import {SearchResult} from '@/lib/types'

const xata = getXataClient();


export async function getSQLQuery(query: {sqlForm: string}){
  console.log(query.sqlForm,'this is the data passed')
  const userInput = query.sqlForm.toString()
  const result = await xata.sql<Collisions>`${query.sqlForm}`
  console.log(result)
  return result
  
}

export async function  getAllCollisions(){
    return await xata.db.collisions.getPaginated() 
  }

export async function searchTable(value: {searchString: string}) {
 
   return await xata.search.all(value.searchString,{tables: ["collisions"]})  
  };

export async function getCollisonType(vehicleType:string) {
 const result =  await xata.db.collisions
  .select(["id", "timestamp"])
  .filter({
    "vehicle_brands.vehicle_type": vehicleType
  })
  .getAll();

  return result
}

export async function getCollisionBrand(vehicleType:string){
  return await xata.db.collisions.select([
    "*",
    "vehicle_brands.name",
  ]).filter({'vehicle_brands.vehicle_type': vehicleType}).getAll()
}

export async function getAggregateIdInfo(vehicleIds:string[]) {
  return await xata.db.collisions.aggregate({
    byMonth: {
      dateHistogram: {
        column: "timestamp",
        calendarInterval: "month"
      }
    }
  }, {
     
      id: {
        $any: vehicleIds
      }
    
  });
}


export async function getAllCollionsCount() {
  return await xata.db.collisions.aggregate({
    totalCount: {
      count: '*'
    }
  });
  
}

export async function getAllAverageCollionsPerMonth(){
  const random = await xata.db.collisions.aggregate({
  avgCollionForYears: {
      dateHistogram: {
        column: "timestamp",
        calendarInterval: "month"
       
      }
    }
  })
}
export async function getAllCollionsCountPerYear(){
  const vvv = await xata.db.collisions
  .aggregate({
    collisionsPerYear: {
      dateHistogram: {
        column: "timestamp",
        calendarInterval: "year",
      },
     
    }
  })

  return vvv
}
export async function getStatesCollisionsCounts(){
  return await xata.db.collisions.summarize({
    columns: ["state_name"],
    summaries: {
      count: {
        count: "*"
      }
    },
    sort: [{ count: "desc" }],
  });
}
export async function getallCollisions():Promise<Collisions[]>{
  
 const result =  await xata.db.collisions.select([
    "*",
    "vehicle_brands.*",
  ]).getMany({
    pagination: { size: 100 }
  })

  return JSON.parse(JSON.stringify(result))
}

export async function addNewCollision(input:FormData){
  const vehicle = await xata.db.vehicle_brands
  .select([
    "*"
  ]).filter({'name': input.vehicleBrand,'model': input.vehicleModel,'vehicle_type': input.vehicleType
  }).getMany()

  let result;
  let vehicleBrandId = vehicle[0]?.id ;
  
  if(!vehicleBrandId){
   const result =  await xata.db.vehicle_brands.create({'name': input.vehicleBrand,'model': input.vehicleModel,'vehicle_type': input.vehicleType})

   
   vehicleBrandId = result.id
  }
  
  result = await xata.db.collisions.create({
    state_name: input.state,
    timestamp: input.time,
    state_abbr: input.state,
    location_of_collision: input.location,
    driver_experience: input.driversExperience,
    cause_of_collision: input.causeOfCollision,
    driver_sex: input.sex,
    vehicle_plate_number: input.plateNumber,
    vehicle_brands: vehicleBrandId}
  )
return result
  
}

export async function getHigestCollisionCause() {
  return await xata.db.collisions
.summarize({
  columns: ['cause_of_collision'],
  summaries: {
    count: { count: '*' }
  },
  sort: [{ count: "desc" }],
})

}

export async function fetchPaginatedData(page: number):Promise<Collisions[]> {
 const result =  await xata.db.collisions
 .select([
  "*",
  "vehicle_brands.*"
]).getPaginated({
      pagination: {
        size: 100,
        offset: (page - 1) * 100
      }
    });

   

    return JSON.parse(JSON.stringify(result.records))

}