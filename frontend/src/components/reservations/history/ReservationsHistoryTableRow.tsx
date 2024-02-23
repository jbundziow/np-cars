import { dateFormatterAsObject } from "../../../utilities/dateFormatter";
import { Link } from "react-router-dom";
import UserSpan from "../../general/spanElements/UserSpan";
import StyledSpan from "../../general/spanElements/StyledSpan";
import { db_Reservation, db_User } from "../../../types/db_types";
import formatDate from "../../../utilities/formatDate";



interface ReservationsHistoryTableRowProps {
    carID: number;
    carBrand: string;
    carModel: string;
    carImg: string;
    reservationData: db_Reservation;
    usersData: db_User[] | [],
  }

const ReservationsHistoryTableRow = (props: ReservationsHistoryTableRowProps) => {


    const reservationUserObject = props.usersData.find(user => user.id === props.reservationData.userID);
    const lastEditedByModeratorUserObject = props.usersData.find(user => user.id === props.reservationData.lastEditedByModeratorOfID)
    
    return (
    <>
    <tr className="hover:bg-gray-2 dark:hover:bg-meta-4 text-center">
    <td className="border-b border-[#eee] py-5 px-2 sm:pl-9 dark:border-strokedark xl:pl-11">
        <div className="col-span-3 flex items-center">
        <div className="flex flex-col sm:gap-4 xl:flex-row xl:items-center">
            <div className=" w-22 sm:w-32 rounded-md">
            <img 
            className="rounded-md block"
            src={props.carImg} alt="Zdjęcie samochodu" />
            </div>
            <Link to={`/samochody/${[props.carID]}`} target="_blank" className="underline decoration-[0.5px] underline-offset-1">
            <h5 className="font-medium text-xs xl:text-sm text-black dark:text-white">
            {`${props.carBrand} ${props.carModel}`}
            </h5>
            </Link>
        </div>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'><UserSpan userObj={reservationUserObject} nullText={'brak'} linkTarget={'_blank'} no_wrap={true}/></p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
            <p className='dark:text-white text-black text-xs xl:text-sm whitespace-nowrap'>
                <span className="whitespace-nowrap">{`${formatDate(new Date(props.reservationData.dateFrom))}`}</span>
            </p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
            <p className='dark:text-white text-black text-xs xl:text-sm whitespace-nowrap'>
                <span className="whitespace-nowrap">{`${formatDate(new Date(props.reservationData.dateTo))}`}</span>
            </p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'>{props.reservationData.travelDestination && props.reservationData.travelDestination !== '' ? `${props.reservationData.travelDestination}` : <StyledSpan color={'warning'} text={'brak'}/>}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'><UserSpan userObj={lastEditedByModeratorUserObject} nullText={'Nie'} linkTarget={'_blank'} no_wrap={true}/></p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'>{props.reservationData.id}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm text-center'>
            <span className="block">{`${props.reservationData.createdAt ? `${dateFormatterAsObject(props.reservationData.createdAt.toString()).date}` : 'brak'}`}</span>
            <span className="block">{`${props.reservationData.createdAt ? `${dateFormatterAsObject(props.reservationData.createdAt.toString()).time}` : ''}`}</span>
        </p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm text-center'>
            <span className="block">{`${props.reservationData.updatedAt ? `${dateFormatterAsObject(props.reservationData.updatedAt.toString()).date}` : 'brak'}`}</span>
            <span className="block">{`${props.reservationData.updatedAt ? `${dateFormatterAsObject(props.reservationData.updatedAt.toString()).time}` : ''}`}</span>
        </p>
        </div>
    </td>

    </tr>
    </>
    );
  };
  
  export default ReservationsHistoryTableRow;