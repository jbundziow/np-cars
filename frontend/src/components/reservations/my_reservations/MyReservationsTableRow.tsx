import formatDate from "../../../utilities/formatDate";
import ModalWarning from "../../general/ModalWarning";
import { useState } from "react";
import DOMAIN_NAME from "../../../utilities/domainName";
import CarRowInTable from "../../general/CarRowInTable";
import { db_Car_basic, db_Reservation } from "../../../types/db_types";
import FixedAlert, { alertOptionsObject } from "../../general/FixedAlert";





interface MyReservationsTableRowProps {
    carData: db_Car_basic;
    reservationData: db_Reservation;
  }

const MyReservationsTableRow = (props: MyReservationsTableRowProps) => {

    const [reservationDeleted, setReservationDeleted] = useState<boolean>(false);

    const [showWarningModal, setShowWarningModal] = useState<boolean>(false);
    const [alertOptions, setAlertOptions] = useState<alertOptionsObject>({showAlert: false, color: 'danger', text: '#ERR#', dismiss_button: false, autohide: true, delay_ms: 1, key: 1});

    const deleteReservation = async () => {
        try {
            const response = await fetch(`${DOMAIN_NAME}/reservations`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json; charset=utf-8',
              },
              credentials: 'include',
              body: JSON.stringify({reservationID: props.reservationData.id}),
            });
            const responseJSON = await response.json();
            if(responseJSON.status === 'success') {
              setReservationDeleted(true)
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

    return (
    <>
    <ModalWarning showModal={showWarningModal} setShowModal={(state: boolean) => setShowWarningModal(state)} title= {'Usuń rezerwację'} bodyText={`Czy na pewno chcesz usunąć tę rezerwację? Nie można później cofnąć tej operacji.`} cancelBtnText={'Anuluj'} acceptBtnText={'Tak, usuń'} callback={ async () => await deleteReservation() }/>
    <FixedAlert options={alertOptions}/>
    {!reservationDeleted ? 
    <tr className="hover:bg-gray-2 dark:hover:bg-meta-4">
    <td className="border-b border-[#eee] py-5 px-2 sm:pl-9 dark:border-strokedark xl:pl-11">
        <CarRowInTable id={props.carData?.id} brand={props.carData?.brand} model={props.carData?.model} imgPath={props.carData?.imgPath} linkTarget={'_self'}/>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs sm:text-base'>
          <span className="whitespace-nowrap">{`${formatDate(new Date(props.reservationData.dateFrom))}`}</span>
          {` - `}
          <span className="whitespace-nowrap">{`${formatDate(new Date(props.reservationData.dateTo))}`}</span>
        </p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs sm:text-base'>{props.reservationData.travelDestination}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex items-center space-x-3.5">
        <button
        onClick={() => setShowWarningModal(true)}
        className='inline-flex items-center justify-center rounded-full bg-danger py-1 sm:py-2 px-4 sm:px-7 text-center text-xs sm:text-base font-medium text-white hover:bg-opacity-80 lg:px-6 xl:px-8'
        >
        Usuń rezerwację
        </button>
        </div>
    </td>
    </tr>
    :
    <></>
    }
    </>
    );
  };
  
  export default MyReservationsTableRow;