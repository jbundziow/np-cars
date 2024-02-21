import ActualRentalsTableRow from "./ActualRentalsTableRow";

type carData = {
  id: number,
  brand: string,
  model: string,
  imgPath: string,
  availabilityStatus: 'available' | 'notAvailable' | 'rented' | 'onService' | 'damaged' | 'banned',
  numberOfFutureReservations: number,
}

type userData = {
  id: number,
  email: string,
  gender: 'male' | 'female',
  name: string,
  surname: string,
  employedAs: string,
  avatarPath: string | null,
  role: 'unconfirmed' | 'banned' | 'admin' | 'user',
}

type rentalData = {
  id: number,
  carID: number,
  userID: number,
  returnUserID: number,
  lastEditedByModeratorOfID: number,
  carMileageBefore: number,
  carMileageAfter: number | null,
  distance: number | null,
  travelDestination: string | null,
  placeID: number | null,
  dateFrom: Date,
  dateTo: Date | null,
}



interface ActualRentalsTableProps {
  carsData: carData[] | [];
  usersData: userData[] | [];
  pendingRentals: rentalData[] | [];
}

const ActualRentalsTable = (props: ActualRentalsTableProps) => {
    return (
      <div className=" md:block rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-2">
        <div className="max-w-full overflow-x-auto">
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