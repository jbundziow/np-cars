import { dateFormatterAsObject } from "../../../utilities/dateFormatter";
import { Link } from "react-router-dom";
import UserSpan from "../../general/spanElements/UserSpan";
import StyledSpan from "../../general/spanElements/StyledSpan";
import { db_Car_basic, db_Refueling, db_User } from "../../../types/db_types";
import EditButton from "../../general/buttons/EditButton";
import useAuth from "../../../hooks/useAuth";
import { BACKEND_IMG_URL } from "../../../utilities/domainName";
import ImgLoader from "../../../common/Loader/ImgLoader";
import UnknownCarImg from '../../../images/cars/unknown_car_1280_720.png'
import { useState } from "react";



interface RefuelingsHistoryTableRowProps {
    carData: db_Car_basic;
    refuelingData: db_Refueling;
    usersData: db_User[] | [],
  }

const RefuelingsHistoryTableRow = (props: RefuelingsHistoryTableRowProps) => {

    const [imgLoaded, setImgLoaded] = useState(false);




    const { auth } = useAuth();

    const refuelingUserObject = props.usersData.find(user => user.id === props.refuelingData.userID);
    const isAcknowledgedByModeratorUserObject = props.usersData.find(user => user.id === props.refuelingData.isAcknowledgedByModerator)
    const lastEditedByModeratorUserObject = props.usersData.find(user => user.id === props.refuelingData.lastEditedByModeratorOfID)
    
    return (
    <>

    <tr className="hover:bg-gray-2 dark:hover:bg-meta-4 text-center">
    <td className="border-b border-[#eee] py-5 px-2 sm:pl-9 dark:border-strokedark xl:pl-11">
        <div className="col-span-3 flex items-center">
        <div className="flex flex-col sm:gap-4 xl:flex-row xl:items-center">
            <div className=" w-22 sm:w-32 rounded-md">

            {imgLoaded ? null : (
              <ImgLoader/>
            )}
            <img
            src={`${BACKEND_IMG_URL}${props.carData.imgPath}` || UnknownCarImg}
            style={imgLoaded ? {} : { display: 'none' }}
            onLoad={() => setImgLoaded(true)}
            alt="Zdjęcie samochodu"
            className='rounded-md block'
            />

            </div>
            <Link to={`/samochody/${[props.carData.id]}`} target="_self" className="underline decoration-[0.5px] underline-offset-1 xl:w-[40%]">
            <h5 className="font-medium text-xs xl:text-sm text-black dark:text-white">
            {`${props.carData.brand} ${props.carData.model}`}
            </h5>
            </Link>
        </div>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'><UserSpan userObj={refuelingUserObject} nullText={'brak'} linkTarget={'_self'} no_wrap={true}/></p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm text-center'>
            <span className="block">{`${dateFormatterAsObject(props.refuelingData.refuelingDate.toString()).date}`}</span>
            <span className="block">{`${dateFormatterAsObject(props.refuelingData.refuelingDate.toString()).time}`}</span>
        </p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'>{props.refuelingData.carMileage}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'>{props.refuelingData.numberOfLiters}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'>{props.refuelingData.averageConsumption ? props.refuelingData.averageConsumption : <StyledSpan color={'warning'} text={'Brak danych'}/>}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'>{props.refuelingData.costBrutto ? props.refuelingData.costBrutto : <StyledSpan color={'warning'} text={'Brak danych'}/>}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'>{props.refuelingData.costPerLiter ? props.refuelingData.costPerLiter : <StyledSpan color={'warning'} text={'Brak danych'}/>}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'>{props.refuelingData.isFuelCardUsed ? <StyledSpan color={'success'} text={'Tak'}/> : <StyledSpan color={'warning'} text={'Nie'}/>}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'>{props.refuelingData.moneyReturned === null ? <StyledSpan color={'success'} text={'Nie dotyczy'}/> : props.refuelingData.moneyReturned === true ? <StyledSpan color={'success'} text={'Tak'}/> : <StyledSpan color={'danger'} text={'Nie'}/>}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'>{props.refuelingData.invoiceNumber ? props.refuelingData.invoiceNumber : <StyledSpan color={'warning'} text={'Brak danych'}/>}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'><UserSpan userObj={isAcknowledgedByModeratorUserObject} nullText={'Nie'} linkTarget={'_self'} no_wrap={true}/></p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'>{props.refuelingData.id}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm text-center'>
            <span className="block">{`${props.refuelingData.createdAt ? `${dateFormatterAsObject(props.refuelingData.createdAt.toString()).date}` : 'brak'}`}</span>
            <span className="block">{`${props.refuelingData.createdAt ? `${dateFormatterAsObject(props.refuelingData.createdAt.toString()).time}` : ''}`}</span>
        </p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm text-center'>
            <span className="block">{`${props.refuelingData.updatedAt ? `${dateFormatterAsObject(props.refuelingData.updatedAt.toString()).date}` : 'brak'}`}</span>
            <span className="block">{`${props.refuelingData.updatedAt ? `${dateFormatterAsObject(props.refuelingData.updatedAt.toString()).time}` : ''}`}</span>
        </p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'><UserSpan userObj={lastEditedByModeratorUserObject} nullText={'Nie'} linkTarget={'_self'} no_wrap={true}/></p>
        </div>
    </td>
    {auth.userRole === 'admin' ?
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center space-x-3.5">
            <EditButton linkTo={`/tankowania/edycja/${props.refuelingData.id}`} linkTarget="_self"/>
        </div>
    </td>
    :
    null
    }

    </tr>

    </>
    );
  };
  
  export default RefuelingsHistoryTableRow;