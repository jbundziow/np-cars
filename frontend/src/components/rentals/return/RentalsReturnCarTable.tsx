import { AuthType } from "../../../types/common";
import { db_Car_basic, db_Rental, db_User } from "../../../types/db_types";
import { dateFormatter } from "../../../utilities/dateFormatter";
import RentalsReturnCarTableRow from "./RentalsReturnCarTableRow";


type RentalsReturnCarTableProps = {
  rentalsData: db_Rental[] | [];
  carsData: db_Car_basic[] | [];
  auth: AuthType;
  usersData: db_User[] | undefined;
}


const RentalsReturnCarTable = (props: RentalsReturnCarTableProps) => {

    return (
      <>

      
        {props.rentalsData.length !== 0 ?
        <div className="">
        <div className="md:block rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-2">


          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white xl:pl-11">
                    Samochód
                  </th>
                  <th className="hidden md:flex md:miXn-w-[150px] py-4 px-4 justify-center font-medium text-xs md:text-base text-black dark:text-white">
                    Data wypożyczenia
                  </th>
                  <th className="py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white text-center">
                    Działania
                  </th>
                </tr>
              </thead>
              <tbody>
              <div className='py-2' />
                {/* INSERT ROWS HERE */}
                {props.rentalsData.filter(rental => rental.userID === Number(props.auth.userID)).map(rental => 
                  <RentalsReturnCarTableRow carsData={props.carsData} rentalCarId={rental.carID} rentDate={dateFormatter(rental.dateFrom.toString())} rentalID={rental.id} rentalUserID={rental.userID} showOwner={false} usersData={props.usersData}/>
                  )}
              </tbody>
            </table>
          </div>

        </div>



          {props.rentalsData.filter(rental => (rental.userID !== Number(props.auth.userID)) && props.auth.userRole === 'admin' ).length > 0 ?
          <div>
            <h2 className="text-title-md2 font-semibold text-black dark:text-white mb-7 mt-20">Zwrot aut za innych użytkowników:</h2>

            <div className="md:block rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-2">
              <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white xl:pl-11">
                      Samochód
                    </th>
                    <th className="py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white xl:pl-11">
                      Wypożyczający
                    </th>
                    <th className="hidden md:flex md:miXn-w-[150px] py-4 px-4 justify-center font-medium text-xs md:text-base text-black dark:text-white">
                      Data wypożyczenia
                    </th>
                    <th className="py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white text-center">
                      Działania
                    </th>
                  </tr>
                </thead>
                <tbody>
                <div className='py-2' />
                  {/* INSERT ROWS HERE */}
                  {props.rentalsData.filter(rental => rental.userID !== Number(props.auth.userID)).map(rental => 
                    <RentalsReturnCarTableRow carsData={props.carsData} rentalCarId={rental.carID} rentDate={dateFormatter(rental.dateFrom.toString())} rentalID={rental.id} rentalUserID={rental.userID} showOwner={true} usersData={props.usersData}/>
                    )}
                </tbody>
              </table>
              </div>
            </div>
          </div>
          :
          null
          }
      



        </div>
        :
        <div className="md:block rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-2">
          <p className="text-black dark:text-white text-md text-center mb-4">W tej chwili nie masz żadnych wypożyczonych samochodów do oddania.</p>
        </div>
        }
      </>
    );
  };
  
  export default RentalsReturnCarTable;