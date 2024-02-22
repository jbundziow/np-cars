import { reservationTypeAtSpecificDate } from "../../../types/api";
import { db_Car_basic } from "../../../types/db_types";
import CarRowInTable from "../../general/CarRowInTable";
import TwoWeeksReservations from "./TwoWeeksReservations";



interface ReservationsOverviewTableRowProps {
    carData: db_Car_basic;
    twoWeeksData: reservationTypeAtSpecificDate[];
  }



const ReservationsOverviewTableRow = (props: ReservationsOverviewTableRowProps) => {
    
    

    return (
    <>
    <tr className="hover:bg-gray-2 dark:hover:bg-meta-4">
    <td className="border-b border-[#eee] py-5 px-2 sm:pl-9 dark:border-strokedark xl:pl-11">
        <CarRowInTable id={props.carData?.id} brand={props.carData?.brand} model={props.carData?.model} imgPath={props.carData?.imgPath} linkTarget={'_self'}/>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <TwoWeeksReservations twoWeeksData={props.twoWeeksData}/>
    </td>
    </tr>
    </>
    );
  };
  
  export default ReservationsOverviewTableRow;