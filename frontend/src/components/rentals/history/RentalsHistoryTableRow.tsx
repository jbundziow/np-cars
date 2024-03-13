import { dateFormatterAsObject } from "../../../utilities/dateFormatter";
import { Link } from "react-router-dom";
import UserSpan from "../../general/spanElements/UserSpan";
import PlaceSpan from "../../general/spanElements/PlaceSpan";
import StyledSpan from "../../general/spanElements/StyledSpan";
import { db_Car_basic, db_Place, db_Rental, db_User } from "../../../types/db_types";
import DOMAIN_NAME from "../../../utilities/domainName";
import UnknownCarImg from '../../../images/cars/unknown_car_1280_720.png'
import { useState } from "react";
import ImgLoader from "../../../common/Loader/ImgLoader";
import EditButton from "../../general/buttons/EditButton";
import DeleteButton from "../../general/buttons/DeleteButton";
import useAuth from "../../../hooks/useAuth";
import FixedAlert, { alertOptionsObject } from "../../general/FixedAlert";
import ModalWarning from "../../general/ModalWarning";



interface RentalsHistoryTableRowProps {
    carData: db_Car_basic;
    rentalData: db_Rental;
    usersData: db_User[] | [],
    placesData: db_Place[] | [],
  }

const RentalsHistoryTableRow = (props: RentalsHistoryTableRowProps) => {

    const { auth } = useAuth();

    const [imgLoaded, setImgLoaded] = useState(false);


    const rentalUserObject = props.usersData.find(user => user.id === props.rentalData.userID);
    const returnUserObject = props.usersData.find(user => user.id === props.rentalData.returnUserID);
    const acknowledgedByModeratorObject = props.usersData.find(user => user.id === props.rentalData.lastEditedByModeratorOfID)
    const placeObject = props.placesData.find(place => place.id === props.rentalData.placeID)


    const [rowDeleted, setRowDeleted] = useState<boolean>(false);
    const [showWarningModal, setShowWarningModal] = useState<boolean>(false);
    const [alertOptions, setAlertOptions] = useState<alertOptionsObject>({showAlert: false, color: 'danger', text: '#ERR#', dismiss_button: false, autohide: true, delay_ms: 1, key: 1});

    const deleteRental = async () => {
        try {
            const response = await fetch(`${DOMAIN_NAME}${auth.userRole === 'admin' ? '/admin' : ''}/rentals/${props.rentalData.id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json; charset=utf-8',
              },
              credentials: 'include',
            });
            const responseJSON = await response.json();
            if(responseJSON.status === 'success') {
                setRowDeleted(true)
                setAlertOptions(({showAlert: true, color: 'success', text: 'Pomyślnie usunięto wypożyczenie.', dismiss_button: true, autohide: true, delay_ms: 5000, key: Math.random()}))
            }
            else if(responseJSON.status === 'fail') {
                setAlertOptions(({showAlert: true, color: 'danger', text: `Wystąpił błąd: ${responseJSON.data[0].pl}`, dismiss_button: true, autohide: true, delay_ms: 7000, key: Math.random()}))
              }
            else {
                setAlertOptions(({showAlert: true, color: 'danger', text: 'Wystąpił błąd podczas usuwania wypożyczenia. Spróbuj ponownie później.', dismiss_button: true, autohide: true, delay_ms: 5000, key: Math.random()}))
            }
            
          }
          catch (error) {
            setAlertOptions(({showAlert: true, color: 'danger', text: 'Wystąpił błąd podczas usuwania wypożyczenia. Spróbuj ponownie później.', dismiss_button: true, autohide: true, delay_ms: 5000, key: Math.random()}))
          }
    }
    
    return (
    <>
    <ModalWarning showModal={showWarningModal} setShowModal={(state: boolean) => setShowWarningModal(state)} title= {'Usuń wypożyczenie'} bodyText={`Czy na pewno chcesz usunąć to wypożyczenie? Nie można później cofnąć tej operacji.`} cancelBtnText={'Anuluj'} acceptBtnText={'Tak, usuń'} callback={ async () => await deleteRental() }/>
    <FixedAlert options={alertOptions}/>
    {!rowDeleted ? 
    <tr className="hover:bg-gray-2 dark:hover:bg-meta-4 text-center">
    <td className="border-b border-[#eee] py-5 px-2 sm:pl-9 dark:border-strokedark xl:pl-11">
        <div className="col-span-3 flex items-center">
        <div className="flex flex-col sm:gap-4 xl:flex-row xl:items-center">
            <div className=" w-22 sm:w-32 rounded-md">

            {imgLoaded ? null : (
              <ImgLoader/>
            )}
            <img
            src={`${DOMAIN_NAME}${props.carData.imgPath}` || UnknownCarImg}
            style={imgLoaded ? {} : { display: 'none' }}
            onLoad={() => setImgLoaded(true)}
            alt="Zdjęcie samochodu"
            className='rounded-md block'
            />

            </div>
            <Link to={`/samochody/${[props.carData.id]}`} target="_blank" className="underline decoration-[0.5px] underline-offset-1 xl:w-[40%]">
            <h5 className="font-medium text-xs xl:text-sm text-black dark:text-white">
            {`${props.carData.brand} ${props.carData.model}`}
            </h5>
            </Link>
        </div>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'><UserSpan userObj={rentalUserObject} nullText={'brak'} linkTarget={'_blank'} no_wrap={true}/></p>
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
        <p className='dark:text-white text-black text-xs xl:text-sm'>{props.rentalData.carMileageBefore || props.rentalData.distance === 0 ? `${props.rentalData.carMileageBefore}` : <StyledSpan color={'danger'} text={'brak'}/>}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'>{props.rentalData.carMileageAfter || props.rentalData.distance === 0 ? `${props.rentalData.carMileageAfter}` : <StyledSpan color={'warning'} text={'brak'}/>}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'>{props.rentalData.distance || props.rentalData.distance === 0 ? `${props.rentalData.distance}` : <StyledSpan color={'warning'} text={'brak'}/>}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'>{props.rentalData.travelDestination && props.rentalData.travelDestination !== '' ? `${props.rentalData.travelDestination}` : <StyledSpan color={'warning'} text={'brak'}/>}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'><UserSpan userObj={returnUserObject} nullText={'brak'} linkTarget={'_blank'} no_wrap={true}/></p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'><UserSpan userObj={acknowledgedByModeratorObject} nullText={'Nie'} linkTarget={'_blank'} no_wrap={true}/></p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'><PlaceSpan placeObj={placeObject} nullText={'Nie'} linkTarget={'_blank'}/></p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'>{props.rentalData.id}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm text-center'>
            <span className="block">{`${props.rentalData.createdAt ? `${dateFormatterAsObject(props.rentalData.createdAt.toString()).date}` : 'brak'}`}</span>
            <span className="block">{`${props.rentalData.createdAt ? `${dateFormatterAsObject(props.rentalData.createdAt.toString()).time}` : ''}`}</span>
        </p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm text-center'>
            <span className="block">{`${props.rentalData.updatedAt ? `${dateFormatterAsObject(props.rentalData.updatedAt.toString()).date}` : 'brak'}`}</span>
            <span className="block">{`${props.rentalData.updatedAt ? `${dateFormatterAsObject(props.rentalData.updatedAt.toString()).time}` : ''}`}</span>
        </p>
        </div>
    </td>
    
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center space-x-3.5">
            {auth.userRole === 'admin' ?
            <EditButton linkTo={`/wypozyczenia/edycja/${props.rentalData.id}`} linkTarget="_self"/>
            :
            null
            }
            <DeleteButton onClick={() => {setShowWarningModal(true)}}/>
        </div>
    </td>
    

    </tr>
    :
    null
    }
    </>
    );
  };
  
  export default RentalsHistoryTableRow;