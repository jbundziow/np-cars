import { db_Car_basic } from "../../../types/db_types";
import MakeAReservationTableRow from "./MakeAReservationTableRow";



interface MakeAReservationTableProps {
  data: db_Car_basic[] | [];
}

const MakeAReservationTable = (props: MakeAReservationTableProps) => {

    return (
      <div className=" md:block rounded-sm border border-stroke bg-white px-1 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark md:px-7.5 xl:pb-2">
        <div className="max-w-full overflow-x-auto special-scrollbar">
          {props.data && props.data.length > 0 ?
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white xl:pl-11">
                    Samochód
                  </th>
                  <th className="py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white">
                    Działania
                  </th>
                </tr>
              </thead>
              <tbody>
              <div className='py-2' />
                {props.data.map(car => <MakeAReservationTableRow carData={car} />)}

              </tbody>
            </table>
          :
          <p className="text-black dark:text-white text-md text-center mb-4">Nie odznaleziono żadnych aut w bazie danych.</p>
          }
        </div>
      </div>
    );
  };
  
  export default MakeAReservationTable;