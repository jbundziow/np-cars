import MakeAReservationTableRow from "./MakeAReservationTableRow";


type carData = {
  id: number,
  brand: string,
  model: string,
  imgPath: string,
  availabilityStatus: 'available' | 'notAvailable' | 'rented' | 'onService' | 'damaged' | 'banned',
}

interface MakeAReservationTableProps {
  data: carData[];
}

const MakeAReservationTable = (props: MakeAReservationTableProps) => {

    return (
      <div className=" md:block rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-2">
        <div className="max-w-full overflow-x-auto">
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
              {props.data.map(item => <MakeAReservationTableRow carID={item.id} carBrand={item.brand} carModel={item.model} carImg={item.imgPath}/>)}
               {/* <MakeAReservationTableRow carID={props.id} carBrand={props.brand} carModel={props.model} carImg={props.imgPath}/> */}

            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default MakeAReservationTable;