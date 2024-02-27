import useAuth from "../../../hooks/useAuth";
import { PaginationType } from "../../../types/common";
import { db_Car_basic, db_Reservation, db_User } from "../../../types/db_types";
import Pagination from "../../general/Pagination";
import ReservationsHistoryTableRow from "./ReservationsHistoryTableRow";



type ReservationsHistoryTableProps = {
  reservationsData: db_Reservation[] | [],
  allCarsBasicData: db_Car_basic[] | [],
  usersData: db_User[] | [],
  setCurrentPage: (pageNumber: number) => void;
  paginationData: PaginationType,
}



const ReservationsHistoryTable = (props: ReservationsHistoryTableProps) => {

  const { auth } = useAuth();

    return (
      <div className=" md:block rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-2">
        {props.reservationsData && props.reservationsData.length > 0 ?
        <>
        <div className="max-w-full overflow-x-auto special-scrollbar mb-3 pb-5">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-4 font-medium text-xs xl:text-sm text-black dark:text-white xl:pl-11">
                  Samochód
                </th>
                <th className="py-4 px-4 font-medium text-xs xl:text-sm text-black dark:text-white xl:pl-11">
                  Właściciel rezewacji
                </th>
                <th className="py-4 px-4 font-medium text-xs xl:text-sm text-black dark:text-white xl:pl-11">
                  Rezerwacja od
                </th>
                <th className="py-4 px-4 font-medium text-xs xl:text-sm text-black dark:text-white xl:pl-11">
                  Rezerwacja do
                </th>
                <th className="py-4 px-4 font-medium text-xs xl:text-sm text-black dark:text-white xl:pl-11">
                  Cel podróży
                </th>
                <th className="py-4 px-4 font-medium text-xs xl:text-sm text-black dark:text-white xl:pl-11">
                  Edycja przez moderatora
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
                {auth.userRole === 'admin' ?
                <th className="py-4 px-4 font-medium text-xs xl:text-sm text-black dark:text-white xl:pl-11">
                  Działania
                </th>
                :
                null
                }
                
                
              </tr>
            </thead>
            <tbody>
            <div className='py-2' />
            
               {/* INSERT ROWS HERE */}
              {props.reservationsData.map(reservation => {
                const carData = props.allCarsBasicData.find(car => car.id === reservation.carID) || {id: NaN, brand: '#ERROR#', model: '', imgPath: '', availabilityStatus: 'available'};
                
                return (
                <ReservationsHistoryTableRow carData={carData} reservationData={reservation} usersData={props.usersData}/>
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
              <td></td>
              <td></td>
              {auth.userRole === 'admin' ? <td></td> : null}
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
  
  export default ReservationsHistoryTable;