import { dateFormatterAsObject } from "../../../utilities/dateFormatter";
import { Link } from "react-router-dom";
import UserSpan from "../../general/spanElements/UserSpan";
import StyledSpan from "../../general/spanElements/StyledSpan";
import { db_Car_basic, db_Reservation, db_User } from "../../../types/db_types";
import formatDate from "../../../utilities/formatDate";
import EditButton from "../../general/buttons/EditButton";
import DeleteButton from "../../general/buttons/DeleteButton";
import { useState } from "react";
import { BACKEND_IMG_URL, BACKEND_URL } from "../../../utilities/domainName";
import ModalWarning from "../../general/ModalWarning";
import FixedAlert, { alertOptionsObject } from "../../general/FixedAlert";
import useAuth from "../../../hooks/useAuth";
import ImgLoader from "../../../common/Loader/ImgLoader";
import UnknownCarImg from '../../../images/cars/unknown_car_1280_720.png'




interface ReservationsHistoryTableRowProps {
    carData: db_Car_basic;
    reservationData: db_Reservation;
    usersData: db_User[] | [],
  }

const ReservationsHistoryTableRow = (props: ReservationsHistoryTableRowProps) => {

    const [imgLoaded, setImgLoaded] = useState(false);

    const [rowDeleted, setRowDeleted] = useState<boolean>(false);

    const [showWarningModal, setShowWarningModal] = useState<boolean>(false);
    const [alertOptions, setAlertOptions] = useState<alertOptionsObject>({showAlert: false, color: 'danger', text: '#ERR#', dismiss_button: false, autohide: true, delay_ms: 1, key: 1});

    const deleteReservation = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/reservations`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json; charset=utf-8',
              },
              credentials: 'include',
              body: JSON.stringify({reservationID: props.reservationData.id}),
            });
            const responseJSON = await response.json();
            if(responseJSON.status === 'success') {
                setRowDeleted(true)
                setAlertOptions(({showAlert: true, color: 'success', text: 'Pomyślnie usunięto rezerwację.', dismiss_button: true, autohide: true, delay_ms: 5000, key: Math.random()}))
            }
            else if(responseJSON.status === 'fail') {
                setAlertOptions(({showAlert: true, color: 'danger', text: `Wystąpił błąd: ${responseJSON.data[0].pl}`, dismiss_button: true, autohide: true, delay_ms: 7000, key: Math.random()}))
              }
            else {
                setAlertOptions(({showAlert: true, color: 'danger', text: 'Wystąpił błąd podczas usuwania rezerwacji. Spróbuj ponownie później.', dismiss_button: true, autohide: true, delay_ms: 5000, key: Math.random()}))
            }
            
          }
          catch (error) {
            setAlertOptions(({showAlert: true, color: 'danger', text: 'Wystąpił błąd podczas usuwania rezerwacji. Spróbuj ponownie później.', dismiss_button: true, autohide: true, delay_ms: 5000, key: Math.random()}))
          }
    }


    const { auth } = useAuth();

    const reservationUserObject = props.usersData.find(user => user.id === props.reservationData.userID);
    const lastEditedByModeratorUserObject = props.usersData.find(user => user.id === props.reservationData.lastEditedByModeratorOfID)
    
    return (
    <>
    <ModalWarning showModal={showWarningModal} setShowModal={(state: boolean) => setShowWarningModal(state)} title= {'Usuń rezerwację'} bodyText={`Czy na pewno chcesz usunąć tę rezerwację? Nie można później cofnąć tej operacji.`} cancelBtnText={'Anuluj'} acceptBtnText={'Tak, usuń'} callback={ async () => await deleteReservation() }/>
    <FixedAlert options={alertOptions}/>
    {!rowDeleted ? 
    <tr className="hover:bg-gray-2 dark:hover:bg-meta-4 text-center">
    <td className="border-b border-[#eee] py-5 px-2 sm:pl-9 dark:border-strokedark xl:pl-11">
        <div className="col-span-3 flex items-center">
        <div className="flex flex-col sm:gap-4 xl:flex-row xl:items-center">
            <div className="w-22 sm:w-32 rounded-md">
            
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
        <p className='dark:text-white text-black text-xs xl:text-sm'><UserSpan userObj={reservationUserObject} nullText={'brak'} linkTarget={'_self'} no_wrap={true}/></p>
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
        <p className='dark:text-white text-black text-xs xl:text-sm'><UserSpan userObj={lastEditedByModeratorUserObject} nullText={'Nie'} linkTarget={'_self'} no_wrap={true}/></p>
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
    {auth.userRole === 'admin' ?
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-end space-x-3.5">
            <EditButton linkTo={`/rezerwacje/edycja/${props.reservationData.id}`} linkTarget="_self"/>
            <DeleteButton onClick={() => {setShowWarningModal(true)}}/>
        </div>
    </td>
    :
    null
    }

    </tr>
    :
    <></>
    }
    </>
    );
  };
  
  export default ReservationsHistoryTableRow;