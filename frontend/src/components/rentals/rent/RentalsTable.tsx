import RentalsTableRow from "./RentalsTableRow";

type carData = {
  id: number,
  brand: string,
  model: string,
  imgPath: string,
  availabilityStatus: 'available' | 'notAvailable' | 'rented' | 'onService' | 'damaged' | 'banned',
  numberOfFutureReservations: number,
}

interface RentalsTableProps {
  data: carData[];
}

const RentalsTable = (props: RentalsTableProps) => {
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
              {props.data.map(carData => 
                <RentalsTableRow carID={carData.id} carBrand={carData.brand} carModel={carData.model} carStatus={carData.availabilityStatus} carImg={carData.imgPath} amountOfReservations={carData.numberOfFutureReservations}/>
                )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default RentalsTable;