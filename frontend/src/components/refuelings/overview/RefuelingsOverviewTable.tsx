import RefuelingsOverviewTableRow from "./RefuelingsOverviewTableRow";

interface RefuelingStatistics {
  carID: number,
  carBrand: string,
  carModel: string,
  imgPath: string,
  lastRefuelingWasKmAgo: number | null,
  predictedFuelLevel: number | null,
}

interface RefuelingsOverviewTableProps {
  data: RefuelingStatistics[];
}

const RefuelingsOverviewTable = (props: RefuelingsOverviewTableProps) => {
    return (
      <div className=" md:block rounded-sm border border-stroke bg-white px-1 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark md:px-7.5 xl:pb-2">
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
                {props.data.map(item => (
                  <RefuelingsOverviewTableRow data={item}/>
                ))}
            </tbody>
          </table>
            <div className="pt-5 pb-2 md:px-5">
              <p className="text-black dark:text-[#aeb7c0] text-xs md:text-sm"><span className="font-bold">UWAGA!</span> Przywidywana ilość paliwa jest wyliczana jedynie orientacyjnie i może się różnić od rzeczywistej ilości paliwa w zbiorniku. Wyliczenia będą miały sens jedynie w przypadku, gdy <strong>ostatnie tankowanie było do pełna</strong> oraz gdy aktualny przebieg odpowiada przebiegowi wpisanemu podczas ostatniego wypożyczenia.</p>
              <p className="text-black dark:text-[#aeb7c0] text-xs md:text-sm mt-1">Pod uwagę brany jest ostatnio wpisany przebieg tankowania, przebieg z ostatniego wypożyczenia, średnie spalanie samochodu oraz pojemność zbiornika paliwa.</p>
            </div>
          </div>
          
          :
          <p className="text-black dark:text-white text-md text-center mb-4">Nie odznaleziono żadnych aut w bazie danych.</p>   
          }
        </div>
      </div>
    );
  };
  
  export default RefuelingsOverviewTable;