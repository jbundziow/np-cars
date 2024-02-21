import { dateFormatterAsObject } from "../../../utilities/dateFormatter";

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


    const styledSpan = (text: string, color: 'warning' | 'danger'):JSX.Element => {
        let result:JSX.Element = <span>ERR#</span>;
        switch (color) {
            case 'danger':
                result = <span className="inline-flex text-center rounded-full bg-danger bg-opacity-10 py-1 px-3 font-medium text-danger">{text}</span>
                break;
            case 'warning':
                result = <span className="inline-flex text-center rounded-full bg-warning bg-opacity-10 py-1 px-3 font-medium text-warning">{text}</span>
                break;
        }
        return result;
    }


    return (
    <>
    <tr className="hover:bg-gray-2 dark:hover:bg-meta-4">



    <td className="border-b border-[#eee] py-5 px-2 sm:pl-9 dark:border-strokedark xl:pl-11">
        <div className="col-span-3 flex items-center">
        <div className="flex flex-col sm:gap-4 xl:flex-row xl:items-center">
            <div className=" w-22 sm:w-32 rounded-md">
            <img 
            className="rounded-md block"
            src={props.carData?.imgPath} alt="Zdjęcie samochodu" />
            </div>
            <h5 className="font-medium text-xs sm:text-base text-black dark:text-white">
            {`${props.carData?.brand} ${props.carData?.model}`}
            </h5>
        </div>
        </div>
    </td>



    <td className="hidden md:table-cell border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className="inline-flex py-2 px-4 text-xs md:text-base text-black dark:text-white">
        {props.rentalData.travelDestination ? props.rentalData.travelDestination : styledSpan('Nie wpisano', 'warning')}
        </p>
        </div>
    </td>



    <td className=" border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <p className="inline-flex py-2 px-4 text-xs md:text-base text-black dark:text-white">{`${props.userData?.name} ${props.userData?.surname}`}</p>
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