import { db_Car_basic, db_Rental, db_User } from "../../../types/db_types";
import ActualRentalsTableRow from "./ActualRentalsTableRow";


type carDataAndNumberOfFutureReservations = db_Car_basic & {numberOfFutureReservations: number};


interface ActualRentalsTableProps {
  carsData: carDataAndNumberOfFutureReservations[] | [];
  usersData: db_User[] | [];
  pendingRentals: db_Rental[] | [];
}

const ActualRentalsTable = (props: ActualRentalsTableProps) => {
    return (
      <div className=" md:block rounded-sm border border-stroke bg-white px-1 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark md:px-7.5 xl:pb-2">
        <div className="max-w-full overflow-x-auto special-scrollbar">
          {props.pendingRentals && props.pendingRentals.length > 0
          ?
            <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white xl:pl-11">
                      Samochód
                    </th>
                    <th className="hidden md:flex md:miXn-w-[150px] py-4 px-4 justify-center font-medium text-xs md:text-base text-black dark:text-white">
                      Cel podróży
                    </th>
                    <th className="py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white">
                      Aktualnie wypożyczony przez użytkownika
                    </th>
                    <th className="py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white">
                      Wypożyczony od
                    </th>
                  </tr>
                </thead>
                <tbody>
                <div className='py-2' />
                  {/* INSERT ROWS HERE */}
                  {props.pendingRentals.map(rental => {
                    const rentalCar = props.carsData.find(car => car.id === rental.carID)
                    const rentalUser = props.usersData.find(user => user.id === rental.userID)
                    return (<ActualRentalsTableRow rentalData={rental} carData={rentalCar} userData={rentalUser}/>);
                  }
                    )}
                </tbody>
              </table>
            :
            <p className="text-black dark:text-white text-md text-center mb-4">Brak danych do wyświetlenia.</p>
            }
        </div>
      </div>
    );
  };
  
  export default ActualRentalsTable;