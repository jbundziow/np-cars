import RefuelingsOverviewTableRow from "./RefuelingsOverviewTableRow";


const RefuelingsOverviewTable = () => {
    return (
      <div className=" md:block rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-2">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white xl:pl-11">
                  Samochód
                </th>
                <th className="hidden md:flex md:miXn-w-[150px] py-4 px-4 justify-center font-medium text-xs md:text-base text-black dark:text-white">
                  Ostatnie tankowanie
                </th>
                {/* <th className="py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white">
                  Status
                </th> */}
                <th className="py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white">
                  Przewidywana ilość paliwa
                </th>
              </tr>
            </thead>
            <tbody>
            <div className='py-2' />
               {/* INSERT ROWS HERE */}
    
               <RefuelingsOverviewTableRow carID={1} carBrand={'Renault'} carModel={'Megane'} carImg={'https://ocdn.eu/pulscms-transforms/1/fCGk9kqTURBXy9mY2Y3MGRkOWE2OGZkODQzYmE4MmYxNmM3NWMzY2IwZi5qcGVnkpUDzIvNATrNBTrNAvGTBc0EsM0CpN4AAqEwAaExAA'} lastRefueling={53} predictedFuelLevel={89}/>
               <RefuelingsOverviewTableRow carID={2} carBrand={'Renault'} carModel={'Megane'} carImg={'https://ocdn.eu/pulscms-transforms/1/fCGk9kqTURBXy9mY2Y3MGRkOWE2OGZkODQzYmE4MmYxNmM3NWMzY2IwZi5qcGVnkpUDzIvNATrNBTrNAvGTBc0EsM0CpN4AAqEwAaExAA'} lastRefueling={421} predictedFuelLevel={6}/>
               <RefuelingsOverviewTableRow carID={3} carBrand={'Renault'} carModel={'Megane'} carImg={'https://ocdn.eu/pulscms-transforms/1/fCGk9kqTURBXy9mY2Y3MGRkOWE2OGZkODQzYmE4MmYxNmM3NWMzY2IwZi5qcGVnkpUDzIvNATrNBTrNAvGTBc0EsM0CpN4AAqEwAaExAA'} lastRefueling={301} predictedFuelLevel={23}/>
               <RefuelingsOverviewTableRow carID={4} carBrand={'Renault'} carModel={'Megane'} carImg={'https://ocdn.eu/pulscms-transforms/1/fCGk9kqTURBXy9mY2Y3MGRkOWE2OGZkODQzYmE4MmYxNmM3NWMzY2IwZi5qcGVnkpUDzIvNATrNBTrNAvGTBc0EsM0CpN4AAqEwAaExAA'} lastRefueling={0} predictedFuelLevel={100}/>
               <RefuelingsOverviewTableRow carID={5} carBrand={'Renault'} carModel={'Megane'} carImg={'https://ocdn.eu/pulscms-transforms/1/fCGk9kqTURBXy9mY2Y3MGRkOWE2OGZkODQzYmE4MmYxNmM3NWMzY2IwZi5qcGVnkpUDzIvNATrNBTrNAvGTBc0EsM0CpN4AAqEwAaExAA'} lastRefueling={180} predictedFuelLevel={51}/>
               <RefuelingsOverviewTableRow carID={6} carBrand={'Renault'} carModel={'Megane'} carImg={'https://ocdn.eu/pulscms-transforms/1/fCGk9kqTURBXy9mY2Y3MGRkOWE2OGZkODQzYmE4MmYxNmM3NWMzY2IwZi5qcGVnkpUDzIvNATrNBTrNAvGTBc0EsM0CpN4AAqEwAaExAA'} lastRefueling={109} predictedFuelLevel={71}/>
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default RefuelingsOverviewTable;