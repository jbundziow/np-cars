import { Link } from 'react-router-dom';


interface FaultsReportTableRowProps {
    carID: number;
    carBrand: string;
    carModel: string;
    carImg: string;
    amountOfFaults: number;
  }

const FaultsReportTableRow = (props: FaultsReportTableRowProps) => {





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
        <p className={`inline-flex rounded-md  py-2 px-4 text-md text-md font-bold text-white cursor-default ${props.amountOfFaults === 0 ? 'bg-success' : 'bg-danger'}`}>{props.amountOfFaults}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex items-center space-x-3.5">
        <Link
        to={`./${props.carID}`}
        className={`inline-flex items-center justify-center rounded-full bg-primary py-1 sm:py-2 px-4 sm:px-7 text-center text-xs sm:text-base font-medium text-white hover:bg-opacity-90 lg:px-6 xl:px-8`}
        >
        Zgłoś usterkę
        </Link>
        </div>
    </td>
    </tr>
    </>
    );
  };
  
  export default FaultsReportTableRow;