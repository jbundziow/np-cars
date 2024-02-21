import { dateFormatterAsObject } from "../../../utilities/dateFormatter";
import { Link } from "react-router-dom";

type rentalDataType = {
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

  type usersData = {
    id: number,
    email: string,
    gender: 'male' | 'female',
    name: string,
    surname: string,
    employedAs: string,
    avatarPath: string | null,
    role: 'unconfirmed' | 'banned' | 'admin' | 'user',
  }

  type placesData = {
    id: number,
    projectCode: string,
    placeName: string,
    projectName: string,
    status: 'active' | 'banned',
  }

interface RentalsHistoryTableRowProps {
    carID: number;
    carBrand: string;
    carModel: string;
    carImg: string;
    rentalData: rentalDataType;
    usersData: usersData[] | [],
    placesData: placesData[] | [],
  }

const RentalsHistoryTableRow = (props: RentalsHistoryTableRowProps) => {


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

    const userSpan = (user: usersData | undefined, nullText: string):JSX.Element => {
        if(user) {
            return <p className="whitespace-nowrap">{user.role === 'admin' ? <span className="rounded-lg bg-success bg-opacity-10 py-0 px-1 font-medium text-success cursor-default">Admin</span> : ''}&nbsp;<Link to={`/uzytkownicy/${user.id}`} target="_blank"><span className="underline decoration-[0.5px] underline-offset-1">{user.name} {user.surname}</span></Link></p>
        }
        else {
            return <span className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 font-medium text-warning">{nullText}</span>
        }
    }

    const placeSpan = (place: placesData | undefined, nullText: string):JSX.Element => {
        if(place) {
            return <Link to={`/projekty/${place.id}`} target="_blank"><span className="underline decoration-[0.5px] underline-offset-1">{place.projectCode}</span></Link>
        }
        else {
            return <span className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 font-medium text-warning">{nullText}</span>
        }
    }
    const rentalUserObject = props.usersData.find(user => user.id === props.rentalData.userID);
    const returnUserObject = props.usersData.find(user => user.id === props.rentalData.returnUserID);
    const acknowledgedByModeratorObject = props.usersData.find(user => user.id === props.rentalData.lastEditedByModeratorOfID)
    const placeObject = props.placesData.find(place => place.id === props.rentalData.placeID)
    
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
            <Link to={`/samochody/${[props.carID]}`} target="_blank">
            <h5 className="font-medium text-xs xl:text-sm text-black dark:text-white underline decoration-[0.5px] underline-offset-1">
            {`${props.carBrand} ${props.carModel}`}
            </h5>
            </Link>
        </div>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'>{userSpan(rentalUserObject, 'brak')}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
            <p className='dark:text-white text-black text-xs xl:text-sm text-center'>
                <span className="block">{`${props.rentalData.dateFrom ? `${dateFormatterAsObject(props.rentalData.dateFrom.toString()).date}` : 'brak'}`}</span>
                <span className="block">{`${props.rentalData.dateFrom ? `${dateFormatterAsObject(props.rentalData.dateFrom.toString()).time}` : ''}`}</span>
            </p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
            <p className='dark:text-white text-black text-xs xl:text-sm text-center'>
                <span className="block">{`${props.rentalData.dateTo ? `${dateFormatterAsObject(props.rentalData.dateTo.toString()).date}` : 'brak'}`}</span>
                <span className="block">{`${props.rentalData.dateTo ? `${dateFormatterAsObject(props.rentalData.dateTo.toString()).time}` : ''}`}</span>
            </p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'>{props.rentalData.carMileageBefore || props.rentalData.distance === 0 ? `${props.rentalData.carMileageBefore}` : styledSpan('brak', 'danger')}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'>{props.rentalData.carMileageAfter || props.rentalData.distance === 0 ? `${props.rentalData.carMileageAfter}` : styledSpan('brak', 'warning')}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'>{props.rentalData.distance || props.rentalData.distance === 0 ? `${props.rentalData.distance}` : styledSpan('brak', 'warning')}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'>{props.rentalData.travelDestination && props.rentalData.travelDestination !== '' ? `${props.rentalData.travelDestination}` : styledSpan('brak', 'warning')}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'>{userSpan(returnUserObject, 'brak')}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'>{userSpan(acknowledgedByModeratorObject, 'Nie')}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'>{placeSpan(placeObject, 'Nie')}</p>
        </div>
    </td>

    </tr>
    </>
    );
  };
  
  export default RentalsHistoryTableRow;