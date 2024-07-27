import Chartcomponent from "../ui/chartComponent";
import {getCollisonType,getCollisionBrand,getAggregateIdInfo} from "@/app/server/dataFunction"


export default async function Bus() {
  const busCollisions = await getCollisonType('Bus')



const busCollisionIds = busCollisions.map(collision => collision.id);

const results = await getAggregateIdInfo(busCollisionIds)


const brandCollisions = await getCollisionBrand('Bus')

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
