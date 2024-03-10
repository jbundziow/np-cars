import { Link } from 'react-router-dom';
import CarRowInTable from '../../general/CarRowInTable';
import { db_Car_basic } from '../../../types/db_types';

type CarBasicDataAndNumberOfFutureReservations = db_Car_basic & {numberOfFutureReservations: number};

interface RentalsTableRowProps {
    carData: CarBasicDataAndNumberOfFutureReservations | undefined;
    amountOfReservations: number;
  }

const RentalsTableRow = (props: RentalsTableRowProps) => {

    const carStatusJSX = (status: db_Car_basic["availabilityStatus"] | undefined):JSX.Element => {

        let result:JSX.Element = <p>Błąd</p>;
        switch (status) {
            case 'available':
                result = <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-xs sm:text-base font-medium text-success cursor-default">Dostępny</p>
                break;
            case 'notAvailable':
                result = <p className="inline-flex rounded-full bg-danger bg-opacity-10 py-1 px-3 text-xs sm:text-base font-medium text-danger cursor-default">Niedostępny</p>
                break;
            case 'rented':
                result = <p className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 text-xs sm:text-base font-medium text-warning cursor-default">Wypożyczony</p>
                break;
            case 'onService':
                result = <p className="inline-flex rounded-full bg-danger bg-opacity-10 py-1 px-3 text-xs sm:text-base font-medium text-danger cursor-default">W serwisie</p>
                break;
            case 'damaged':
                result = <p className="inline-flex rounded-full bg-danger bg-opacity-10 py-1 px-3 text-xs sm:text-base font-medium text-danger cursor-default">Uszkodzony</p>
                break;
            case 'banned':
                result = <p className="inline-flex rounded-full bg-danger bg-opacity-10 py-1 px-3 text-xs sm:text-base font-medium text-danger cursor-default">Zbanowany</p>
                break;
        }
        return result;
    }



    return (
    <>
    <tr className="hover:bg-gray-2 dark:hover:bg-meta-4">
    <td className="border-b border-[#eee] py-5 px-2 sm:pl-9 dark:border-strokedark xl:pl-11">
    <CarRowInTable id={props.carData?.id} brand={props.carData?.brand} model={props.carData?.model} imgPath={props.carData?.imgPath} linkTarget={'_self'}/>
    </td>
    <td className="hidden md:table-cell border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className={`inline-flex rounded-md  py-2 px-4 text-md text-md font-bold text-white cursor-default ${props.amountOfReservations === 0 ? 'bg-success' : 'bg-danger'}`}>{props.amountOfReservations}</p>
        </div>
    </td>
    <td className=" border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        {carStatusJSX(props.carData?.availabilityStatus)}
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex items-center space-x-3.5">
        <Link
        to={(props.carData?.availabilityStatus === 'available' || props.carData?.availabilityStatus === 'rented') ? `./${props.carData?.id}` : '#'}
        className={`inline-flex items-center justify-center rounded-full bg-primary py-1 sm:py-2 px-4 sm:px-7 text-center text-xs sm:text-base font-medium text-white hover:bg-opacity-90 lg:px-6 xl:px-8 ${(props.carData?.availabilityStatus === 'available' || props.carData?.availabilityStatus === 'rented') ? 'cursor-pointer' : 'cursor-not-allowed bg-opacity-20 dark:text-opacity-20 hover:bg-opacity-30'}`}
        >
        Wypożycz
        </Link>
        </div>
    </td>
    </tr>
    </>
    );
  };
  
  export default RentalsTableRow;