import formatDate from "../../../utilities/formatDate";
import CarRowInTable from "../../general/CarRowInTable";
import { db_Car_basic, db_Reservation, db_User } from "../../../types/db_types";
import UserSpan from "../../general/spanElements/UserSpan";
import StyledSpan from "../../general/spanElements/StyledSpan";




interface FutureReservationsTableRowProps {
    carData: db_Car_basic | undefined;
    reservationData: db_Reservation;
    userData: db_User | undefined;
  }

const FutureReservationsTableRow = (props: FutureReservationsTableRowProps) => {



    return (
    <>
    <tr className="hover:bg-gray-2 dark:hover:bg-meta-4">


    <td className="border-b border-[#eee] py-5 px-2 sm:pl-9 dark:border-strokedark xl:pl-11">
        <CarRowInTable id={props.carData?.id} brand={props.carData?.brand} model={props.carData?.model} imgPath={props.carData?.imgPath} linkTarget={'_self'}/>
    </td>


    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs sm:text-base'><UserSpan userObj={props.userData} nullText={'Brak danych"'}linkTarget={'_self'} no_wrap={false}/></p>
        </div>
    </td>


    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs sm:text-base'><span className="whitespace-nowrap">{`${formatDate(new Date(props.reservationData.dateFrom))}`}</span> - <span className="whitespace-nowrap">{`${formatDate(new Date(props.reservationData.dateTo))}`}</span></p>
        </div>
    </td>


    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs sm:text-base'>{props.reservationData.travelDestination ? props.reservationData.travelDestination : <StyledSpan color={'warning'} text={'Brak'}/>}</p>
        </div>
    </td>


    </tr>
    </>
    );
  };
  
  export default FutureReservationsTableRow;

