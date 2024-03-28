import { PaginationType } from "../../../types/common";
import { db_Car_basic, db_Place, db_Rental, db_User } from "../../../types/db_types";
import Pagination from "../../general/Pagination";
import RentalsHistoryTableRow from "./RentalsHistoryTableRow";



type RentalsHistoryTableProps = {
  rentalsData: db_Rental[] | [],
  allCarsBasicData: db_Car_basic[] | [],
  usersData: db_User[] | [],
  placesData: db_Place[] | [],
  setCurrentPage: (pageNumber: number) => void;
  paginationData: PaginationType,
  totalDistance: number,
}


const RentalsHistoryTable = (props: RentalsHistoryTableProps) => {


    let totalDistanceInVisibleTable = 0;

    return (
      <div className=" md:block rounded-sm border border-stroke bg-white px-1 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark md:px-7.5 xl:pb-2">
        {props.rentalsData && props.rentalsData.length > 0 ?
        <>
        <div className="max-w-full overflow-x-auto special-scrollbar mb-3 pb-5">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-4 font-medium text-xs xl:text-sm text-black dark:text-white xl:pl-11">
                  Samochód
                </th>
                <th className="py-4 px-4 font-medium text-xs xl:text-sm text-black dark:text-white xl:pl-11">
                  Wypożyczone przez użytkownika
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
                <th className="py-4 px-4 font-medium text-xs xl:text-sm text-black dark:text-white xl:pl-11">
                  ID
                </th>
                <th className="py-4 px-4 font-medium text-xs xl:text-sm text-black dark:text-white xl:pl-11">
                  Utworzono w bazie danych
                </th>
                <th className="py-4 px-4 font-medium text-xs xl:text-sm text-black dark:text-white xl:pl-11">
                  Ostatnia edycja w bazie danych
                </th>
                <th className="py-4 px-4 font-medium text-xs xl:text-sm text-black dark:text-white xl:pl-11">
                  Działania
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
                <RentalsHistoryTableRow carData={carData} rentalData={rental} usersData={props.usersData} placesData={props.placesData}/>
                );
               }
              )}
              <tr>
              <td className="pt-3">
                <div className="flex justify-center">
                  <p className='dark:text-white text-black text-xs xl:text-sm whitespace-nowrap'>Łączna ilość wyników: {props.paginationData.totalCount}</p>
                </div>  
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="pt-3">
                <div className="flex justify-center">
                  <p className='dark:text-white text-black text-xs xl:text-sm whitespace-nowrap'>Suma w tabeli: {totalDistanceInVisibleTable} km</p>
                </div>  
              </td>
              <td></td>
              <td className="pt-3">
                <div className="flex justify-center">
                  <p className='dark:text-white text-black text-xs xl:text-sm whitespace-nowrap'>Łączna suma dla zapytania: {props.totalDistance} km</p>
                </div>  
              </td>
              <td></td>
              <td></td>
              <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-center">
        <Pagination pagination={props.paginationData} setCurrentPage={(value: number) => props.setCurrentPage(value)}/>
        </div>
    </>
        :
        <p className="text-black dark:text-white text-md text-center mb-4">Brak danych do wyświetlenia.</p>
        }
      </div>
    );
  };
  
  export default RentalsHistoryTable;