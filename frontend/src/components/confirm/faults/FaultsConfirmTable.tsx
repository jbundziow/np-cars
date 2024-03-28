import Loader from "../../../common/Loader/Loader";
import { PaginationType } from "../../../types/common";
import { db_Car_basic, db_Fault, db_User } from "../../../types/db_types";
import Pagination from "../../general/Pagination";
import { NoActionRequiredMessage } from "../NoActionRequiredMessage";
import FaultsConfirmTableRow from "./FaultsConfirmTableRow";




type FaultsConfirmTableProps = {
  faultsData: db_Fault[] | [],
  allCarsBasicData: db_Car_basic[] | [],
  usersData: db_User[] | [],

  setCurrentPage: (pageNumber: number) => void,
  paginationData: PaginationType,
  loadingTable: boolean,
}


const FaultsConfirmTable = (props: FaultsConfirmTableProps) => {
    return (
      <div className=" md:block rounded-sm border border-stroke bg-white px-1 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark md:px-7.5 xl:pb-2">
        {props.faultsData && props.faultsData.length !== 0 ?
        <>
        {props.loadingTable ? <Loader/> :
        <div className="max-w-full overflow-x-auto special-scrollbar">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white xl:pl-11">
                  Samochód
                </th>
                <th className="py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white xl:pl-11">
                  Tytuł usterki
                </th>
                <th className="py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white xl:pl-11">
                  Usterka zgłoszona przez użytkownika
                </th>
                <th className="py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white xl:pl-11">
                  Aktualny status usterki
                </th>
                <th className="py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white">
                  Działania
                </th>
                
                
              </tr>
            </thead>
            <tbody>
            <div className='py-2' />
            
               {/* INSERT ROWS HERE */}
              {props.faultsData.map(fault => {
                const carData = props.allCarsBasicData.find(car => car.id === fault.carID) || {id: NaN, brand: '#ERROR#', model: '', imgPath: '', availabilityStatus: 'available'};
                const userData = props.usersData.find(user => user.id === fault.userID) || {id: NaN, email: '', gender: 'male', name: '#ERROR#', surname: '', role: 'user', employedAs: '', avatarPath: null, createdAt: new Date(), updatedAt: new Date()};
                return (
                <FaultsConfirmTableRow carData={carData} userData={userData} faultData={fault} />
                );
               }
              )}
              <tr>
              <td className="pt-3">
                <div className="flex justify-center">
                  <p className='dark:text-white text-black text-xs xl:text-sm whitespace-nowrap mb-4'>Łączna ilość wyników: {props.paginationData.totalCount}</p>
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
        }
        <div className="flex justify-center">
        <Pagination pagination={props.paginationData} setCurrentPage={(value: number) => props.setCurrentPage(value)}/>
        </div>
        </>
        :
        <NoActionRequiredMessage title={'Wszystko w porządku!'} text1={'W tej chwili nie ma w bazie danych nowych usterek do potwierdzenia.'} text2={'Miłego dnia!'} buttonText={'Przejdź do listy usterek'} buttonLink={'/usterki/status-napraw'}/>
        }
      </div>
    );
  };
  
  export default FaultsConfirmTable;