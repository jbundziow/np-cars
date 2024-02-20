import RentalsHistoryTableRow from "./RentalsHistoryTableRow";

type carBasicData = {
  id: number,
  brand: string,
  model: string,
  imgPath: string,
  availabilityStatus: 'available' | 'notAvailable' | 'rented' | 'onService' | 'damaged' | 'banned',
}

type rentalsData = {
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


type usersData = {
  id: number,
  email: string,
  gender: 'male' | 'female',
  name: string,
  surname: string,
  employedAs: string,
  avatarPath: string | null,
  role: 'unconfirmed' | 'banned' | 'admin' | 'user',
}

type placesData = {
  id: number,
  projectCode: string,
  placeName: string,
  projectName: string,
  status: 'active' | 'banned',
}


type RentalsHistoryTableProps = {
  rentalsData: rentalsData[] | [],
  allCarsBasicData: carBasicData[] | [],
  usersData: usersData[] | [],
  placesData: placesData[] | [],
}


const RentalsHistoryTable = (props: RentalsHistoryTableProps) => {


    let totalDistanceInVisibleTable = 0;

    return (
      <div className=" md:block rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-2">
        {props.rentalsData.length !== 0 ?
        <>
        <div className="max-w-full overflow-x-auto special-scrollbar mb-3 pb-5">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-4 font-medium text-xs xl:text-sm text-black dark:text-white xl:pl-11">
                  Samochód
                </th>
                <th className="py-4 px-4 font-medium text-xs xl:text-sm text-black dark:text-white xl:pl-11">
                  Data wypożyczenia
                </th>
                <th className="py-4 px-4 font-medium text-xs xl:text-sm text-black dark:text-white xl:pl-11">
                  Data zwrotu
                </th>
                <th className="py-4 px-4 font-medium text-xs xl:text-sm text-black dark:text-white xl:pl-11">
                  Przebieg początkowy [km]
                </th>
                <th className="py-4 px-4 font-medium text-xs xl:text-sm text-black dark:text-white xl:pl-11">
                  Przebieg końcowy [km]
                </th>
                <th className="py-4 px-4 font-medium text-xs xl:text-sm text-black dark:text-white xl:pl-11">
                  Przejechany dystans [km]
                </th>
                <th className="py-4 px-4 font-medium text-xs xl:text-sm text-black dark:text-white xl:pl-11">
                  Cel podróży
                </th>
                <th className="py-4 px-4 font-medium text-xs xl:text-sm text-black dark:text-white xl:pl-11">
                  Zawrócone przez użytkownika
                </th>
                <th className="py-4 px-4 font-medium text-xs xl:text-sm text-black dark:text-white xl:pl-11">
                  Zatwierdzone przez moderatora?
                </th>
                <th className="py-4 px-4 font-medium text-xs xl:text-sm text-black dark:text-white xl:pl-11">
                  Przypisany numer projektu
                </th>
                
                
              </tr>
            </thead>
            <tbody>
            <div className='py-2' />
            
               {/* INSERT ROWS HERE */}
              {props.rentalsData.map(rental => {
                const carData = props.allCarsBasicData.find(car => car.id === rental.carID) || {id: NaN, brand: '#ERROR#', model: '', imgPath: '', availabilityStatus: 'available'};
                if(typeof rental.distance === 'number') {totalDistanceInVisibleTable += rental.distance;}
                return (
                <RentalsHistoryTableRow carID={carData.id} carBrand={carData.brand} carModel={carData.model} carImg={carData.imgPath} rentalData={rental} usersData={props.usersData} placesData={props.placesData}/>
                );
               }
              )}
              <tr>
              <td>
                <div className="flex justify-center">
                  <p className='dark:text-white text-black text-xs xl:text-sm whitespace-nowrap'>Suma całościowa: #### km</p>
                </div>  
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="pt-5">
                <div className="flex justify-center">
                  <p className='dark:text-white text-black text-xs xl:text-sm whitespace-nowrap'>Suma: {totalDistanceInVisibleTable} km</p>
                </div>  
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <nav aria-label="Page navigation" className="flex justify-center">
        <ul className="list-style-none flex">
            <li>
                <a
                    className="pointer-events-none relative block rounded bg-transparent px-3 py-1.5 text-md text-neutral-500 transition-all duration-300 dark:text-neutral-400">Poprzednia</a>
            </li>
            <li>
                <a
                    className="relative block rounded bg-transparent px-3 py-1.5 text-md text-neutral-600 transition-all duration-300 hover:bg-neutral-100  dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                    href="#!">1</a>
            </li>
            <li aria-current="page">
                <a
                    className="relative block rounded bg-primary-100 px-3 py-1.5 text-md font-medium text-primary-700 transition-all duration-300"
                    href="#!">2
                    <span
                        className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]">(current)</span>
                </a>
            </li>
            <li>
                <a
                    className="relative block rounded bg-transparent px-3 py-1.5 text-md text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                    href="#!">3</a>
            </li>
            <li>
                <a
                    className="relative block rounded bg-transparent px-3 py-1.5 text-md text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                    href="#!">Następna</a>
            </li>
        </ul>
      </nav>
    </>
        :
        <p className="text-black dark:text-white text-md text-center mb-4">Brak danych do wyświetlenia.</p>
        }
      </div>
    );
  };
  
  export default RentalsHistoryTable;