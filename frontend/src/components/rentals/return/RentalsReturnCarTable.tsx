import RentalsReturnCarTableRow from "./RentalsReturnCarTableRow";

type carBasicData = {
  id: number,
  brand: string,
  model: string,
  imgPath: string,
  availabilityStatus: 'available' | 'notAvailable' | 'rented' | 'onService' | 'damaged' | 'banned',
}

type rentalData = {
  id: number,
  carID: number,
  userID: number,
  returnUserID: null,
  lastEditedByModeratorOfID: number | null,
  carMileageBefore: number,
  carMileageAfter: null,
  travelDestination: string | null,
  placeID: number | null,
  dateFrom: Date,
  dateTo: Date | null,
  createdAt: Date,
  updatedAt: Date,
  carBasicData: carBasicData,
}

type RentalsReturnCarTableProps = {
  data: rentalData[]
}


const RentalsReturnCarTable = (props: RentalsReturnCarTableProps) => {

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
                  Data wypożyczenia
                </th>
                <th className="py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white">
                  Działania
                </th>
              </tr>
            </thead>
            <tbody>
            <div className='py-2' />
               {/* INSERT ROWS HERE */}
               {props.data.map(rental => 
                <RentalsReturnCarTableRow carID={rental.carBasicData.id} carBrand={rental.carBasicData.brand} carModel={rental.carBasicData.model} carImg={rental.carBasicData.imgPath} rentDate={'@@ TO BE FILLED @@27.10.2023 14:21'}/>
                )}
               {/* <RentalsReturnCarTableRow carID={1} carBrand={'Renault'} carModel={'Megane'} carImg={'https://ocdn.eu/pulscms-transforms/1/fCGk9kqTURBXy9mY2Y3MGRkOWE2OGZkODQzYmE4MmYxNmM3NWMzY2IwZi5qcGVnkpUDzIvNATrNBTrNAvGTBc0EsM0CpN4AAqEwAaExAA'} rentDate={'27.10.2023 14:21'}/> */}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default RentalsReturnCarTable;