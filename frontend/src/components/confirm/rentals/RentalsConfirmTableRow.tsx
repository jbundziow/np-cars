import CarRowInTable from "../../general/CarRowInTable";
import { db_Car_basic, db_Rental, db_User } from "../../../types/db_types";
import UserSpan from "../../general/spanElements/UserSpan";
import { Link } from "react-router-dom";
import StyledSpan from "../../general/spanElements/StyledSpan";





interface RentalsConfirmTableRowProps {
    carData: db_Car_basic;
    rentalData: db_Rental;
    userData: db_User;
  }

const RentalsConfirmTableRow = (props: RentalsConfirmTableRowProps) => {

    
   
   

    return (
    <>
    
    <tr className="max-md:odd:bg-gray-2 md:hover:bg-gray-2 max-md:odd:dark:bg-meta-4 md:dark:hover:bg-meta-4">
    <td className="border-b border-[#eee] py-5 px-2 sm:pl-9 dark:border-strokedark xl:pl-11">
        <CarRowInTable id={props.carData?.id} brand={props.carData?.brand} model={props.carData?.model} imgPath={props.carData?.imgPath} linkTarget={'_self'}/>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs sm:text-base'>{`${props.rentalData.carMileageBefore} - ${props.rentalData.carMileageAfter}`}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs sm:text-base'><UserSpan userObj={props.userData} nullText={'Brak danych'} linkTarget={'_self'} no_wrap={true}/></p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs sm:text-base whitespace-nowrap'>{props.rentalData.travelDestination && props.rentalData.travelDestination !== '' ? `${props.rentalData.travelDestination}` : <StyledSpan color={'warning'} text={'brak'}/>}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs sm:text-base whitespace-nowrap'>{props.rentalData.lastEditedByModeratorOfID && typeof props.rentalData.lastEditedByModeratorOfID === 'number' ? <StyledSpan color={'success'} text={'Tak'}/> : <StyledSpan color={'danger'} text={'Nie'}/>}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex items-center space-x-3.5">
        <Link
        to={`/wypozyczenia/edycja/${props.rentalData.id}`}
        className='inline-flex items-center justify-center rounded-full bg-primary py-1 sm:py-2 px-4 sm:px-7 text-center text-xs sm:text-base font-medium text-white hover:bg-opacity-80 lg:px-6 xl:px-8 whitespace-nowrap'
        >
        Potwierdź
        </Link>
        </div>
    </td>
    </tr>
    
    </>
    );
  };
  
  export default RentalsConfirmTableRow;