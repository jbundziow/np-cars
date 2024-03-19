import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { db_Car_basic } from "../../../types/db_types";
import RentalsTableRow from "./RentalsTableRow";



type CarBasicDataAndNumberOfFutureReservations = db_Car_basic & {numberOfFutureReservations: number};

interface RentalsTableProps {
  data: CarBasicDataAndNumberOfFutureReservations[] | [];
}

const RentalsTable = (props: RentalsTableProps) => {

  const { auth } = useAuth();




    return (
      <>
      
        {auth.userRole === 'admin' ?
        <div>
          <div className="flex justify-center mt-15">
            <Link
            to={`/wypozyczenia/wypozycz-samochod-admin`}
            className='inline-flex items-center justify-center rounded-sm bg-yellow-600 border-4 border-yellow-500 py-4 lg:py-6 px-4 sm:px-7 text-center text-xs sm:text-base lg:text-xl font-medium text-white hover:bg-opacity-80 lg:px-6 xl:px-8'
            >
            Dokonaj DOWOLNEGO wypożyczenia jako administrator 👨🏻‍💻
            </Link>
          </div>
          <h2 className="text-title-md2 font-semibold text-black dark:text-white mb-7 mt-20">Wypożyczanie aut dla siebie samego:</h2>
        </div>
        :
        null
        }



        <div className=" md:block rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-2">
          <div className="max-w-full overflow-x-auto special-scrollbar">
            {props.data && props.data.length > 0
            ?
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white xl:pl-11">
                    Samochód
                  </th>
                  <th className="hidden md:flex md:miXn-w-[150px] py-4 px-4 justify-center font-medium text-xs md:text-base text-black dark:text-white">
                    Ilość zaplanowanych rezerwacji
                  </th>
                  <th className="py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white">
                    Status
                  </th>
                  <th className="py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white">
                    Działania
                  </th>
                </tr>
              </thead>
              <tbody>
              <div className='py-2' />
                {/* INSERT ROWS HERE */}
                {props.data.map(carData => <RentalsTableRow carData={carData} amountOfReservations={carData.numberOfFutureReservations}/> )}
                
              </tbody>
            </table>
            :
            <p className="text-black dark:text-white text-md text-center mb-4">Nie odznaleziono żadnych aut w bazie danych.</p>
          }
          </div>
        </div>
      </>
    );
  };
  
  export default RentalsTable;