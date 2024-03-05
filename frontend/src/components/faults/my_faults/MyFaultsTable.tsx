
import { PaginationType } from "../../../types/common";
import { db_Car_basic, db_Fault } from "../../../types/db_types";
import Pagination from "../../general/Pagination";
import MyFaultsTableRow from "./MyFaultsTableRow";





type MyFaultsTableProps = {
  faultsData: db_Fault[] | [],
  carsData: db_Car_basic[] | [],
  paginationData: PaginationType,
  setCurrentPage: (pageNumber: number) => void;
}


const MyFaultsTable = (props: MyFaultsTableProps) => {



    return (
      <div className=" md:block rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-2">
        {props.faultsData && props.faultsData.length !== 0 ?
        <>
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="py-4 px-4 font-medium text-xs sm:text-sm lg:text-base text-black dark:text-white xl:pl-11">
                    Samochód
                  </th>
                  <th className="py-4 px-4 font-medium text-xs sm:text-sm lg:text-base text-black dark:text-white xl:pl-11">
                    Tytuł usterki
                  </th>
                  <th className="py-4 px-4 font-medium text-xs sm:text-sm lg:text-base text-black dark:text-white xl:pl-11">
                    Status usterki
                  </th>
                  <th className="py-4 px-4 font-medium text-xs sm:text-sm lg:text-base text-black dark:text-white">
                    Działania
                  </th>
                  
                  
                  
                </tr>
              </thead>
              <tbody>
              <div className='py-2' />
              
                {/* INSERT ROWS HERE */}
                {props.faultsData.map((fault, index) => {
                  const carData = props.carsData.find(car => car.id === fault.carID) || {id: NaN, brand: '#ERROR#', model: '', imgPath: '', availabilityStatus: 'available'};
                  return (
                  <MyFaultsTableRow carData={carData} faultData={fault} index={index} />
                  );
                }
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center">
          <Pagination pagination={props.paginationData} setCurrentPage={(value: number) => props.setCurrentPage(value)}/>
          </div>
        </>
        :
        <p className="text-black dark:text-white text-md text-center mb-4">Nie znaleziono żadnych zgłoszonych przez Ciebie usterek w bazie danych.</p>
        }
      </div>
    );
  };
  
  export default MyFaultsTable;