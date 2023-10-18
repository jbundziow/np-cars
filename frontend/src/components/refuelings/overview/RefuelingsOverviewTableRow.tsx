// import { Link } from 'react-router-dom';
import FuelLevelBar from './FuelLevelBar';


interface RentalsTableRowProps {
    carID: number;
    carBrand: string;
    carModel: string;
    carStatus: 'available' | 'notAvailable' | 'rented' | 'onService' | 'damaged';
    carImg: string;
    amountOfReservations: number;
  }

const RentalsTableRow = (props: RentalsTableRowProps) => {





    return (
    <>
    <tr className="hover:bg-gray-2 dark:hover:bg-meta-4">
    <td className="border-b border-[#eee] py-5 px-2 sm:pl-9 dark:border-strokedark xl:pl-11">
        <div className="col-span-3 flex items-center">
        <div className="flex flex-col sm:gap-4 xl:flex-row xl:items-center">
            <div className=" w-22 sm:w-32 rounded-md">
            <img 
            className="rounded-md block"
            src={props.carImg} alt="Zdjęcie samochodu" />
            </div>
            <h5 className="font-medium text-xs sm:text-base text-black dark:text-white">
            {`${props.carBrand} ${props.carModel}`}
            </h5>
        </div>
        </div>
    </td>
    <td className="hidden md:table-cell border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p>339km temu</p>
        </div>
    </td>

    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        {/* <div className="flex items-center space-x-3.5">
        <Link
        to={(props.carStatus === 'available' || props.carStatus === 'rented') ? '/link-to-route' : '#'}
        className={`inline-flex items-center justify-center rounded-full bg-primary py-1 sm:py-2 px-4 sm:px-7 text-center text-xs sm:text-base font-medium text-white hover:bg-opacity-90 lg:px-6 xl:px-8 ${(props.carStatus === 'available' || props.carStatus === 'rented') ? 'cursor-pointer' : 'cursor-not-allowed bg-opacity-20 dark:text-opacity-20 hover:bg-opacity-30'}`}
        >
        Wypożycz
        </Link>
        </div> */}
        {/* <div className="w-full bg-neutral-200 dark:bg-neutral-600">
          <div
          className="bg-primary p-0.5 text-center text-xs font-medium leading-none text-primary-100"
          style={{ width: "30%" }}
          >
          5%
          </div> */}
          <FuelLevelBar level={77}/>
      {/* </div> */}
    </td>
    </tr>
    </>
    );
  };
  
  export default RentalsTableRow;