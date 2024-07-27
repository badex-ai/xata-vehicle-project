import Chartcomponent from "../ui/chartComponent";
import {getCollisonType,getCollisionBrand,getAggregateIdInfo} from "@/app/server/dataFunction"


export default async function Truck() {
  const truckCollisions = await getCollisonType('Truck')



const TruckCollisionIds = truckCollisions.map(collision => collision.id);

const results = await getAggregateIdInfo(TruckCollisionIds)


const brandCollisions = await getCollisionBrand('Truck')

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
