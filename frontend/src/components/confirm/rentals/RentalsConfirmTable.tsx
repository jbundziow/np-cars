import Loader from "../../../common/Loader";
import { PaginationType } from "../../../types/common";
import { db_Car_basic, db_Rental, db_User } from "../../../types/db_types";
import Pagination from "../../general/Pagination";
import { NoActionRequiredMessage } from "../NoActionRequiredMessage";
import RentalsConfirmTableRow from "./RentalsConfirmTableRow";




type RentalsConfirmTableProps = {
  rentalsData: db_Rental[] | [],
  allCarsBasicData: db_Car_basic[] | [],
  usersData: db_User[] | [],

  setCurrentPage: (pageNumber: number) => void,
  paginationData: PaginationType,
  loadingTable: boolean,
}


const RentalsConfirmTable = (props: RentalsConfirmTableProps) => {
    return (
      <div className=" md:block rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-2">
        {props.rentalsData && props.rentalsData.length !== 0 ?
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
                  Przebieg początkowy i końcowy [km]
                </th>
                <th className="py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white xl:pl-11">
                  Autor wypożyczenia
                </th>
                <th className="py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white xl:pl-11">
                  Cel podróży
                </th>
                <th className="py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white xl:pl-11">
                  Czy potwierdzono?
                </th>
                <th className="py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white">
                  Działania
                </th>
                
                
              </tr>
            </thead>
            <tbody>
            <div className='py-2' />
            
               {/* INSERT ROWS HERE */}
              {props.rentalsData.map(rental => {
                const carData = props.allCarsBasicData.find(car => car.id === rental.carID) || {id: NaN, brand: '#ERROR#', model: '', imgPath: '', availabilityStatus: 'available'};
                const userData = props.usersData.find(user => user.id === rental.userID) || {id: NaN, email: '', gender: 'male', name: '#ERROR#', surname: '', role: 'user', employedAs: '', avatarPath: null, createdAt: new Date(), updatedAt: new Date()};
                return (
                <RentalsConfirmTableRow carData={carData} userData={userData} rentalData={rental} />
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
        <NoActionRequiredMessage title={'Jesteś na bieżąco!'} text1={'W tej chwili nie ma w bazie danych nowych wypożyczeń do potwierdzenia.'} text2={'Miłego dnia!'} buttonText={'Przejdź do archiwum'} buttonLink={'/wypozyczenia/archiwum'}/>
        }
      </div>
    );
  };
  
  export default RentalsConfirmTable;