import { dateFormatterAsObject } from "../../../utilities/dateFormatter";
import CarRowInTable from "../../general/CarRowInTable";
import StyledSpan from "../../general/spanElements/StyledSpan";
import UserSpan from "../../general/spanElements/UserSpan";


type carData = {
    id: number,
    brand: string,
    model: string,
    imgPath: string,
    availabilityStatus: 'available' | 'notAvailable' | 'rented' | 'onService' | 'damaged' | 'banned',
    numberOfFutureReservations: number,
  }
  
  type userData = {
    id: number,
    email: string,
    gender: 'male' | 'female',
    name: string,
    surname: string,
    employedAs: string,
    avatarPath: string | null,
    role: 'unconfirmed' | 'banned' | 'admin' | 'user',
  }
  
  type rentalData = {
    id: number,
    carID: number,
    userID: number,
    returnUserID: number,
    lastEditedByModeratorOfID: number,
    carMileageBefore: number,
    carMileageAfter: number | null,
    distance: number | null,
    travelDestination: string | null,
    placeID: number | null,
    dateFrom: Date,
    dateTo: Date | null,
  }

interface ActualRentalsTableRowProps {
    carData: carData | undefined;
    userData: userData | undefined;
    rentalData: rentalData;
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
        <p className="inline-flex py-2 px-4 text-xs md:text-base text-black dark:text-white">
        {props.rentalData.travelDestination ? props.rentalData.travelDestination : <StyledSpan text={'Nie wpisano'} color={'warning'}/>}
        </p>
        </div>
    </td>



    <td className=" border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <UserSpan userObj={props.userData} nullText={'Brak danych'} linkTarget={'_self'} />
    </td>


    <td className=" border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
            <p className='dark:text-white text-black text-xs md:text-base text-center'>
                <span className="block">{`${props.rentalData.dateFrom ? `${dateFormatterAsObject(props.rentalData.dateFrom.toString()).date}` : 'brak'}`}</span>
                <span className="block">{`${props.rentalData.dateFrom ? `${dateFormatterAsObject(props.rentalData.dateFrom.toString()).time}` : ''}`}</span>
            </p>
        </div>
    </td>


    </tr>
    </>
    );
  };
  
  export default ActualRentalsTableRow;