import { Link } from "react-router-dom";
import CarRowInTable from "../../general/CarRowInTable";
import { db_Car_basic } from "../../../types/db_types";



interface RentalsReturnCarTableRowProps {
    carsData: db_Car_basic[] | [];
    rentalCarId: number;
    rentDate: string;
    rentalID: number;
  }

const RentalsReturnCarTableRow = (props: RentalsReturnCarTableRowProps) => {

    const car = props.carsData.find(car => car.id === props.rentalCarId);


    return (
    <>
    <tr className="hover:bg-gray-2 dark:hover:bg-meta-4">
    <td className="border-b border-[#eee] py-5 px-2 sm:pl-9 dark:border-strokedark xl:pl-11">
        <CarRowInTable id={car?.id} brand={car?.brand} model={car?.model} imgPath={car?.imgPath} linkTarget={'_self'}/>
    </td>
    <td className="hidden md:table-cell border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black'>{props.rentDate}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex items-center space-x-3.5">
        <Link
        to={`./${props.rentalID}`}
        className='inline-flex items-center justify-center rounded-full bg-primary py-1 sm:py-2 px-4 sm:px-7 text-center text-xs sm:text-base font-medium text-white hover:bg-opacity-80 lg:px-6 xl:px-8'
        >
        Oddaj auto
        </Link>
        </div>
    </td>
    </tr>
    </>
    );
  };
  
  export default RentalsReturnCarTableRow;