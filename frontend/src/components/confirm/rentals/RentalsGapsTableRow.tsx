import CarRowInTable from "../../general/CarRowInTable";
import { db_Car_basic } from "../../../types/db_types";
import { Link } from "react-router-dom";
import { RentalGapType } from "../../../types/api";





interface RentalsGapsTableRowProps {
    carData: db_Car_basic,
    gap: RentalGapType,
  }
 

const RentalsGapsTableRow = (props: RentalsGapsTableRowProps) => {

    
   
   

    return (
    <>
    
    <tr className="hover:bg-gray-2 dark:hover:bg-meta-4">
    <td className="border-b border-[#eee] py-5 px-2 sm:pl-9 dark:border-strokedark xl:pl-11">
        <CarRowInTable id={props.carData.id} brand={props.carData.brand} model={props.carData.model} imgPath={props.carData.imgPath} linkTarget={'_self'}/>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs sm:text-base'>{`${props.gap.gapStart} km - ${props.gap.gapEnd} km`}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex items-center space-x-3.5">
        <Link
        to={`/wypozyczenia/wypozycz-samochod-admin?carid=${props.carData.id}&carbrand=${props.carData.brand}&carmodel=${props.carData.model}&gapstart=${props.gap.gapStart}&gapend=${props.gap.gapEnd}`}
        className='inline-flex items-center justify-center rounded-full bg-primary py-1 sm:py-2 px-4 sm:px-7 text-center text-xs sm:text-base font-medium text-white hover:bg-opacity-80 lg:px-6 xl:px-8 whitespace-nowrap'
        >
        Uzupełnij lukę
        </Link>
        </div>
    </td>
    </tr>
    
    </>
    );
  };
  
  export default RentalsGapsTableRow;