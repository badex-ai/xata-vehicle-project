import { getAllCollionsCount, getAllCollionsCountPerYear, getallCollisions,getStatesCollisionsCounts,searchTable,getHigestCollisionCause,fetchPaginatedData } from "./server/dataFunction";
import TableComponent from "./ui/tableComponent";

export default async function Home() {
  
  const collisionData = await getallCollisions()

  
 

  const record = await getAllCollionsCount()

  const totalCount = record.aggs.totalCount

  const val = await getAllCollionsCountPerYear()

  const result2 = await getStatesCollisionsCounts()

  const higestState = result2.summaries[0].state_name

  const result = val.aggs.collisionsPerYear.values
  let vvv = {}
  result.forEach(({ $key, $count }) => {
    vvv[$key.substring(0, 4)] = $count
  })

  let collisionForEachYear = Object.entries(vvv).map(([key, value]) => {
    return < >
      <p key={key}>{key} :{value} <span className="text-sm">avgM* </span>:<span className="text-sm font-semibold text-[#FF6F61]">{(value / 12).toFixed(0)}</span></p>

    </>
  }

  )

  let avgCollisionForPeriod = (totalCount / result.length).toFixed(1)

  const mostFrequentCollisionCause = await getHigestCollisionCause()


  return (

    <div>
      <div className="p-4 ">
      

        <div className="flex justify-between">
         

              <TableComponent totalCount={totalCount} data={collisionData} getSearchQuery={searchTable} getPage={fetchPaginatedData}/>
             
           




          <div className="text-[15px] p-4 mt-[50px] w-[20%] bg-[#dbeafe]">
            <h2 className="text-lg font-semibold mb-4 text-center py-1.5 border-b">COLLISIONS STATS</h2>
            <div className="text-base pt-4">
            <div>Number of collisions per year: {collisionForEachYear}</div>
            <p>Average collisions for period: {avgCollisionForPeriod}</p>
            <p>State with highest collision : {higestState?.toUpperCase()} </p>
            <p>Most frequent cause of collision  :  {mostFrequentCollisionCause.summaries[0].cause_of_collision} <span className="text-xs">({mostFrequentCollisionCause.summaries[0].count} occurencies)</span> </p>
            </div>
            
          </div>
        </div>
      </div>


    </div>



  );
}
