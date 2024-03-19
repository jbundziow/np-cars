import { db_Car } from "../../../types/db_types";
import FuelCardsTableRow from "./FuelCardsTableRow";


interface FuelCardsTableProps {
  data: db_Car[];
}

const FuelCardsTable = (props: FuelCardsTableProps) => {
    return (
      <div className=" md:block rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-2">
        <div className="max-w-full overflow-x-auto special-scrollbar">
          {props.data && props.data.length > 0
          ?
          <div>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white xl:pl-11">
                  Samochód
                </th>
                <th className="flex justify-center items-center py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white">
                Kod PIN mikroflota
                </th>
              </tr>
            </thead>
            <tbody>
            <div className='py-2' />
               {/* INSERT ROWS HERE */}
                {props.data.map(car => (
                  <FuelCardsTableRow data={car}/>
                ))}
            </tbody>
          </table>
          </div>
          
          :
          <p className="text-black dark:text-white text-md text-center mb-4">Nie odznaleziono żadnych aut w bazie danych.</p>   
          }
        </div>
      </div>
    );
  };
  
  export default FuelCardsTable;