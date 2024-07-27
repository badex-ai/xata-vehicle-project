import Chartcomponent from "../ui/chartComponent";
import {getCollisonType,getCollisionBrand,getAggregateIdInfo} from "@/app/server/dataFunction"

export default async function Car() {

// Step 1: Get all collision records related to cars
const carCollisions = await getCollisonType('Car')

// Step 2: Extract the IDs of car collisions
const carCollisionIds = carCollisions.map(collision => collision.id);

// Step 3: Perform the aggregation on these specific collisions
const results = await getAggregateIdInfo(carCollisionIds)

const brandCollisions = await getCollisionBrand('Car')

const chartData = results.aggs.byMonth.values

const plainObject = JSON.parse(JSON.stringify(brandCollisions));


  return (
     <>
      <div className="p-4 ">
        <Chartcomponent barChartData={chartData} pieChartData={plainObject} />
      </div>
     </> 
  );
}
