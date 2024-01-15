import { Link } from "react-router-dom";
import formatDate from "../../utilities/formatDate";

type reservationDataType = {
    id: number,
    carID: number,
    userID: number,
    lastEditedByModeratorOfID: number | null,
    dateFrom: Date,
    dateTo: Date,
    travelDestination: string
  }

interface MyReservationsTableRowProps {
    carID: number;
    carBrand: string;
    carModel: string;
    carImg: string;
    reservationData: reservationDataType;
  }

const MyReservationsTableRow = (props: MyReservationsTableRowProps) => {


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
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs sm:text-base'><span className="whitespace-nowrap">{`${formatDate(new Date(props.reservationData.dateFrom))}`}</span> - <span className="whitespace-nowrap">{`${formatDate(new Date(props.reservationData.dateTo))}`}</span></p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs sm:text-base'>{props.reservationData.travelDestination}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex items-center space-x-3.5">
        <Link
        to={`./usun/${props.reservationData.id}`}
        className='inline-flex items-center justify-center rounded-full bg-danger py-1 sm:py-2 px-4 sm:px-7 text-center text-xs sm:text-base font-medium text-white hover:bg-opacity-80 lg:px-6 xl:px-8'
        >
        Usuń rezerwację
        </Link>
        </div>
    </td>
    </tr>
    </>
    );
  };
  
  export default MyReservationsTableRow;