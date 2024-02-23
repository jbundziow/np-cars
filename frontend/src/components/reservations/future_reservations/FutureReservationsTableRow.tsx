import formatDate from "../../../utilities/formatDate";
import ModalWarning from "../../general/ModalWarning";
import { useState } from "react";
import DOMAIN_NAME from "../../../utilities/domainName";
import CarRowInTable from "../../general/CarRowInTable";
import { db_Car_basic, db_Reservation } from "../../../types/db_types";
import UserSpan from "../../general/spanElements/UserSpan";




interface FutureReservationsTableRowProps {
    carData: db_Car_basic;
    reservationData: db_Reservation;
  }

const FutureReservationsTableRow = (props: FutureReservationsTableRowProps) => {

    const [reservationDeleted, setReservationDeleted] = useState<boolean>(false);

    const [showWarningModal, setShowWarningModal] = useState<boolean>(false);
    const deleteReservation = async () => {
        try {
            await fetch(`${DOMAIN_NAME}/reservations`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json; charset=utf-8',
              },
              credentials: 'include',
              body: JSON.stringify({reservationID: props.reservationData.id}),
            });

            setReservationDeleted(true)
          }
          catch (error) {
            ;
          }
    }

    return (
    <>
    <ModalWarning showModal={showWarningModal} setShowModal={(state: boolean) => setShowWarningModal(state)} title= {'Usuń rezerwację'} bodyText={`Czy na pewno chcesz usunąć tę rezerwację? Nie można później cofnąć tej operacji.`} cancelBtnText={'Anuluj'} acceptBtnText={'Tak, usuń'} callback={ async () => await deleteReservation() }/>
    {!reservationDeleted ? 
    <tr className="hover:bg-gray-2 dark:hover:bg-meta-4">
    <td className="border-b border-[#eee] py-5 px-2 sm:pl-9 dark:border-strokedark xl:pl-11">
        <CarRowInTable id={props.carData?.id} brand={props.carData?.brand} model={props.carData?.model} imgPath={props.carData?.imgPath} linkTarget={'_self'}/>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs sm:text-base'>####################</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs sm:text-base'><span className="whitespace-nowrap">{`${formatDate(new Date(props.reservationData.dateFrom))}`}</span> - <span className="whitespace-nowrap">{`${formatDate(new Date(props.reservationData.dateTo))}`}</span></p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs sm:text-base'>{props.reservationData.travelDestination}</p>
        </div>
    </td>
    </tr>
    :
    <></>
    }
    </>
    );
  };
  
  export default FutureReservationsTableRow;