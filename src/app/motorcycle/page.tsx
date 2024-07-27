import Chartcomponent from "../ui/chartComponent";
import {getCollisonType,getCollisionBrand,getAggregateIdInfo} from "@/app/server/dataFunction"

export default async function Motorcycle() {

const motorCycleCollisions = await getCollisonType('Motorcycle')



const motorCycleCollisionIds = motorCycleCollisions.map(collision => collision.id);

const results = await getAggregateIdInfo(motorCycleCollisionIds)


const brandCollisions = await getCollisionBrand('Motorcycle')

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
