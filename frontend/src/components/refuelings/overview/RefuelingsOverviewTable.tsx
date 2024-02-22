import { db_Car_basic } from "../../../types/db_types";
import RefuelingsOverviewTableRow from "./RefuelingsOverviewTableRow";



interface RefuelingsOverviewTableProps {
  carData: db_Car_basic[];
}

const RefuelingsOverviewTable = (props: RefuelingsOverviewTableProps) => {
    return (
      <div className=" md:block rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-2">
        <div className="max-w-full overflow-x-auto">
          {props.carData && props.carData.length > 0
          ?
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white xl:pl-11">
                  Samochód
                </th>
                <th className="hidden md:flex md:miXn-w-[150px] py-4 px-4 justify-center font-medium text-xs md:text-base text-black dark:text-white">
                  Ostatnie tankowanie
                </th>
                <th className="py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white">
                  Przewidywana ilość paliwa
                </th>
              </tr>
            </thead>
            <tbody>
            <div className='py-2' />
               {/* INSERT ROWS HERE */}
                {props.carData.map(car => (
                  <RefuelingsOverviewTableRow carData={car} lastRefueling={999} predictedFuelLevel={50}/>
                ))}
            </tbody>
          </table>
          :
          <p className="text-black dark:text-white text-md text-center mb-4">Nie odznaleziono żadnych aut w bazie danych.</p>   
          }
        </div>
      </div>
    );
  };
  
  export default RefuelingsOverviewTable;