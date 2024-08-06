import { getAllCollionsCount, getAllCollionsCountPerYear, getallCollisions,getStatesCollisionsCounts,searchTable,getHigestCollisionCause,fetchPaginatedData,getSQLQuery } from "./server/dataFunction";
import TableComponent from "./ui/tableComponent";
import { InfoCircledIcon } from '@radix-ui/react-icons'

export default async function Home() {
  
  type tempObject = {
    [key: string]: number
  };


  const collisionData = await getallCollisions()
  

  
 

  const record = await getAllCollionsCount()

  const totalCount = record.aggs.totalCount

  const val = await getAllCollionsCountPerYear()

  const result2 = await getStatesCollisionsCounts()

  const higestState = result2.summaries[0].state_name

  const result = val.aggs.collisionsPerYear.values
  let tempObj: tempObject = {}
  result.forEach(({ $key, $count }) => {
    tempObj[($key as string).substring(0, 4)] = $count
  })

  let collisionForEachYear = Object.entries(tempObj).map(([key, value]) => {
    return < >
      <p key={`${key}-${value}`}>{key} :{value} <span className="text-sm pl-2">avgM*: </span><span className="text-sm">{(value / 12).toFixed(0)}</span></p>

    </>
  }

  )

  let avgCollisionForPeriod = (totalCount / result.length).toFixed(1)

  const mostFrequentCollisionCause = await getHigestCollisionCause()

  // const  handleSQLQuery = async(data)=>{
  //   // const sqlResult = await getSQLQuery(data)
  //   console.log(data,'this is the data passed')
  // }


  return (

    <div>
      <div className="p-4 ">
      

        <div className="md:flex md:justify-between">
         

              <TableComponent getSQLQuery={getSQLQuery} totalCount={totalCount} data={collisionData} getSearchQuery={searchTable} getPage={fetchPaginatedData}/>
             
           




          <div className="p-4 md:text-[15px]  md:mt-[50px] md:w-[20%] bg-[#dbeafe] w-[100%] mt-5">
            <h2 className="text-lg font-semibold mb-3 text-center py-1.5 border-b border-black">COLLISIONS STATS</h2>
            <div className="text-base pt-4 flex-col space-y-4 md:h-[20rem] h-[18rem]">
            <div className="">Number of collisions per year: <span className="font-light">{collisionForEachYear}</span></div>
            
            <div>
              <p>Average collisions for period: <span className="font-light">{avgCollisionForPeriod}</span> </p>
            </div>
            <div>
              <p>State with highest collision : <span className="font-light">{higestState?.toUpperCase()}</span> </p>
            </div>
            <div>
              <p>Most frequent cause of collision :  <span className="font-light">{mostFrequentCollisionCause.summaries[0].cause_of_collision}</span> <span className="text-xs">({mostFrequentCollisionCause.summaries[0].count} events)</span> </p>
            </div>
            
            
          </div>
          <div className="flex space-x-2 pt-4 pb-4"><div><InfoCircledIcon/></div><div className="text-xs">avgM*: average monthly collision using a 12 month approximation</div></div>
            </div>
        </div>
      </div>


    </div>



  );
}
