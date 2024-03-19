import { db_Car } from "../../../types/db_types";
import InspectionsTableRow from "./InspectionsTableRow";




type InspectionsTableProps = {
  allCarsData: db_Car[] | [],
}


const InspectionsTable = (props: InspectionsTableProps) => {


    return (
      <div className=" md:block rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-2">
        {props.allCarsData && props.allCarsData.length !== 0 ?
        <div className="max-w-full overflow-x-auto special-scrollbar">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white xl:pl-11">
                  Samochód
                </th>
                <th className="py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white xl:pl-11">
                  Data najbliższego przeglądu
                </th>
                <th className="py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white xl:pl-11">
                  Pozostało dni
                </th>
                
                
              </tr>
            </thead>
            <tbody>
            <div className='py-2' />
            
               {/* INSERT ROWS HERE */}
               {props.allCarsData
               .sort((a, b) => new Date(a.nextInspectionDate).getTime() - new Date(b.nextInspectionDate).getTime())
               .map(car => <InspectionsTableRow carData={car} />)
               }
                
            </tbody>
          </table>
        </div>
        :
        <p className="text-black dark:text-white text-md text-center mb-4">Nie znaleziono żadnych samochodów w bazie danych.</p>
        }
      </div>
    );
  };
  
  export default InspectionsTable;