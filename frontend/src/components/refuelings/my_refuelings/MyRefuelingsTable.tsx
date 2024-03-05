import useAuth from "../../../hooks/useAuth";
import { PaginationType } from "../../../types/common";
import { db_Car_basic, db_Refueling } from "../../../types/db_types";
import Pagination from "../../general/Pagination";
import MyRefuelingsTableRow from "./MyRefuelingsTableRow";





type MyRefuelingsTableProps = {
  refuelingsData: db_Refueling[] | [],
  allCarsBasicData: db_Car_basic[] | [],
  paginationData: PaginationType,
  setCurrentPage: (pageNumber: number) => void;
}


const MyRefuelingsTable = (props: MyRefuelingsTableProps) => {

  const { auth } = useAuth();


    return (
      <div className=" md:block rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-2">
        {props.refuelingsData && props.refuelingsData.length !== 0 ?
        <>
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="py-4 px-4 font-medium text-xs sm:text-sm lg:text-base text-black dark:text-white xl:pl-11">
                    Samochód
                  </th>
                  <th className="py-4 px-4 font-medium text-xs sm:text-sm lg:text-base text-black dark:text-white xl:pl-11">
                    Data i godzina tankowania
                  </th>
                  <th className="py-4 px-4 font-medium text-xs sm:text-sm lg:text-base text-black dark:text-white xl:pl-11">
                    Przebieg w momencie tankowania [km]
                  </th>
                  <th className="py-4 px-4 font-medium text-xs sm:text-sm lg:text-base text-black dark:text-white xl:pl-11">
                    Całkowiata kwota tankowania [zł brutto]
                  </th>
                  <th className="py-4 px-4 font-medium text-xs sm:text-sm lg:text-base text-black dark:text-white xl:pl-11">
                    Czy należy zwrócić Ci koszty tankowania?
                  </th>
                  {auth.userRole !== 'admin' ?
                  <th className="py-4 px-4 font-medium text-xs sm:text-sm lg:text-base text-black dark:text-white">
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
                {props.refuelingsData.map((refueling, index) => {
                  const carData = props.allCarsBasicData.find(car => car.id === refueling.carID) || {id: NaN, brand: '#ERROR#', model: '', imgPath: '', availabilityStatus: 'available'};
                  return (
                  <MyRefuelingsTableRow carData={carData} refuelingData={refueling} index={index} />
                  );
                }
                )}
              </tbody>
            </table>
                <p className='dark:text-white text-black text-xs xl:text-sm my-2 mx-2'>Łączna ilość wyników: {props.paginationData.totalCount}</p>
          </div>

          <div className="flex justify-center">
          <Pagination pagination={props.paginationData} setCurrentPage={(value: number) => props.setCurrentPage(value)}/>
          </div>
        </>
        :
        <p className="text-black dark:text-white text-md text-center mb-4">Nie znaleziono tankowań w bazie danych.</p>
        }
      </div>
    );
  };
  
  export default MyRefuelingsTable;