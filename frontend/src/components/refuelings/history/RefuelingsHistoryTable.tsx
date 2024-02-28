import useAuth from "../../../hooks/useAuth";
import { PaginationType } from "../../../types/common";
import { db_Car_basic, db_Refueling, db_User } from "../../../types/db_types";
import Pagination from "../../general/Pagination";
import StyledSpan from "../../general/spanElements/StyledSpan";
import RefuelingsHistoryTableRow from "./RefuelingsHistoryTableRow";



type RefuelingsHistoryTableProps = {
  refuelingsData: db_Refueling[] | [],
  allCarsBasicData: db_Car_basic[] | [],
  usersData: db_User[] | [],
  setCurrentPage: (pageNumber: number) => void;
  paginationData: PaginationType,

  totalNumberOfLiters?: number,
  averageConsumption?: number | null,
  totalCostBrutto?: number,
  averageCostPerLiter?: number | null,
}



const RefuelingsHistoryTable = (props: RefuelingsHistoryTableProps) => {

  const { auth } = useAuth();

    return (
      <div className=" md:block rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-2">
        {props.refuelingsData && props.refuelingsData.length > 0 ?
        <>
        <div className="max-w-full overflow-x-auto special-scrollbar mb-3 pb-5">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-4 font-medium text-xs xl:text-sm text-black dark:text-white xl:pl-11">
                  Samochód
                </th>
                <th className="py-4 px-4 font-medium text-xs xl:text-sm text-black dark:text-white xl:pl-11">
                  Kto zatankował?
                </th>
                <th className="py-4 px-4 font-medium text-xs xl:text-sm text-black dark:text-white xl:pl-11">
                  Data i godzina tankowania
                </th>
                <th className="py-4 px-4 font-medium text-xs xl:text-sm text-black dark:text-white xl:pl-11">
                  Przebieg w momencie tankowania [km]
                </th>
                <th className="py-4 px-4 font-medium text-xs xl:text-sm text-black dark:text-white xl:pl-11">
                  Ilość zatankowanego paliwa [l]
                </th>
                <th className="py-4 px-4 font-medium text-xs xl:text-sm text-black dark:text-white xl:pl-11">
                  Średnie spalanie [l/100km]
                </th>
                <th className="py-4 px-4 font-medium text-xs xl:text-sm text-black dark:text-white xl:pl-11">
                 Całkowiata kwota tankowania [zł brutto]
                </th>
                <th className="py-4 px-4 font-medium text-xs xl:text-sm text-black dark:text-white xl:pl-11">
                 Cena za litr paliwa [zł brutto]
                </th>
                <th className="py-4 px-4 font-medium text-xs xl:text-sm text-black dark:text-white xl:pl-11">
                 Czy użyto kartę paliwową?
                </th>
                <th className="py-4 px-4 font-medium text-xs xl:text-sm text-black dark:text-white xl:pl-11">
                 Czy zwrócono koszty tankowania?
                </th>
                <th className="py-4 px-4 font-medium text-xs xl:text-sm text-black dark:text-white xl:pl-11">
                 Numer faktury
                </th>
                <th className="py-4 px-4 font-medium text-xs xl:text-sm text-black dark:text-white xl:pl-11">
                 Tankowanie potwierdzone przez moderatora?
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
                 Czy edytowano dane dotyczące tego tankowania przez moderatora?
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
              {props.refuelingsData.map(refueling => {
                const carData = props.allCarsBasicData.find(car => car.id === refueling.carID) || {id: NaN, brand: '#ERROR#', model: '', imgPath: '', availabilityStatus: 'available'};
                
                return (
                <RefuelingsHistoryTableRow carData={carData} refuelingData={refueling} usersData={props.usersData}/>
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
              <td className="pt-3 px-5">
                <div className="flex justify-center">
                  <p className='dark:text-white text-black text-xs xl:text-sm whitespace-nowrap font-medium bg-primary bg-opacity-20 rounded-full py-1 px-3'>Statystki dla tego zapytania:</p>
                </div>  
              </td>
              <td className="pt-3 px-5">
                <div className="flex justify-center">
                  <p className='dark:text-white text-black text-xs xl:text-sm whitespace-nowrap'>Łącznie: {props.totalNumberOfLiters} litrów</p>
                </div>  
              </td>
              <td className="pt-3 px-5">
                <div className="flex justify-center">
                  <p className='dark:text-white text-black text-xs xl:text-sm whitespace-nowrap'>Średnia: {props.averageConsumption} l/100km</p>
                </div>  
              </td>
              <td className="pt-3 px-5">
                <div className="flex justify-center">
                  <p className='dark:text-white text-black text-xs xl:text-sm whitespace-nowrap'>Łącznie: {props.totalCostBrutto} zł brutto</p>
                </div>  
              </td>
              <td className="pt-3 px-5">
                <div className="flex justify-center">
                  <p className='dark:text-white text-black text-xs xl:text-sm whitespace-nowrap'>Średnia: {props.averageCostPerLiter} zł brutto</p>
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
  
  export default RefuelingsHistoryTable;