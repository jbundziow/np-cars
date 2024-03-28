import { RentalGapType, Rental_Gaps } from "../../../types/api";
import { db_Car_basic } from "../../../types/db_types";
import { NoActionRequiredMessage } from "../NoActionRequiredMessage";
import RentalsGapsTableRow from "./RentalsGapsTableRow";

interface rowType {
  carData: db_Car_basic,
  gap: RentalGapType,
}


type RentalsGapsTableProps = {
  rentalsGapsData: Rental_Gaps[],
  allCarsBasicData: db_Car_basic[] | [],
}


const RentalsGapsTable = (props: RentalsGapsTableProps) => {
  let isAnyGapExist = false;
  props.rentalsGapsData.forEach(data => {
    if(data.gaps.length > 0) {isAnyGapExist = true}
    }
  );


  let row: rowType[] = []
  if(isAnyGapExist) {
    const filteredData = props.rentalsGapsData.filter(data => data.gaps.length > 0);
    filteredData.forEach(data => {
      const carData = props.allCarsBasicData.find(car => car.id === data.carID) || {id: NaN, brand: '#ERROR#', model: '', imgPath: '', availabilityStatus: 'available'};
      data.gaps.forEach(gap => {
        row.push({carData, gap});
      });
    })
  }

    return (
      <div className=" md:block rounded-sm border border-stroke bg-white px-1 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark md:px-7.5 xl:pb-2">
        {isAnyGapExist && row.length > 0 ?
        <>

        <div className="max-w-full overflow-x-auto special-scrollbar">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white xl:pl-11">
                  Samochód
                </th>
                <th className="py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white xl:pl-11">
                  Luka w przebiegu istnieje pomiędzy
                </th>
                <th className="py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white">
                  Działania
                </th>
                
                
              </tr>
            </thead>
            <tbody>
            <div className='py-2' />
            
               {/* INSERT ROWS HERE */}
              {row.map(data => {
                return (
                <RentalsGapsTableRow carData={data.carData} gap={data.gap} />
                );
               }
              )}
              <tr>
              <td className="pt-3">
                <div className="flex justify-center">
                  <p className='dark:text-white text-black text-xs xl:text-sm whitespace-nowrap mb-4'>Łączna ilość wyników: {row.length}</p>
                </div>  
              </td>
              <td></td>
              <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        
        </>
        :
        <NoActionRequiredMessage title={'Dane są spójne!'} text1={'W tej chwili nie ma w bazie danych żadnych luk w przebiegach samochodów.'} text2={'Miłego dnia!'} buttonText={'Przejdź do archiwum'} buttonLink={'/wypozyczenia/archiwum'}/>
        }
      </div>
    );
  };
  
  export default RentalsGapsTable;