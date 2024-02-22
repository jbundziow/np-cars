import { db_Car_basic, db_Rental, db_User } from "../../../types/db_types";
import { dateFormatterAsObject } from "../../../utilities/dateFormatter";
import CarRowInTable from "../../general/CarRowInTable";
import StyledSpan from "../../general/spanElements/StyledSpan";
import UserSpan from "../../general/spanElements/UserSpan";

type carDataAndNumberOfFutureReservations = db_Car_basic & {numberOfFutureReservations: number};


interface ActualRentalsTableRowProps {
    carData: carDataAndNumberOfFutureReservations | undefined;
    userData: db_User | undefined;
    rentalData: db_Rental | undefined;
  }

const ActualRentalsTableRow = (props: ActualRentalsTableRowProps) => {



    return (
    <>
    <tr className="hover:bg-gray-2 dark:hover:bg-meta-4">



    <td className="border-b border-[#eee] py-5 px-2 sm:pl-9 dark:border-strokedark xl:pl-11">
        <CarRowInTable id={props.carData?.id} brand={props.carData?.brand} model={props.carData?.model} imgPath={props.carData?.imgPath} linkTarget={'_self'}/>
    </td>



    <td className="hidden md:table-cell border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className="inline-flex py-2 px-4 text-xs md:text-base text-black dark:text-white text-xs sm:text-base">
        {props.rentalData?.travelDestination ? props.rentalData.travelDestination : <StyledSpan text={'Nie wpisano'} color={'warning'}/>}
        </p>
        </div>
    </td>



    <td className=" border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <p className="text-xs sm:text-base"><UserSpan userObj={props.userData} nullText={'Brak danych'} linkTarget={'_self'} no_wrap={false} /></p>
    </td>


    <td className=" border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
            <p className='dark:text-white text-black text-xs sm:text-base text-center'>
                <span className="block">{`${props.rentalData?.dateFrom ? `${dateFormatterAsObject(props.rentalData.dateFrom.toString()).date}` : 'brak'}`}</span>
                <span className="block">{`${props.rentalData?.dateFrom ? `${dateFormatterAsObject(props.rentalData.dateFrom.toString()).time}` : ''}`}</span>
            </p>
        </div>
    </td>


    </tr>
    </>
    );
  };
  
  export default ActualRentalsTableRow;