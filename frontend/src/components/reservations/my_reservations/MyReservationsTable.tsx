import { db_Car_basic, db_Reservation } from "../../../types/db_types";
import MyReservationsTableRow from "./MyReservationsTableRow";




type MyReservationsTableProps = {
  reservationsData: db_Reservation[] | [],
  allCarsBasicData: db_Car_basic[] | [],
}


const MyReservationsTable = (props: MyReservationsTableProps) => {


    return (
      <div className=" md:block rounded-sm border border-stroke bg-white px-1 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark md:px-7.5 xl:pb-2">
        {props.reservationsData && props.reservationsData.length !== 0 ?
        <div className="max-w-full overflow-x-auto special-scrollbar">
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
                <MyReservationsTableRow carData={carData} reservationData={reservation} />
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