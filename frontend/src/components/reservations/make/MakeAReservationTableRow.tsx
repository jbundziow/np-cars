import { Link } from "react-router-dom";
import CarRowInTable from "../../general/CarRowInTable";
import { db_Car_basic } from "../../../types/db_types";


interface MakeAReservationTableRowProps {
    carData: db_Car_basic;
  }

const MakeAReservationTableRow = (props: MakeAReservationTableRowProps) => {


    return (
    <>
    <tr className="max-md:odd:bg-gray-2 md:hover:bg-gray-2 max-md:odd:dark:bg-meta-4 md:dark:hover:bg-meta-4">
    <td className="border-b border-[#eee] py-5 px-2 sm:pl-9 dark:border-strokedark xl:pl-11">
        <CarRowInTable id={props.carData?.id} brand={props.carData?.brand} model={props.carData?.model} imgPath={props.carData?.imgPath} linkTarget={'_self'}/>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex items-center space-x-3.5">
        <Link
        to={`./${props.carData?.id}`}
        className='inline-flex items-center justify-center rounded-full bg-primary py-1 sm:py-2 px-4 sm:px-7 text-center text-xs sm:text-base font-medium text-white hover:bg-opacity-80 lg:px-6 xl:px-8'
        >
        Dokonaj rezerwacji
        </Link>
        </div>
    </td>
    </tr>
    </>
    );
  };
  
  export default MakeAReservationTableRow;