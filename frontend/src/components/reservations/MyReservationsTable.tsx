import MyReservationsTableRow from "./MyReservationsTableRow";

type carBasicData = {
  id: number,
  brand: string,
  model: string,
  imgPath: string,
  availabilityStatus: 'available' | 'notAvailable' | 'rented' | 'onService' | 'damaged' | 'banned',
}

type reservationData = {
  id: number,
  carID: number,
  userID: number,
  lastEditedByModeratorOfID: number | null,
  dateFrom: Date,
  dateTo: Date,
  travelDestination: string
}


type MyReservationsTableProps = {
  reservationsData: reservationData[],
  allCarsBasicData: carBasicData[],
}


const MyReservationsTable = (props: MyReservationsTableProps) => {


    return (
      <div className=" md:block rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-2">
        {props.reservationsData.length !== 0 ?
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white xl:pl-11">
                  Samochód
                </th>
                <th className="py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white xl:pl-11">
                Zakres dat
                </th>
                <th className="py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white xl:pl-11">
                  Cel podróży
                </th>
                {/* {hidden md:table-cell} */}
                <th className="py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white">
                  Działania
                </th>
                
                
              </tr>
            </thead>
            <tbody>
            <div className='py-2' />
            
               {/* INSERT ROWS HERE */}
              {props.reservationsData.map(reservation => {
                const carData = props.allCarsBasicData.find(car => car.id === reservation.carID) || {id: NaN, brand: '#ERROR#', model: '', imgPath: '', availabilityStatus: 'available'};
                return (
                <MyReservationsTableRow carID={carData.id} carBrand={carData.brand} carModel={carData.model} carImg={carData.imgPath} reservationData={reservation} />
                );
               }
              )}
            </tbody>
          </table>
        </div>
        :
        <p className="text-black dark:text-white text-md text-center mb-4">W tej chwili nie masz żadnych zaplanowanych rezerwacji.</p>
        }
      </div>
    );
  };
  
  export default MyReservationsTable;