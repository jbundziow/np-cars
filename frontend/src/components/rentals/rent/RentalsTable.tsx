import RentalsTableRow from "./RentalsTableRow";


const RentalsTable = () => {
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
                  Ilość zaplanowanych rezerwacji
                </th>
                <th className="py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white">
                  Status
                </th>
                <th className="py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white">
                  Działania
                </th>
              </tr>
            </thead>
            <tbody>
            <div className='py-2' />
               {/* INSERT ROWS HERE */}
    
               <RentalsTableRow carID={1} carBrand={'Renault'} carModel={'Megane'} carStatus={'available'} carImg={'https://ocdn.eu/pulscms-transforms/1/fCGk9kqTURBXy9mY2Y3MGRkOWE2OGZkODQzYmE4MmYxNmM3NWMzY2IwZi5qcGVnkpUDzIvNATrNBTrNAvGTBc0EsM0CpN4AAqEwAaExAA'} amountOfReservations={1}/>
               <RentalsTableRow carID={2} carBrand={'Renault'} carModel={'Megane'} carStatus={'notAvailable'} carImg={'https://ocdn.eu/pulscms-transforms/1/fCGk9kqTURBXy9mY2Y3MGRkOWE2OGZkODQzYmE4MmYxNmM3NWMzY2IwZi5qcGVnkpUDzIvNATrNBTrNAvGTBc0EsM0CpN4AAqEwAaExAA'} amountOfReservations={0}/>
               <RentalsTableRow carID={3} carBrand={'Mercedes'} carModel={'Sprinter'} carStatus={'rented'} carImg={'https://upload.wikimedia.org/wikipedia/commons/2/2f/Mercedes_sprinter_1_v_sst.jpg'} amountOfReservations={2}/>
               <RentalsTableRow carID={4} carBrand={'Renault'} carModel={'Megane'} carStatus={'onService'} carImg={'https://ocdn.eu/pulscms-transforms/1/fCGk9kqTURBXy9mY2Y3MGRkOWE2OGZkODQzYmE4MmYxNmM3NWMzY2IwZi5qcGVnkpUDzIvNATrNBTrNAvGTBc0EsM0CpN4AAqEwAaExAA'} amountOfReservations={0}/>
               <RentalsTableRow carID={5} carBrand={'Renault'} carModel={'Megane'} carStatus={'damaged'} carImg={'https://ocdn.eu/pulscms-transforms/1/fCGk9kqTURBXy9mY2Y3MGRkOWE2OGZkODQzYmE4MmYxNmM3NWMzY2IwZi5qcGVnkpUDzIvNATrNBTrNAvGTBc0EsM0CpN4AAqEwAaExAA'} amountOfReservations={3}/>
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default RentalsTable;