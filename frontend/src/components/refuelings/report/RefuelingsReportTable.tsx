import RefuelingsReportTableRow from "./RefuelingsReportTableRow";


const RefuelingsReportTable = () => {
    return (
      <div className=" md:block rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white xl:pl-11">
                  Samochód
                </th>
                <th className="py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white">
                  Działania
                </th>
              </tr>
            </thead>
            <tbody>
            <div className='py-2' />
               {/* INSERT ROWS HERE */}
    
               <RefuelingsReportTableRow carID={1} carBrand={'Renault'} carModel={'Megane'} carImg={'https://ocdn.eu/pulscms-transforms/1/fCGk9kqTURBXy9mY2Y3MGRkOWE2OGZkODQzYmE4MmYxNmM3NWMzY2IwZi5qcGVnkpUDzIvNATrNBTrNAvGTBc0EsM0CpN4AAqEwAaExAA'}/>
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default RefuelingsReportTable;